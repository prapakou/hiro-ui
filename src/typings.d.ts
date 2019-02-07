import { ORM } from "@hiro-graph/orm";
import { MappedTypes, VertexLookup } from "@hiro-graph/orm-mappings";

type Orm = ORM<MappedTypes, typeof VertexLookup>;
