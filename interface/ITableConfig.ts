export interface ITableConfig {
  /**
   * # 是否支持排序
   */
  isSortable?: boolean;

  /**
   * # 是否支持筛选
   */
  isFilterable?: boolean;

  /**
   * # 是否为图片
   */
  isImage?: boolean;

  /**
   * # 是否为链接
   */
  isLink?: boolean;

  /**
   * # 是否为日期
   */
  isDate?: boolean;

  /**
   * # 是否可拷贝
   */
  isCopyable?: boolean;

  /**
   * # 是否可下载
   */
  isDownloadable?: boolean;

  /**
   * # 是否展示状态灯
   * @description 仅在FieldConfig中配置了DictionaryArray，且配置了单项的color时有效
   */
  isShowLight?: boolean;

  /**
   * # 展示字段（适用于object/object[]数据）
   * @description 传入string时，直接取对应的字段；传入string[]时，按不同字段多列展示，同字段拼接
   */
  payloadField?: string | string[];
}