import { IEntity } from "../interface/IEntity";
import { AnyBaseModel } from "../model/AnyBaseModel";

/**
 * 数据库实体基类
 */
export class AnyBaseEntity extends AnyBaseModel implements IEntity{
  id!: string | number;
  createdBy!: string;
  createdTime!: Date;
  updatedBy?: string | undefined;
  updatedTime?: Date | undefined;
}