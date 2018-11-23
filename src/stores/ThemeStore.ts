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
  theme: ThemeNames;
  themeVersion: string;
  constructor(theme?: ThemeNames, themeVersion?: string) {
    super();
    this.theme = theme || "default";
    this.themeVersion = themeVersion || "latest";
  }

  load() {
    fetch(
      `https://dtlv35ikt30on.cloudfront.net/${this.themeVersion}/${
        this.theme
      }/colours.json`
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
