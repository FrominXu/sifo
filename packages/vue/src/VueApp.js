import Vue from 'vue';
import SifoModel from 'sifo-model';
import schemaRenderer from './schemaRenderer';
import VueModelPlugin from './VueModelPlugin';

const VueApp = {
  name: 'vue-app',
  beforeCreate: function () {
    console.log('beforeCreate', this)
  },
  created: function () {
    console.log('created', this)
    const { schema, plugins, namespace, components, modelApiRef, externals, getModelPluginArgs, openLogger } = this;
    const apiRef = api => {
      this.mApi = api; // 进行一次更新
      if (modelApiRef) {
        modelApiRef(api)
      }
    };
    const modelOptions = {
      externals,
      components,
      modelApiRef: apiRef,
      getModelPluginArgs
    };
    const refreshApi = (callback) => {
      // 触发Vue的变更监听
      this.schema = this.mApi.getSchema();
      callback();
    }
    this.sifoMode = new SifoModel(
      namespace,
      refreshApi,
      schema,
      [{ modelPlugin: VueModelPlugin }, ...plugins],
      modelOptions
    );
    this.sifoMode.run();
  },
  beforeMount: function () {
    console.log('beforeMount', this)
  },
  destroyed: function () {
    console.log('destroy')
    this.sifoMode.destroy();
    this.sifoMode = null;
    this.mApi = null;
    this.schema = {};
  },
  // 把内部属性放到这里
  data: function () {
    return {
      schema: {}
    }
  },
  render: function (createElement, context) {
    const schema = this.mApi ? this.mApi.getSchema() : {};
    const namespace = this.mApi ? this.mApi.namespace : this.namespace;
    console.log('vue app render', this, context);
    return createElement('div', {
      class: { [this.className]: this.className },
      attrs: {
        'data-sifo-namespace': namespace
      }
    },
      [
        schemaRenderer(schema, createElement)
      ]
    );
  },
  props: {
    schema: {
      type: Object,
      required: true
    },
    className: {
      type: String
    },
    namespace: {
      type: String,
      required: true
    },
    plugins: {
      type: Array
    },
    components: {
      type: Object, // 应该可以放到外层
      required: true
    },
    externals: {
      type: Object,
    },
    modelApiRef: {
      type: Function
    },
    openLogger: {
      type: Boolean
    },
    getModelPluginArgs: {
      type: Function
    }
  }
};

export default VueApp;