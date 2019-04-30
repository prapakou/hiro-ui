import { createStandardAction } from "typesafe-actions";

import { IThemeRequest, IThemeSuccess, IThemeError } from "./constants";

export const themeRequest = createStandardAction("THEME_REQUEST")<
  IThemeRequest
>();
export const themeSuccess = createStandardAction("THEME_SUCCESS")<
  IThemeSuccess
>();
export const themeError = createStandardAction("THEME_ERROR")<IThemeError>();
