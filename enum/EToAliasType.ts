export enum EToAliasType {
  /**
   * # 表单提交
   * @description 该类型会在提交时优先按表单别名进行转换，如果不设置则使用alias，如果alias也未设置，不进行别名转换
   */
  Form = 'Form',

  /**
   * # 搜索提交
   * @description 该类型会在提交时优先按搜索别名进行转换，如果不设置则使用alias，如果alias也未设置，不进行别名转换
   */
  Search = 'Search',
}