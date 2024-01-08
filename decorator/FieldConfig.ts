import { AnyDecoratorHelper } from "helper/AnyDecoratorHelper";
import { IFieldConfig } from "interface/IFieldConfig";

export const FIELDCONFIG_METADATA_KEY = Symbol("fieldConfig");

/**
 * # 字段配置装饰器
 * @param config 字段配置
 * @description 该装饰器会将字段配置写入元数据中，用于标记字段的类型、字典数组等
 * @example
 * ```ts
 * class User {
 * -@FieldConfig({
 *    name: '用户名',
 *    type: EFieldType.String,
 *    dictionaryArray:[]
 *  })
 *  name: string;
 * }
 * ```
 */
export function FieldConfig(config: IFieldConfig) {
  return function (target: any, propertyKey: string) {
    AnyDecoratorHelper.defineMetadata(FIELDCONFIG_METADATA_KEY, config, target, propertyKey);
  };
}
