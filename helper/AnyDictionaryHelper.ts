/**
 * 字典助手类
 */
export class AnyDictionaryHelper {
  /**
   * # 获取字典中的所有键
   * @param dictionary 字典
   * @returns 键列表
   * @example
   * ```ts
   * const keys = AnyDictionaryHelper.getKeys(dictionary);
   * ```
   */
  public static getKeys(dictionary: any): string[] {
    return Object.keys(dictionary);
  }

  /**
   * # 获取字典中的所有值
   * @param dictionary 字典
   * @returns 值列表
   * @example
   * ```ts
   * const values = AnyDictionaryHelper.getValues(dictionary);
   * ```
   */
  public static getValues(dictionary: any): any[] {
    return Object.values(dictionary);
  }

  /**
   * # 获取字典中的所有键值对
   * @param dictionary 字典
   * @returns 键值对列表
   * @example
   * ```ts
   * const entries = AnyDictionaryHelper.getEntries(dictionary);
   * ```
   * @description 该方法会将字典中的每一项转换为键值对，然后将键值对添加到列表中
   */
  public static getEntries(dictionary: any): [string, any][] {
    return Object.entries(dictionary);
  }
  
}