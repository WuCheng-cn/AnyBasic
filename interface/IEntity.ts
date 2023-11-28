/**
 * 数据库实体接口
 * @interface AnyIEntity
 */
export interface IEntity {
  /**
   * 主键ID
   */
  id: number|string;

  /**
   * 创建人
   */
  createdBy: string;

  /**
   * 创建时间
   */
  createdTime: Date;

  /**
   * 更新人
   */
  updatedBy?: string;

  /**
   * 更新时间
   */
  updatedTime?: Date;
}