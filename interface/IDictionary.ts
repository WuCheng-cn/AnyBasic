import { EStandardStatusColor } from "../enum/EStandardStatusColor";

/**
 * 字典接口
 */
export interface IDictionary {
  /**
   * # 字典键（通常对应枚举值）
   */
  key: string | number | symbol | boolean;

  /**
   * # 字典值（通常对应枚举描述翻译）
   */
  label: any;

  /**
   * # 字典描述（通常对应枚举额外补充描述）
   */
  description?: string;
  
  /**
   * # 字典关联颜色
   * @description 该颜色会被用于标识字典的状态，支持标准状态色枚举或者自定义颜色
   */
  color: EStandardStatusColor | string;

  /**
   * # 字典是否禁用
   * @default false
   */
  disabled: boolean ;
  
  /**
   * # 字典是否隐藏
   * @default false
   */
  hidden: boolean;

  /**
   * # 字典是否只读
   * @default false
   */
  readonly: boolean;
  
}