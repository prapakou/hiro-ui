import { ActionType } from "typesafe-actions";

export const AUTH_NAMESPACE = "auth";

export interface TokenSet {
  token: string;
}

export type AuthStateType = Partial<TokenSet>;

export type AuthActionsType = ActionType<typeof import("./actions")>;
