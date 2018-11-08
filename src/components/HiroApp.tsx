import React, { Component } from "react";
import { IAuthConfig } from "../auth";
import { HiroLoginContext, IThemeColour, ThemeContext } from "../contexts";
import { HiroLogin } from "./HiroLogin";

interface IHiroAppProps {
  theme?: "portal" | "saas" | "default";
  themeVersion?: string;
  ready?: () => void;
  orm?: any;
  me?: any;
  config?: IAuthConfig;
  login?: boolean;
}

interface IHiroAppState {
  colours?: {
    IThemeColour: string;
  };
}

export class HiroApp extends Component<IHiroAppProps, IHiroAppState> {
  state: IHiroAppState = {};

  componentDidMount() {
    const theme = this.props.theme || "default";
    const themeVersion = this.props.themeVersion || "latest";
    fetch(
      `https://dtlv35ikt30on.cloudfront.net/${themeVersion}/${theme}/colours.json`
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
    const {
      login,
      config,
      children,
      orm,
      me,
      theme = "default",
      themeVersion = "latest"
    } = this.props;

    let content = children;

    if (login && config) {
      content = <HiroLogin config={config}>{children}</HiroLogin>;
    } else if (orm && me) {
      content = (
        <HiroLoginContext.Provider value={{ orm, me }}>
          {children}
        </HiroLoginContext.Provider>
      );
    }

    return (
      <ThemeContext.Provider
        value={{
          getColour: this.state.colours ? this.getColour : undefined
        }}
      >
        <link
          rel="stylesheet"
          href={`https://dtlv35ikt30on.cloudfront.net/${themeVersion}/${theme}/semantic.min.css`}
          onLoad={this.onLoad}
        />
        {content}
      </ThemeContext.Provider>
    );
  };
}
