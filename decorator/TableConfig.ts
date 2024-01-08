import { AnyDecoratorHelper } from "helper/AnyDecoratorHelper";
import { ITableConfig } from "interface/ITableConfig";

export const TABLECONFIG_METADATA_KEY = Symbol("tableconfig");

/**
 * # 表格配置装饰器
 * @param config 表格配置
 * @description 该装饰器会将表格配置写入元数据中，用于标记字段的表格配置
 * @example
 * ```ts
 * class User {
 *   -@TableConfig({
 *   })
 *   name: string;
 * }
 * ```
 */
export function TableConfig(config: ITableConfig) {
  return function (target: any, propertyKey: string) {
    AnyDecoratorHelper.defineMetadata(TABLECONFIG_METADATA_KEY, config, target, propertyKey);
  };
}