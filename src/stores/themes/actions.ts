import { createStandardAction } from "typesafe-actions";

import { ThemeRequest, ThemeSuccess, ThemeError } from "./constants";

export const themeRequest = createStandardAction("THEME_REQUEST")<
  ThemeRequest
>();
export const themeSuccess = createStandardAction("THEME_SUCCESS")<
  ThemeSuccess
>();
export const themeError = createStandardAction("THEME_ERROR")<ThemeError>();
