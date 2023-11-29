import { EStandardStatusColor } from "../enum/EStandardStatusColor";
import { IDictionary } from "../interface/IDictionary";

export class AnyDictionaryModel implements IDictionary {
  key: string | number | symbol | boolean;
  label: any;
  description?: string;
  color = EStandardStatusColor.Default;
  disabled = false;
  hidden = false;
  readonly= false;
}