import Vue from 'vue';
const forbiddenKeys = ['on'];
const classKeys = ['slot', 'key', 'ref', 'refInFor'];
const classObjects = ['scopedSlots', 'refInFor', 'style', 'attrs', 'props', 'domProps', 'nativeOn'];
const classArray = ['directives'];
function classifyAttributes(oldAttrs, newAttrs) {
  let reAttrs = {};
  Object.keys(newAttrs).forEach(key => {
    if (forbiddenKeys.indexOf(key) >= 0) {
      console.warn('[sifo-vue-app]: 应使用addEventListener监听方法');
      return;
    }
    if (classKeys.indexOf(key) >= 0) {
      reAttrs[key] = newAttrs[key];
    } else if (classObjects.indexOf(key) >= 0) {
      const oldClassValue = oldAttrs[key] || {};
      // 对象合并
      reAttrs[key] = {
        ...oldClassValue, ...newAttrs[key]
      };
    } else if (classArray.indexOf(key) >= 0) {
      // 数组替换
      reAttrs[key] = newAttrs[key]
    } else {
      // 其余都放到props中
      reAttrs.props = { ...oldAttrs.props, ...reAttrs.props, [key]: newAttrs[key] };
    }
  });
  return reAttrs;
}
class VueModelPlugin {
  constructor(props) {
  }
  onNodePreprocess = (node, informations) => {
    const { id, attributes, component } = node;
    const classifiedAttrs = classifyAttributes({}, attributes);
    return { ...node, attributes: classifiedAttrs };
  }
  onComponentsWrap = components => {
    console.log('onComponentsWrap')
    for (let comp in components) {
      Vue.component(components[comp].name, components[comp])
    }
  }
  onSchemaInstantiated = params => {
    const { event } = params;
    const { schemaInstance } = event;
    // 将实例保存起来
    this.schemaInstance = schemaInstance;
  }
  onModelApiCreated = params => {
    const { mApi, event } = params;
    this.mApi = mApi;
    const { applyModelApiMiddleware } = event;
    // 定义setAttributes中间件
    const setAttrsMiddleware = next => (id, attributes, ...args) => {
      const oldAttrs = mApi.getAttributes(id) || {};
      // 除了class/style等几个是放到对应的属性上，其它都放到props中
      // 对on 属性的保护
      const classifiedAttrs = classifyAttributes(oldAttrs, attributes);
      return next(id, classifiedAttrs, ...args);
    }
    // 对mApi的setAttributes方法进行再组装
    applyModelApiMiddleware('setAttributes', setAttrsMiddleware);

    const addEventListenerMiddleware = next => (id, name, ...args) => {
      // 先附加监听, 这里会直接把方法放到属性上
      next(id, name, ...args);
      const attrs = mApi.getAttributes(id) || {};
      const method = attrs[name];
      let item = this.schemaInstance.nodeMap[id];
      if (!item) {
        return;
      }
      const reAttrs = {
        ...attrs, // 此中可能已经有[eventName]了
        on: {
          ...attrs.on,
          [name]: method
        }
      };
      delete reAttrs[name];
      // 这里不能用setAttributes方法修改属性,因为setAttributes要保护监听方法不被覆盖
      item.attributes = reAttrs;
      this.mApi.setAttributes(id, {}, true)
    }
    // 对mApi的setAttributes方法进行再组装
    applyModelApiMiddleware('addEventListener', addEventListenerMiddleware);
  }
}

export default VueModelPlugin;
