export enum EHttpCode {
  /**
   * # 成功
   */
  Success = 200,

  /**
   * # 未授权
   */
  Unauthorized = 401,

  /**
   * # 未找到
   */
  NotFound = 404,

  /**
   * # 服务器错误
   */
  ServerError = 500,

  /**
   * # 服务不可用
   */
  ServiceUnavailable = 503,

  /**
   * # 网关超时
   */
  GatewayTimeout = 504,

  /**
   * # 未知错误
   */
  Unknown = 0,
}