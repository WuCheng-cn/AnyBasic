import { IAlias } from "interface/IAlias";
import { TBaseType } from "type/TBaseType";
import { EToAliasType } from "enum/EToAliasType";
import { ALIAS_METADATA_KEY } from "decorator/Alias";
import { AnyDecoratorHelper } from "helper/AnyDecoratorHelper";
import { TYPE_METADATA_KEY } from "decorator/Type";
import { ClassConstructor } from "type/ClassConstructor";
import { FIELDCONFIG_METADATA_KEY } from "decorator/FieldConfig";
import { IFieldConfig } from "interface/IFieldConfig";
import { ENTITYCONFIG_METADATA_KEY } from "decorator/EntityConfig";
import { IEntityConfig } from "interface/IEntityConfig";

/**
 * # 抽象数据模型基类
 */
export abstract class AnyBaseModel {
  [key: string]: any;
  /**
   * # 按别名将当前实例转为JSON
   * @param toAliasType 转换类型
   * @returns 转换后的JSON
   */
  toAliasJson(toAliasType?:EToAliasType): TBaseType {
    const keys = Object.keys(this);
    const result: TBaseType = {};
    keys.forEach(key => {
      // 获取别名配置
      const aliasConfig = AnyDecoratorHelper.getMetadataByField(ALIAS_METADATA_KEY, this, key) as IAlias || null;
      let alias = key;
      // 根据别名配置获取别名
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
      result[alias] = this[key];
    });
    return result;
  }

  /**
   * # 暴露实体的某些字段
   * @param fields 字段列表
   * @returns 暴露后的实体
   */
  expose(...fields: string[]): TBaseType {
    const result: TBaseType = {};
    fields.forEach(field => {
      result[field] = this[field];
    });
    return result;
  }

  /**
   * # 排除实体的某些字段
   * @param fields 字段列表
   * @returns 排除后的实体
   */
  exclude(...fields: string[]): TBaseType {
    const result: TBaseType = {};
    const keys = Object.keys(this);
    keys.forEach(key => {
      if (!fields.includes(key)) {
        result[key] = this[key];
      }
    });
    return result;
  }

  /**
   * # 从普通对象转换到当前类的实例
   * @param sourceData 来源数据对象
   * @returns 当前类的实例
   * @description 该方法会将来源数据对象中的所有字段赋值到当前类的实例中
   */
  fromObject(sourceData: TBaseType): this {
    const keys = Object.keys(this);
    keys.forEach(key => {
      if (sourceData[key] !== undefined && sourceData[key] !== null) {
        // 按别名获取来源数据
        const aliasConfig = AnyDecoratorHelper.getMetadataByField(ALIAS_METADATA_KEY, this, key) as IAlias || null;
        let alias = key;
        if (aliasConfig) {
          alias = aliasConfig.alias;
        }
        // 获取字段类型标记
        const type = AnyDecoratorHelper.getMetadataByField(TYPE_METADATA_KEY, this, key) as ClassConstructor<any> || null;
        // 无类型标记，则直接赋值
        if (!type) {
          this[key] = sourceData[alias];
          return;
        }
        // 数据是数组，则递归转换
        if (Array.isArray(sourceData[alias])) {
          this[key] = this.fromObjectArray(sourceData[alias]);
          return;
        }
        // 如果字段类型标记存在，则将来源数据转换为该类型
        switch (type.name) {
          case 'Number':
            this[key] = Number(sourceData[alias]);
            break;
          case 'String':
            this[key] = String(sourceData[alias]);
            break;
          case 'Boolean':
            this[key] = Boolean(sourceData[alias]);
            break;
          default:
            this[key] = new type().fromObject(sourceData[alias]);
            break;
        }
      }
    });
    return this;
  }

  /**
   * # 从来源数据对象数组转换到当前类的实例数组
   * @param sourceDataList 来源数据对象数组
   * @returns 当前类的实例数组
   * @description 该方法会将来源数据对象数组中的所有对象转换为当前类的实例
   */
  fromObjectArray(sourceDataList: TBaseType[]): this[] {
    const result: this[] = [];
    sourceDataList.forEach(sourceData => {
      const model = new (this.constructor as any)();
      model.fromObject(sourceData);
      result.push(model);
    });
    return result;
  }

  /**
   * # 获取指定属性的字段描述名称
   * @param field 字段名
   * @returns 字段描述名称
   * @description 该方法会递归遍历目标类以及父类的所有字段（持续到AnyBaseModel）
   * @example
   * ```ts
   * const name = AnyBaseEntity.getFieldName('name');
   * ```
   */
  public static getFieldName(field: string): string {
    const fieldConfig = AnyDecoratorHelper.getMetadataByField(FIELDCONFIG_METADATA_KEY, this, field) as IFieldConfig || null;
    if (fieldConfig && fieldConfig.name) {
      return fieldConfig.name;
    }
    let prototype = Reflect.getPrototypeOf(this);
    if (prototype && prototype.constructor.name !== 'AnyBaseModel') {
      return this.getFieldName.call(prototype, field);
    }
    return field;
  }

  /**
   * # 获取当前类的配置名称
   * @returns 当前类的配置名称
   */
  public static getClassName(): string {
    const entityConfig = AnyDecoratorHelper.getMetadataByField(ENTITYCONFIG_METADATA_KEY, this) as IEntityConfig || null;
    if (entityConfig && entityConfig.name) {
      return entityConfig.name;
    }
    return this.name;
  }
    
}