import { createContext, useContext } from "react";
import { ORM } from "@hiro-graph/orm";
import {
  MappedTypes,
  VertexLookup,
  AuthAccountVertex
} from "@hiro-graph/orm-mappings";

export type Orm = {
  me(): Promise<AuthAccountVertex>;
} & ORM<MappedTypes, typeof VertexLookup>;

export interface GraphContext {
  token?: string;
  orm?: Orm;
  me?: AuthAccountVertex;
}

export const HiroGraphContext = createContext<GraphContext>({});

export const useGraph = () => {
  const state = useContext(HiroGraphContext);

  if (process.env.NODE_ENV === "development" && !state.orm) {
    console.warn("HiroGraph: ORM not available, check token");
  }

  return state;
};
