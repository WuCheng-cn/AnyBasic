import { AnyDecoratorHelper } from "helper/AnyDecoratorHelper";
import { ClassConstructor } from "type/ClassConstructor";

export const TYPE_METADATA_KEY = Symbol('type');

/**
 * # 类型装饰器
 * @param type 字段类型
 * @description 该装饰器会将字段类型写入元数据中，用于标记字段的类型
 * @example
 * ```ts
 * class User {
 *    -@Type(AnyBaseEntity)
 *    name: string;
 * }
 * ```
 */
export function Type(type: ClassConstructor<any>) {
  return function (target: any, propertyKey: string) {
    AnyDecoratorHelper.defineMetadata(TYPE_METADATA_KEY, type, target, propertyKey);
  };
}