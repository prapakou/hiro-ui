import { ORM } from "@hiro-graph/orm";
import { Definitions, MappedTypes } from "@hiro-graph/orm-mappings";

type Orm = ORM<MappedTypes, typeof Definitions>;
