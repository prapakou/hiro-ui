import React, { Component, createContext } from "react";
import { Loader } from "semantic-ui-react";

type IThemeColour =
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

interface IHiroAppProps {
  theme?: "portal" | "saas" | "default";
  themeVersion?: string;
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
    const themeVersion = this.props.themeVersion || "latest";
    fetch(
      `http://dtlv35ikt30on.cloudfront.net/${themeVersion}/${theme}/colours.json`
    )
      .then(res => res.json())
      .then(colours => {
        this.setState({ colours });
      });
  }

  onLoad = () => this.props.ready && this.props.ready();

  getColour = (colour: IThemeColour) =>
    this.state.colours ? this.state.colours[colour] || "black" : "black";

  render = () => {
    const theme = this.props.theme || "default";
    const themeVersion = this.props.themeVersion || "latest";

    return (
      <ThemeContext.Provider
        value={{
          getColour: this.state.colours ? this.getColour : undefined
        }}
      >
        <link
          rel="stylesheet"
          href={`http://dtlv35ikt30on.cloudfront.net/${themeVersion}/${theme}/semantic.min.css`}
          onLoad={this.onLoad}
        />
        {this.props.children}
      </ThemeContext.Provider>
    );
  };
}
