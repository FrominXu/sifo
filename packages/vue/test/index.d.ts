import Vue from 'vue'
declare module 'vue-app' {
  import * as SifoModelTypes from 'sifo-model';
  export { SifoModelTypes };
interface SifoAppProps {
  className?: string;
  /**
   * SifoModel插件
   */
  plugins?: SifoModelTypes.SifoPlugin[];
  /**
   * 命名空间
   */
  namespace: string;
  schema: SifoModelTypes.SchemaNode;
  components: SifoModelTypes.ModelOptions['components'];
  /**
   * 任意外部信息
   */
  externals?: SifoModelTypes.ModelOptions['externals'];
  /**
   * 模型实例化可选参数
   */
  modelApiRef?: SifoModelTypes.ModelOptions['modelApiRef'];
  /**
   * 是否开启sifo-logger打印
   */
  openLogger?: boolean;
  getModelPluginArgs?: SifoModelTypes.ModelOptions['getModelPluginArgs'];
}
interface SifoAppState {
  refresh: number;
}
export default class VueApp extends Vue {}
}