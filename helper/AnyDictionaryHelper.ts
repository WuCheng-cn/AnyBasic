import { AnyDictionaryModel } from "../model/AnyDictionaryModel"
import { IDictionary } from "../interface/IDictionary";
import { AnyDictionaryArrayModel } from "../model/AnyDictionaryArrayModel";
/**
 * # 字典助手类
 */
export class AnyDictionaryHelper {
  /**
   * # 根据传入数据创建字典
   * @param data
   * @description 该方法会将传入的数据转换为字典对象
   * @example
   * ```ts
   * const dictionary = AnyDictionaryHelper.createDictionary(data);
   * ```
   */
  static #createDictionary(data: IDictionary) {
    let dictionary = new AnyDictionaryModel();
    dictionary.key = data.key;
    dictionary.label = data.label;
    dictionary.description = data.description;
    dictionary.color = data.color;
    dictionary.disabled = data.disabled;
    dictionary.hidden = data.hidden;
    dictionary.readonly = data.readonly;
    return dictionary;
  }

  /**
   * # 根据传入数据创建字典数组
   * @param data
   * @description 该方法会将传入的数据转换为字典数组
   * @example
   * ```ts
   * const dictionaryArray = AnyDictionaryHelper.createDictionaryArray(data);
   * ```
   */
  static createDictionaryArray(data: IDictionary[]): AnyDictionaryArrayModel<AnyDictionaryModel> {
    let dictionaryArray = new AnyDictionaryArrayModel<AnyDictionaryModel>();
    for (const item of data) {
      dictionaryArray.push(this.#createDictionary(item));
    }
    return dictionaryArray;
  }

}