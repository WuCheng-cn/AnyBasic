import { AnyDecoratorHelper } from "helper/AnyDecoratorHelper";
import { IEntityConfig } from "interface/IEntityConfig";

export const ENTITYCONFIG_METADATA_KEY = Symbol('entityConfig');

/**
 * # 实体配置装饰器
 * @param config 实体配置
 * @description 该装饰器会将实体配置写入元数据中，用于标记实体的可读名称、描述、权限等
 * @example
 * ```ts
 * -@EntityConfig({
 *  name: '用户',
 *  description: '用户实体',
 * })
 * class User extends AnyBaseEntity {
 *    -@Alias('name')
 *    name: string;
 * }
 * ```
 */
export function EntityConfig(config: IEntityConfig) {
  return function (target: any) {
    AnyDecoratorHelper.defineMetadata(ENTITYCONFIG_METADATA_KEY, config, target);
  };
}