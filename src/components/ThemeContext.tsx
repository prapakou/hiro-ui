import React, { Component, createContext } from "react";
import { Helmet } from "react-helmet";

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
  | "strongTransparentWhite";

export interface IThemeContext {
  getColour?: (colour: IThemeColour) => string;
}

interface IThemeProviderProps {
  theme?: "portal" | "saas" | "default";
}

interface IThemeProviderState {
  colours?: {
    IThemeColour: string;
  };
}

export const ThemeContext = createContext<IThemeContext>({});

export const ThemeConsumer = ThemeContext.Consumer;

export class ThemeProvider extends Component<
  IThemeProviderProps,
  IThemeProviderState
> {
  state: IThemeProviderState = {};

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

  getColour = (colour: IThemeColour) =>
    this.state.colours ? this.state.colours[colour] || "black" : "black";

  render = () => (
    <ThemeContext.Provider
      value={{
        getColour: this.state.colours ? this.getColour : undefined
      }}
    >
      <Helmet>
        <link
          rel="stylesheet"
          href={`//cdn.jsdelivr.net/gh/arago/hiro-ui-themes@latest/dist/${this
            .props.theme || "default"}/semantic.min.css`}
        />
      </Helmet>
      {this.props.children}
    </ThemeContext.Provider>
  );
}
