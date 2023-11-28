import { AnyBaseModel } from "../model/AnyBaseModel";
import { TBaseType } from "../type/TBaseType";

export class AnyClassTransformHelper {

  /**
   * 将AnyBaseModel的实例转换为AnyTBaseType类型
   * @param instance AnyBaseModel的实例
   * @returns AnyTBaseType类型
   * @example
   * ```ts
   * const instance = new AnyBaseModel();
   * const result = AnyClassTransformHelper.toAnyTBaseType(instance);
   * ```
   */
  static toAnyTBaseType<T extends AnyBaseModel>(instance: T): TBaseType {
    const keys = Object.keys(instance);
    const result: TBaseType = {};
    keys.forEach((key) => {
      result[key] = instance[key];
    });
    return result;
  }

  /**
   * 将AnyTBaseType类型转换为指定类型的实例
   * @param type AnyTBaseType类型
   * @returns 指定类型的实例
   * @example
   * ```ts
   * const type = {};
   * const result = AnyClassTransformHelper.toInstance(type,AnyBaseModel);
   * ```
   */
  static toInstance<T extends AnyBaseModel>(data: TBaseType = {}, classz: T): T {
    const keys = Object.keys(data);
    keys.forEach((key) => {
      classz[key] = data[key];
    });
    return classz;
  }
}