import { ActionType } from "typesafe-actions";

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

export interface ThemeRequest {
  theme: ThemeNames;
}

export interface ThemeSuccess {
  colours: ColourListType;
}

export interface ThemeError {
  error: Error;
}

export type ThemeNames = "portal" | "saas" | "default";

export type ThemeStateType = Partial<ThemeRequest & ThemeSuccess & ThemeError>;
export type ThemeActionsType = ActionType<typeof import("./actions")>;
