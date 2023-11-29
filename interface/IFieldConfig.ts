import { EFieldType } from "../enum/EFieldType";

export interface IFieldConfig {
  /**
   * 字段描述名称
   */
  name: string;

  /**
   * 字段类型
   */
  type: EFieldType;
}