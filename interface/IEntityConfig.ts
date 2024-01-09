export interface IEntityConfig {
  /**
   * # 实体名称
   */
  name: string;

  /**
   * # 实体描述
   */
  description?: string;

  /**
   * # 查询权限
   */
  searchPermission?: string;

  /**
   * # 新增权限
   */
  addPermission?: string;

  /**
   * # 编辑权限
   */
  editPermission?: string;

  /**
   * # 删除权限
   */
  deletePermission?: string;
}