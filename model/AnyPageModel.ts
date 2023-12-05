import { IPage } from "interface/IPage";
import { AnyBaseModel } from "./AnyBaseModel";

/**
 * # 分页数据模型
 */
export class AnyPageModel extends AnyBaseModel implements IPage {
  /**
   * # 当前页码
   */
  current: number = 1;

  /**
   * # 每页条数
   */
  size: number = 10;

  /**
   * # 数据总数
   */
  total: number = 0;
}