import { AnyDecoratorHelper } from "helper/AnyDecoratorHelper";
import { IAlias } from "interface/IAlias";

export const ALIAS_METADATA_KEY = Symbol('alias');

/**
 * # 别名装饰器
 * @param alias 别名配置
 * @description 该装饰器会将别名配置写入元数据中，用于数据接收与发送时的转换
 * @example
 * `请忽视@符号前的-符号，该符号仅用于排版`
 * ```ts
 * class User {
 *  -@Alias({
 *    alias: 'name',
 *    formAlias: 'userName',
 *    searchAlias: 'userName'
 *  })
 *  name: string;
 * }
 * ```
 * @description 该装饰器也可以直接传入别名字符串，此时会将别名字符串作为alias配置
 * @example
 * ```ts
 * class User {
 *  -@Alias('name') 
 *  name: string;
 * }
 * ```
 */
export function Alias(alias: string|IAlias) {
  return function (target: any, propertyKey: string) {
    let aliasConfig: IAlias
    typeof alias === 'string' ? aliasConfig = { alias } : aliasConfig = alias;
    AnyDecoratorHelper.defineMetadata(ALIAS_METADATA_KEY, aliasConfig, target, propertyKey);
  };
}
