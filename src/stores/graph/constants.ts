import { ActionType } from "typesafe-actions";

export const GRAPH_NAMESPACE = "graph";

export interface TokenSet {
  token: string;
}

export type GraphStateType = Partial<TokenSet>;

export type GraphActionsType = ActionType<typeof import("./actions")>;
