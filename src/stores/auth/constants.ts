import { ActionType } from "typesafe-actions";

export const AUTH_NAMESPACE = "auth";

export interface ITokenSet {
  token: string;
}

export type AuthStateType = Partial<ITokenSet>;

export type AuthActionsType = ActionType<typeof import("./actions")>;
