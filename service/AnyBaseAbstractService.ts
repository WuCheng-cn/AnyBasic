import { AnyRequestPageDto } from "dto/AnyRequestPageDto";
import { AnyBaseEntity } from "entity/AnyBaseEntity";
import { EToAliasType } from "enum/EToAliasType";
import { AnyClassTransformHelper } from "helper/AnyClassTransformHelper";
import { AnyFetchHttp } from "http/AnyFetchHttp";
import { ClassConstructor } from "type/ClassConstructor";

/**
 * # 与后端约定的获取分页数据的标准url
 */
const GET_PAGE_DATA_URL = 'page'

/**
 * # 与后端约定的获取所有数据的标准url
 */
const GET_ALL_DATA_URL = 'all'

/**
 * # 与后端约定的获取详情的标准url
 */
const GET_DETAIL_URL = 'detail'

/**
 * # 与后端约定的新增的标准url
 */
const ADD_URL = 'add'

/**
 * # 与后端约定的编辑的标准url
 */
const EDIT_URL = 'edit'

/**
 * # 与后端约定的删除的标准url
 */
const DELETE_URL = 'delete'

/**
 * # 抽象服务基类
 */
export abstract class AnyBaseAbstractService<T extends AnyBaseEntity> extends AnyFetchHttp {
  /**
   * # 基础url
   */
  baseUrl!: string

  /**
   * # 获取分页数据
   */
  async getPage(request: AnyRequestPageDto<T>, classz: ClassConstructor<AnyBaseEntity>) {
    const res = await this.post(`${this.baseUrl}/${GET_PAGE_DATA_URL}`, request.toAliasJson(EToAliasType.Search))
    const result = AnyClassTransformHelper.toInstance(res, classz)
    return result
  }

  /**
   * # 获取所有数据
   */
  async getAll(classz: ClassConstructor<AnyBaseEntity>) {
    const res = await this.post(`${this.baseUrl}/${GET_ALL_DATA_URL}`)
    const result = AnyClassTransformHelper.toInstance(res, classz)
    return result
  }

  /**
   * # 获取详情
   * @param id
   */
  async getDetail(id: string | number, classz: ClassConstructor<AnyBaseEntity>) {
    const res = await this.post(`${this.baseUrl}/${GET_DETAIL_URL}`, { id })
    const result = AnyClassTransformHelper.toInstance(res, classz)
    return result
  }

  /**
   * # 新增
   * @param data
   */
  async add(data: T) {
    await this.post(`${this.baseUrl}/${ADD_URL}`, data.toAliasJson(EToAliasType.Form))
    return
  }

  /**
   * # 编辑
   * @param data
   */
  async edit(data: T) {
    await this.post(`${this.baseUrl}/${EDIT_URL}`, data.toAliasJson(EToAliasType.Form))
    return
  }

  /**
   * # 保存
   * @param data
   * @description 如果传入的数据有id则为编辑，否则为新增
   */
  save(data: T) {
    if (data.id) {
      return this.edit(data)
    } else {
      return this.add(data)
    }
  }

  /**
   * # 通过单个id删除
   * @param id
   * @private
   */
  async #deleteById(id: string | number) {
    await this.post(`${this.baseUrl}/${DELETE_URL}`, { id: [id] })
    return
  }

  /**
   * # 通过多个id删除
   * @param ids
   * @private
   */
  async #deleteByIds(ids: (string | number)[]) {
    await this.post(`${this.baseUrl}/${DELETE_URL}`, { id: ids })
    return
  }

  /**
   * # 删除
   * @description 接受id或id数组
   * @param id
   */
  async deleteBy(id: string | number | (string | number)[]) {
    if (Array.isArray(id)) {
      return this.#deleteByIds(id)
    } else {
      return this.#deleteById(id)
    }
  }

}