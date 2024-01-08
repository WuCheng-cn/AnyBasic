import { AnyDictionaryArrayModel } from "model/AnyDictionaryArrayModel";
import { EFieldType } from "../enum/EFieldType";
import { AnyDictionaryModel } from "model/AnyDictionaryModel";
import { FormConfig } from '../decorator/FormConfig';
import { SearchConfig } from '../decorator/SearchConfig';
import { TableConfig } from '../decorator/TableConfig';

export interface IFieldConfig {
  /**
   * # 字段描述名称
   */
  name: string;

  /**
   * # 字段类型
   */
  type?: EFieldType;

  /**
   * # 字典数组
   * 标记字段的字典数组;  
   * 标记了@see {@link FormConfig} 的字段默认会自动获取字典数组作为下拉选项;  
   * 标记了@see {@link TableConfig} 的字段默认会自动获取字典数组对应label作为表格列的展示项;  
   * 标记了@see {@link SearchConfig} 的字段默认会自动获取字典数组作为搜索表单的下拉选项;  
   */
  dictionaryArray?: AnyDictionaryArrayModel<AnyDictionaryModel>;
}