import { createStandardAction } from "typesafe-actions";
import { ITokenSet } from "./constants";

export const tokenSet = createStandardAction("TOKEN_SET")<ITokenSet>();
export const tokenClear = createStandardAction("TOKEN_CLEAR")();
