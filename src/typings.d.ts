import { ORM } from "hiro-graph-orm";
import {
  Definitions,
  MappedTypes
} from "../../hiro-graph-js/packages/hiro-graph-orm-mappings/lib";

type Orm = ORM<MappedTypes, typeof Definitions>;
