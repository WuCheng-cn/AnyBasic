export interface ISearchConfig {
  /**
    * # 是否为禁用
    */
  isDisabled?: boolean | ((data: any) => boolean);

  /**
   * # 是否为隐藏
   */
  isHidden?: boolean | ((data: any) => boolean);

  /**
   * # 是否为单选按钮
   * @description 仅在FieldConfig中配置了DictionaryArray时有效
   */
  isRadio?: boolean;

  /**
   * # 是否为复选框
   * @description 仅在FieldConfig中配置了DictionaryArray时有效
   */
  isCheckbox?: boolean;

  /**
   * # 是否为下拉选择框
   * @description 仅在FieldConfig中配置了DictionaryArray时有效
   * @default true
   */
  isSelect?: true;

  /**
   * # 是否为开关按钮
   * @description 仅在FieldConfig中配置了DictionaryArray或FieldConfig.type === EFieldType.Boolean时有效，且DictionaryArray的length为2
   */
  isSwitch?: boolean;

  /**
   * # 是否为文本域
   * @description 仅在FieldConfig.type === EFieldType.String时有效
   */
  isTextarea?: boolean;

  /**
   * # 是否为密码框
   * @description 仅在FieldConfig.type === EFieldType.String时有效
   */
  isPassword?: boolean;

  /**
   * # 是否为数字输入框
   * @description 仅在FieldConfig.type === EFieldType.Number时有效
   */
  isNumber?: boolean;

  /**
   * # 是否为日期选择框
   */
  isDate?: boolean;
}