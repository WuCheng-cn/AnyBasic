import { TBaseType } from "type/TBaseType";

/**
 * # fetch请求类
 */
export class AnyFetchRequest {
  /**
   * # 请求是否正在进行中
   */
  private loading: boolean = false;

  /**
   * # 请求头
   */
  private headers: TBaseType = {};

  /**
   * # 发起请求
   * @param url 请求地址
   * @param method 请求方法
   * @param params 请求参数
   */
  private request(url: string, method: string, params?: any) {
    return new Promise((resolve, reject) => {
      if (this.loading) {
        reject('请求正在进行中，请稍后再试');
      }
      this.loading = true;
      fetch(url, {
        method,
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
          ...this.headers
        }
      }).then(res => {
        this.loading = false;
        if (res.ok) {
          return res.json();
        } else {
          reject(res.statusText);
        }
      }).then(res => {
        resolve(res);
      }).catch(err => {
        this.loading = false;
        reject(err);
      });
    });
  }

  /**
   * # 发起get请求
   * @param url 请求地址
   * @param params 请求参数
   * @description 该方法会发起get请求
   * @example
   * ```ts
   * const result = await new AnyFetchRequest().get(url, params);
   * ```
   */
  async get(url: string, params?: any) {
    return await this.request(url, 'GET', params);
  }

  /**
   * # 发起post请求
   * @param url 请求地址
   * @param params 请求参数
   * @description 该方法会发起post请求
   * @example
   * ```ts
   * const result = await new AnyFetchRequest().post(url, params);
   * ```
   */
  async post(url: string, params?: any) {
    return await this.request(url, 'POST', params);
  }

  /**
   * # 发起put请求
   * @param url 请求地址
   * @param params 请求参数
   * @description 该方法会发起put请求
   * @example
   * ```ts
   * const result = await new AnyFetchRequest().put(url, params);
   * ```
   */
  async put(url: string, params?: any) {
    return await this.request(url, 'PUT', params);
  }

  /**
   * # 发起delete请求
   * @param url 请求地址
   * @param params 请求参数
   * @description 该方法会发起delete请求
   * @example
   * ```ts
   * const result = await new AnyFetchRequest().delete(url, params);
   * ```
   */
  async delete(url: string, params?: any) {
    return await this.request(url, 'DELETE', params);
  }

  /**
   * # 设置请求头
   * @param key 请求头key
   * @param value 请求头value
   * @description 该方法会设置请求头
   * @example
   * ```ts
   * new AnyFetchRequest().setHeader(key, value);
   * ```
   */
  setHeader(key: string, value: string) {
    this.headers[key] = value;
    return this;  
  }

}