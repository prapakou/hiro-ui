import { ActionType } from "typesafe-actions";

export const ERROR_NAMESPACE = "error";

export interface IErrorMessage {
  message: string;
  name?: string;
}

export type ErrorStateType = IErrorMessage | null;
export type ErrorActionsType = ActionType<typeof import("./actions")>;
