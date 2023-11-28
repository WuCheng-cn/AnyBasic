import 'reflect-metadata';
/**
 * 装饰器助手类
 */
export class AnyDecoratorHelper {
  
   /**
   * # 反射添加元数据
   * @param target 目标类
   * @param key 配置key
   * @param value 配置值
   * @example
   * ```ts
   * AnyDecoratorHelper.defineMetadata(target, key, value);
   * ```
   */
   private static defineMetadata(target: any, key: string, value: any) {
    Reflect.defineMetadata(key, value, target);
  }
  
  /**
   * # 反射获取元数据
   * @param target 目标类
   * @param key 配置key
   * @returns 配置值
   * @example
   * ```ts
   * const value = AnyDecoratorHelper.getMetadata(target, key);
   * ```
   */
  private static getMetadata(target: any, key: string) {
    return Reflect.getMetadata(key, target);
  }

  /**
   * # 获取类上标记了指定装饰器的字段列表
   * @param target 目标类
   * @param decorator 装饰器
   * @returns 字段列表
   * @example
   * ```ts
   * const fields = AnyDecoratorHelper.getFieldsByDecorator(target, decorator);
   * ```
   * @description 该方法会递归遍历目标类以及父类的所有字段（持续到AnyBaseModel），如果字段上标记了指定装饰器，则将字段名添加到列表中
   */
  public static getFieldsByDecorator(target: any, decorator: any): string[] {
    let fields: string[] = [];
    let prototype = Reflect.getPrototypeOf(target);
    while (prototype && prototype.constructor.name !== 'AnyBaseModel') {
      const keys = Object.getOwnPropertyNames(prototype);
      for (const key of keys) {
        if (AnyDecoratorHelper.getMetadata(prototype, key) === decorator) {
          fields.push(key);
        }
      }
      prototype = Reflect.getPrototypeOf(prototype);
    }
    return fields;
  }

  /**
   * # 获取目标类指定字段上的指定配置
   * @param target 目标类
   * @param field 字段名
   * @param key 配置key
   * @returns 配置值
   * @example
   * ```ts
   * const value = AnyDecoratorHelper.getMetadataByField(target, field, key);
   * ```
   * @description 该方法会递归遍历目标类以及父类的所有字段（持续到AnyBaseModel）
   */
  public static getMetadataByField(target: any, field: string, key: string): any {
    const fieldConfig = this.getMetadata(target[field], key);
    if (fieldConfig) {
      return fieldConfig;
    }
    let prototype = Reflect.getPrototypeOf(target);
    if (prototype && prototype.constructor.name !== 'AnyBaseModel') {
      return this.getMetadataByField(prototype, field, key);
    }else{
      return null;
    }
  }

  /**
   * # 获取目标类指定字段列表上的指定配置列表
   * @param target 目标类
   * @param fields 字段列表
   * @param key 配置key
   * @returns 配置值列表
   * @example
   * ```ts
   * const values = AnyDecoratorHelper.getMetadataByFields(target, fields, key);
   * ```
   * @description 该方法会递归遍历目标类以及父类的所有字段（持续到AnyBaseModel）
   */
  public static getMetadataByFields(target: any, fields: string[], key: string): any[] {
    let values: any[] = [];
    for (const field of fields) {
      const value = this.getMetadataByField(target, field, key);
      if (value) {
        values.push(value);
      }
    }
    return values;
  }

}