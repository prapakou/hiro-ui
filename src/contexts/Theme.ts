import { createContext } from "react";

export type IThemeColour =
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

export interface IThemeContext {
  getColour?: (colour: IThemeColour) => string;
}

export const ThemeContext = createContext<IThemeContext>({});
