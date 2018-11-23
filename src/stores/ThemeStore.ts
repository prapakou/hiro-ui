import { Container } from "unstated";

export type ThemeNames = "portal" | "saas" | "default";
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

export interface IThemeStore {
  colours?: { [index: string]: string };
}

export class ThemeStore extends Container<IThemeStore> {
  state: IThemeStore = {};

  load(theme: ThemeNames = "default", themeVersion: string = "latest") {
    fetch(
      `https://dtlv35ikt30on.cloudfront.net/${themeVersion}/${theme}/colours.json`
    )
      .then(res => res.json())
      .then(colours => {
        this.setState({ colours });
      });
  }

  getColour(colour: ThemeColours) {
    return this.state.colours ? this.state.colours[colour] || "black" : "black";
  }
}
