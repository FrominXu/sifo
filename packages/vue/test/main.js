import Vue from 'vue'
// import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import VueApp from './vue-app/VueApp';
import components from './components';
import schema from './schema.json';
import plugins from '../demo/demo1/plugins/index'
import './index.less';

Vue.config.productionTip = false
let mApi = null;
const modelApiRef = api => { mApi = api; 
  //window.mApi = api; 
  //console.log('root mapi', api) 
};
/*
new Vue({
  components: { 'vue-app': VueApp },
  render: h => h('vue-app', {
    props: {
      namespace: 'testNamespace',
      className: "vue-app",
      plugins: [plugins],
      schema,
      components,
      externals: {},
      modelApiRef,
      openLogger: true,
      getModelPluginArgs: () => {
        return []
      }
    }
  }),
}).$mount('#app')

*/

new Vue({
  components: { 'test-root': App },
  render: h => h('test-root',  {
    props: {
      namespace: 'testNamespace',
      className: "vue-app",
      plugins: [plugins],
      schema,
      components,
      externals: {},
      modelApiRef,
      openLogger: true,
      getModelPluginArgs: () => {
        return []
      }
    }
  }),
}).$mount('#app')
