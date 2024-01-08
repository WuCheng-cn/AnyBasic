import { TBaseType } from "type/TBaseType";

/**
 * # 抽象数据模型基类
 */
export abstract class AnyBaseModel {
  [key: string]: any;
  /**
   * # 按别名将当前实例转为JSON
   */
  toAliasJson(): TBaseType {
    const keys = Object.keys(this);
    const result: TBaseType = {};
    keys.forEach(key => {
      const value = this[key];
      if (value ?? false) {
        result[key] = value;
      }
    });
    return result;
  }


}