export const THEME_NAMESPACE = "theme";

export type ThemeColours =
  | "primaryColor"
  | "secondaryColor"
  | "primaryText"
  | "secondaryText"
  | "lightPrimaryColor"
  | "lightSecondaryColor"
  | "pageBackground"
  | "red"
  | "orange"
  | "yellow"
  | "olive"
  | "green"
  | "teal"
  | "blue"
  | "violet"
  | "purple"
  | "pink"
  | "brown"
  | "grey"
  | "black"
  | "subtleTransparentBlack"
  | "transparentBlack"
  | "strongTransparentBlack"
  | "veryStrongTransparentBlack"
  | "subtleTransparentWhite"
  | "transparentWhite"
  | "strongTransparentWhite"
  | "veryStrongTransparentWhite";

export type ColourListType = { [key in ThemeColours]: string } | undefined;

export interface IThemeRequest {
  theme: ThemeNames;
  themeVersion: ThemeVersions;
}

export interface IThemeSuccess {
  colours: ColourListType;
}

export interface IThemeError {
  error: Error;
}

export type ThemeStateType = Partial<
  IThemeRequest & IThemeSuccess & IThemeError
>;

export type ThemeVersions = string | "latest";
export type ThemeNames = "portal" | "saas" | "default";
