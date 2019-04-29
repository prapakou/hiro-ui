import { createActions } from "redux-actions";
import { IThemeRequest, IThemeSuccess, IThemeError } from "./constants";

export const { themeRequest, themeSuccess, themeError } = createActions({
  THEME_REQUEST: ({
    theme = "default",
    themeVersion = "latest"
  }: IThemeRequest) => ({
    theme,
    themeVersion
  }),
  THEME_SUCCESS: ({ colours }: IThemeSuccess) => ({ colours }),
  THEME_ERROR: ({ error }: IThemeError) => ({ error })
});
