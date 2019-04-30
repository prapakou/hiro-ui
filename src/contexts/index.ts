import { createContext } from "react";
import { ORM } from "@hiro-graph/orm";

import {
  MappedTypes,
  VertexLookup,
  AuthAccountVertex
} from "@hiro-graph/orm-mappings";

export type Orm = {
  me(): Promise<AuthAccountVertex>;
} & ORM<MappedTypes, typeof VertexLookup>;

export interface IAuthContext {
  token?: string;
  orm?: Orm;
}

export const AuthContext = createContext<IAuthContext>({});
