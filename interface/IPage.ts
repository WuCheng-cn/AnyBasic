export interface IPage {
  /**
   * # 当前页码
   */
  current: number;

  /**
   * # 每页条数
   */
  size: number;

  /**
   * # 数据总数
   */
  total?: number;
  
}