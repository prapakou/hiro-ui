import { createContext, useContext } from "react";
import { ORM } from "@hiro-graph/orm";
import {
  MappedTypes,
  VertexLookup,
  AuthAccountVertex,
  AuthAccountProfileVertex
} from "@hiro-graph/orm-mappings";

export type Orm = {
  me(): Promise<AuthAccountVertex>;
} & ORM<MappedTypes, typeof VertexLookup>;

export interface AuthMe {
  account: AuthAccountVertex;
  profile: AuthAccountProfileVertex;
}

export interface AuthContext {
  token?: string;
  orm?: Orm;
  me?: AuthMe;
}

export const HiroGraphContext = createContext<AuthContext>({});

export const useGraph = () => {
  const state = useContext(HiroGraphContext);

  if (process.env.NODE_ENV === "development" && !state.token) {
    console.warn("HiroGraph: No token found. ORM will not be available");
  }

  return state;
};
