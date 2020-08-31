<template>
  <div>
    控制<input v-model="count">
    <vue-app v-if="count > 0"
      :namespace="namespace"
      :className="className"
      :plugins="plugins"
      :schema="schema"
      :components="components"
      :modelApiRef="modelApiRef"
      :getModelPluginArgs="getModelPluginArgs"
    />
    第二个vueapp
      <vue-app v-if='count > 1'
      :namespace="namespace"
      :className="className"
      :plugins="plugins"
      :schema="schema"
      :components="components"
      :modelApiRef="modelApiRef"
      :getModelPluginArgs="getModelPluginArgs"
    />
  </div>
</template>

<script>
import VueApp from "./vue-app/VueApp";
export default {
  name: "test-root",
  components: { "vue-app": VueApp },
  data:function(){
    return {
      count: 1
    }
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
      type: Object
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
</script>

<style>

</style>
