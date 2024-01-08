import { AnyRequestDto } from "./AnyRequestDto";
import { AnyPageModel } from "model/AnyPageModel";

/**
 * # 分页请求数据传输对象
 */
export class AnyRequestPageDto<T> extends AnyRequestDto<T> {
  /**
   * # 分页信息
   */
  page = new AnyPageModel();
}