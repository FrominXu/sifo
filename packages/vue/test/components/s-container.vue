<template>
  <div>
    <div>{{label+new Date().getMilliseconds().toString()}}</div>
    {{value}}
    <input v-model="value"/>
    testRerender:{{testRerender}}
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 's-container',
  components: {
  },
  data:function(){
    console.log('get data', this)
    return {
      count: 0
      //value:this.value
    };
  },
  computed:{
    testRerender:function(){
      console.log('getter')
      const value = this.value;// 依赖变化值是会重新取，否则用缓存
      return new Date().getMilliseconds().toString()
    }
    // 这样会死循环
    // value: function () {
    //   return this.value
    // }
  },
  // 由props来的无法进行双向绑定
  props:['label', 'value']
}
</script>

<style>

</style>
