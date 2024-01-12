export { AnyDecorator } from "./decorator"
export { AnyDto } from "./dto"
export { AnyEntity } from "./entity"
export { AnyEnum } from "./enum"
export { AnyHelper } from "./helper"
export { AnyHttp } from "./http"
export * as AnyInterface from "./interface"

import { AnyDecorator } from "./decorator"
import { AnyDto } from "./dto"
import { AnyEntity } from "./entity"
import { AnyEnum } from "./enum"
import { AnyHelper } from "./helper"
import { AnyHttp } from "./http"
import * as AnyInterface from "./interface"

export default {
  ...AnyDecorator,
  ...AnyDto,
  ...AnyEntity,
  ...AnyEnum,
  ...AnyHelper,
  ...AnyHttp,
  ...AnyInterface
}