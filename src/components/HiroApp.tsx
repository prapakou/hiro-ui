import React, { Component, createContext } from "react";
import { Loader } from "semantic-ui-react";

type IThemeColour =
  | "primaryColor"
  | "secondaryColor"
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

interface IHiroAppProps {
  theme?: "portal" | "saas" | "default";
  ready?: () => void;
}

interface IHiroAppState {
  colours?: {
    IThemeColour: string;
  };
}

export const ThemeContext = createContext<IThemeContext>({});

export const ThemeConsumer = ThemeContext.Consumer;

export class HiroApp extends Component<IHiroAppProps, IHiroAppState> {
  state: IHiroAppState = {};

  componentDidMount() {
    const theme = this.props.theme || "default";
    fetch(
      `//cdn.jsdelivr.net/gh/arago/hiro-ui-themes@latest/dist/${theme}/colours.json`
    )
      .then(res => res.json())
      .then(colours => {
        this.setState({ colours });
      });
  }

  onLoad = () => this.props.ready && this.props.ready();

  getColour = (colour: IThemeColour) =>
    this.state.colours ? this.state.colours[colour] || "black" : "black";

  render = () => (
    <ThemeContext.Provider
      value={{
        getColour: this.state.colours ? this.getColour : undefined
      }}
    >
      <link
        rel="stylesheet"
        href={`//cdn.jsdelivr.net/gh/arago/hiro-ui-themes@latest/dist/${this
          .props.theme || "default"}/semantic.min.css`}
        onLoad={this.onLoad}
      />
      {this.props.children}
    </ThemeContext.Provider>
  );
}
