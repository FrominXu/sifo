/**
 * 
 * @param {*} node 
 * @param {*} createElement 
 */
function schemaRenderer(node, createElement) {
  if (typeof node === 'string') return node;
  const { component, attributes, children = [] } = node;
  // 对属性 进行分类
  /*
  const { scopedSlots, slot, key, ref, refInFor, style = {},
    attrs = {},
    props = {},
    domProps = {},
    on = {},
    nativeOn = {},
    directives = {},
  } = attributes;
  */
  // console.log('node render', node, props, on);
  const childrenNodes = children.map(child => {
    return schemaRenderer(child, createElement);
  });
  return createElement(
    component,
    {
      // class: attributes.class || {},// class 是关键字，无法解构
      ...attributes
    },
    childrenNodes
  )
}

export default schemaRenderer;
