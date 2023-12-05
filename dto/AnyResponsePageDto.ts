import { EHttpCode } from "enum/EHttpCode";
import { IPage } from "interface/IPage";
import { AnyBaseModel } from "model/AnyBaseModel";
import { AnyPageModel } from "model/AnyPageModel";

export class AnyResponsePageDto<T extends AnyBaseModel> extends AnyPageModel {
  /**
   * # 数据列表
   */
  list: T[] = [];

  /**
   * # 响应状态码
   */
  code: EHttpCode = EHttpCode.Unknown;

  /**
   * # 响应信息
   */
  message: string = "";

}