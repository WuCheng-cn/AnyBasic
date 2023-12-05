export interface IAlias {
  /**
   * # 别名
   * @description 该别名会被用于数据接收与发送时的转换，如果不设置则使用name
   */
  alias: string;

  /**
   * # 表单提交别名
   * @description 该别名会被用于表单提交时的字段名，如果不设置则使用alias
   */
  formAlias?: string;

  /**
   * # 搜索别名
   * @description 该别名会被用于搜索时的字段名，如果不设置则使用alias
   */
  searchAlias?: string;

}