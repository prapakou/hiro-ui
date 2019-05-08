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
  result: any;
}

export interface GraphQueryError {
  id: string;
  error: Error;
}

export type GraphQueryItem = {
  loading?: boolean;
  error?: Error;
} & Partial<GraphQueryRequest & GraphQuerySuccess & GraphQueryError>;

export interface GraphStateType {
  [index: string]: GraphQueryItem;
}
export type GraphActionsType = ActionType<typeof import("./actions")>;
