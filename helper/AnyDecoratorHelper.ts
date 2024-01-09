import 'reflect-metadata';
/**
 * 装饰器助手类
 */
export class AnyDecoratorHelper {

  /**
  * # 反射添加元数据
  * @param key 配置key
  * @param value 配置值
  * @param target 目标类
  * @param field 字段名
  * @example
  * ```ts
  * AnyDecoratorHelper.defineMetadata(target, key, value);
  * ```
  */
  static defineMetadata(key: any, value: any, target: any, field?: string) {
    if (field) {
      Reflect.defineMetadata(key, value, target, field);
    } else {
      Reflect.defineMetadata(key, value, target);
    }
  }

  /**
   * # 反射获取元数据
   * @param key 配置key
   * @param target 目标类
   * @param field 字段名
   * @returns 配置值
   * @example
   * ```ts
   * const value = AnyDecoratorHelper.getMetadata(target, key);
   * ```
   */
  private static getMetadata(key: any, target: any, field?: string) {
    if (field) {
      return Reflect.getMetadata(key, target, field);
    } else {
      return Reflect.getMetadata(key, target);
    }
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
    for (const field of Object.keys(target)) {
      const fieldConfig = this.getMetadata(decorator, target, field);
      if (fieldConfig) {
        fields.push(field);
      }
    }
    let prototype = Reflect.getPrototypeOf(target);
    if (prototype && prototype.constructor.name !== 'AnyBaseModel') {
      return fields.concat(this.getFieldsByDecorator(prototype, decorator));
    } else {
      return fields;
    }
  }

  /**
   * # 获取目标类指定字段上的指定配置
   * @param key 配置key
   * @param target 目标类
   * @param field 字段名
   * @returns 配置值
   * @example
   * ```ts
   * const value = AnyDecoratorHelper.getMetadataByField(target, field, key);
   * ```
   * @description 该方法会递归遍历目标类以及父类的所有字段（持续到AnyBaseModel）
   */
  public static getMetadataByField(key: any, target: any, field?: string,): any {
    const value = this.getMetadata(key, target, field);
    if (value) {
      return value;
    }
    let prototype = Reflect.getPrototypeOf(target);
    if (prototype && prototype.constructor.name !== 'AnyBaseModel') {
      return this.getMetadataByField(key, prototype, field,);
    } else {
      return null;
    }
  }

  /**
   * # 获取目标类指定字段列表上的指定配置列表
   * @param key 配置key
   * @param target 目标类
   * @param fields 字段列表
   * @returns 配置值列表
   * @example
   * ```ts
   * const values = AnyDecoratorHelper.getMetadataByFields(target, fields, key);
   * ```
   * @description 该方法会递归遍历目标类以及父类的所有字段（持续到AnyBaseModel）
   */
  public static getMetadataByFields(key: any, target: any, fields: string[],): any[] {
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