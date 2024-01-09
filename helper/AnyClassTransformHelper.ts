import { AnyBaseEntity } from "entity/AnyBaseEntity";
import { AnyBaseModel } from "../model/AnyBaseModel";
import { TBaseType } from "../type/TBaseType";
import { ClassConstructor } from "type/ClassConstructor";
import { ALIAS_METADATA_KEY } from "decorator/Alias";
import { AnyDecoratorHelper } from "./AnyDecoratorHelper";
import { EToAliasType } from "enum/EToAliasType";
import { IAlias } from "interface/IAlias";
import { TYPE_METADATA_KEY } from "decorator/Type";

export class AnyClassTransformHelper {

  /**
   * 将AnyBaseModel的实例转换为AnyTBaseType类型
   * @param instance AnyBaseModel的实例
   * @returns AnyTBaseType类型
   * @example
   * ```ts
   * const instance = new AnyBaseEntity();
   * const result = AnyClassTransformHelper.toAliasJson(instance);
   * ```
   */
  static toAliasJson<T extends AnyBaseModel>(instance: T, toAliasType?: EToAliasType): TBaseType {
    const keys = Object.keys(instance);
    const result: TBaseType = {};
    keys.forEach(key => {
      const aliasConfig = AnyDecoratorHelper.getMetadataByField(ALIAS_METADATA_KEY, instance, key) as IAlias || null;
      let alias = key;
      if (aliasConfig) {
        switch (toAliasType) {
          case EToAliasType.Form:
            alias = aliasConfig.formAlias || aliasConfig.alias;
            break;
          case EToAliasType.Search:
            alias = aliasConfig.searchAlias || aliasConfig.alias;
            break;
          default:
            alias = aliasConfig.alias;
            break;
        }
      }
      result[alias] = instance[key];
    });
    return result;
  }

  /**
   * 将AnyTBaseType类型转换为指定类型的实例
   * @param type AnyTBaseType类型
   * @returns 指定类型的实例
   * @example
   * ```ts
   * const data = {};
   * const result = AnyClassTransformHelper.toInstance(type,AnyBaseEntity);
   * ```
   */
  static toInstance<T extends AnyBaseModel>(data: TBaseType = {}, classz: ClassConstructor<T>): T {
    const instance = new classz();
    const keys = Object.keys(instance);
    keys.forEach(key => {
      if (data[key] !== undefined && data[key] !== null) {
        // 按别名获取来源数据
        const aliasConfig = AnyDecoratorHelper.getMetadataByField(ALIAS_METADATA_KEY, instance, key) as IAlias || null;
        let alias = key;
        if (aliasConfig) {
          alias = aliasConfig.alias;
        }
        // 获取字段类型标记
        const type = AnyDecoratorHelper.getMetadataByField(TYPE_METADATA_KEY, instance, key) as ClassConstructor<any> || null;
        // 无类型标记，则直接赋值
        if (!type) {
          (instance as any)[key] = data[alias];
          return;
        }
        // 数据是数组，则递归转换
        if (Array.isArray(data[alias])) {
          (instance as any)[key] = instance.fromObjectArray(data[alias]);
          return;
        }
        // 如果字段类型标记存在，则将来源数据转换为该类型
        switch (type.name) {
          case 'Number':
            (instance as any)[key] = Number(data[alias]);
            break;
          case 'String':
            (instance as any)[key] = String(data[alias]);
            break;
          case 'Boolean':
            (instance as any)[key] = Boolean(data[alias]);
            break;
          default:
            (instance as any)[key] = new type().fromObject(data[alias]);
            break;
        }
      }
    });
    return instance;
  }

  /**
   * 将AnyTBaseType类型数组转换为指定类型的实例数组
   * @param type AnyTBaseType类型数组
   * @returns 指定类型的实例数组
   * @example
   * ```ts
   * const data = [];
   * const result = AnyClassTransformHelper.toInstanceArray(data,AnyBaseEntity);
   * ```
   */
  static toInstanceArray<T extends AnyBaseModel>(data: TBaseType[] = [], classz: ClassConstructor<T>): T[] {
    return data.map(item => AnyClassTransformHelper.toInstance(item, classz));
  }
}