import { AnyDecoratorHelper } from "helper/AnyDecoratorHelper";
import { IFormConfig } from "interface/IFormConfig";

export const FORMCONFIG_METADATA_KEY = Symbol("formconfig");

/**
 * # 表单配置装饰器
 * @param config 表单配置
 * @description 该装饰器会将表单配置写入元数据中，用于标记字段的表单配置
 * @example
 * ```ts
 * class User {
 *    -@FormConfig({
 *    })
 *    name: string;
 * }
 * ```
 */
export function FormConfig(config: IFormConfig) {
  return function (target: any, propertyKey: string) {
    AnyDecoratorHelper.defineMetadata(FORMCONFIG_METADATA_KEY, config, target, propertyKey);
  };
}
