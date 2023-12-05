import { AnyBaseModel } from "model/AnyBaseModel";
import { TBaseType } from "type/TBaseType";

/**
 * # 任意请求数据传输对象
 */
export class AnyRequestDto<T> extends AnyBaseModel implements TBaseType {
  queryParams: T = {} as T;
}