import { AnyRequestPageDto } from "dto/AnyRequestPageDto";
import { AnyFetchHttp } from "http/AnyFetchHttp";

/**
 * # 与后端约定的获取分页数据的标准url
 */
const GET_PAGE_DATA_URL = '/page'

/**
 * # 抽象服务基类
 */
export abstract class AnyBaseAbstractService<T> extends AnyFetchHttp {
  /**
   * # 基础url
   */
  baseUrl!: string

  /**
   * # 获取分页数据
   */
  getPageList(request:AnyRequestPageDto<T>){
    return this.post(`${this.baseUrl}${GET_PAGE_DATA_URL}`, request)
  }

}