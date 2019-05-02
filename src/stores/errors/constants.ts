import { ActionType } from "typesafe-actions";

export const ERROR_NAMESPACE = "error";

export interface ErrorMessage {
  message: string;
  name?: string;
}

export type ErrorStateType = ErrorMessage | null;
export type ErrorActionsType = ActionType<typeof import("./actions")>;
