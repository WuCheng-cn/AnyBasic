import { IAlias } from "interface/IAlias";

const ALIAS_METADATA_KEY = Symbol('alias');

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
    Reflect.defineMetadata(ALIAS_METADATA_KEY, aliasConfig, target, propertyKey);
  };
}

/**
 * # 获取别名配置
 * @param target 目标对象
 * @param propertyKey 属性名
 * @description 该方法会从元数据中获取别名配置,一直查询到AnyBaseModel
 * @example
 * ```ts
 * const alias = getAlias(target, propertyKey);
 * ```
 */
export function getAlias(target: any, propertyKey: string): IAlias {
  let alias: IAlias = Reflect.getMetadata(ALIAS_METADATA_KEY, target, propertyKey);
  if (!alias) {
    const parent = Object.getPrototypeOf(target);
    if (parent&&parent.name!=='AnyBaseModel') {
      alias = getAlias(parent, propertyKey);
    }
  }
  return alias;
}