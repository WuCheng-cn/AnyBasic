import { AnyDecoratorHelper } from "helper/AnyDecoratorHelper";
import { ISearchConfig } from "interface/ISearchConfig";

export const SEARCHCONFIG_METADATA_KEY = Symbol("searchconfig");

/**
 * # 搜索配置装饰器
 * @param config 搜索配置
 * @description 该装饰器会将搜索配置写入元数据中，用于标记字段的搜索配置
 * @example
 * ```ts
 * class User {
 *   -@SearchConfig({
 *    })
 *    name: string;
 * }
 * ```
 */
export function SearchConfig(config: ISearchConfig) {
  return function (target: any, propertyKey: string) {
    AnyDecoratorHelper.defineMetadata(SEARCHCONFIG_METADATA_KEY, config, target, propertyKey);
  };
}