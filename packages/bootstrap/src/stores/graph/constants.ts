import { ActionType } from "typesafe-actions";
import { MappedTypes } from "@hiro-graph/orm-mappings";
import { GraphVertex, Entity } from "@hiro-graph/orm";

export const GRAPH_NAMESPACE = "graph";

export interface GraphQueryRequest {
  id: string;
  entity: MappedTypes;
  method: keyof Entity<GraphVertex>;
  args?: any;
}

export interface GraphQuerySuccess {
  id: string;
  response: any;
}

export interface GraphQueryError {
  id: string;
  error: string;
}

export type GraphQueryItem = {
  loading?: boolean;
} & Partial<GraphQueryRequest & GraphQuerySuccess & GraphQueryError>;

export interface GraphStateType {
  [index: string]: GraphQueryItem;
}
export type GraphActionsType = ActionType<typeof import("./actions")>;
