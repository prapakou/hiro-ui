import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import { IAuthConfig } from "../auth";
import { HiroLoginContext, IThemeColour, ThemeContext } from "../contexts";

import { HiroLogin } from "./HiroLogin";

interface IHiroAppProps {
  theme?: "portal" | "saas" | "default";
  themeVersion?: string;
  ready?: () => void;
  orm?: any;
  config?: IAuthConfig;
  login?: boolean;
}

interface IHiroAppState {
  colours?: {
    IThemeColour: string;
  };
  me?: any;
}

export class HiroApp extends Component<IHiroAppProps, IHiroAppState> {
  state: IHiroAppState = {};

  componentDidMount() {
    const { orm, theme = "default", themeVersion = "latest" } = this.props;

    fetch(
      `https://dtlv35ikt30on.cloudfront.net/${themeVersion}/${theme}/colours.json`
    )
      .then(res => res.json())
      .then(colours => {
        this.setState({ colours });
      });

    if (orm) {
      orm.person().then(me => this.setState({ me }));
    }
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
      theme = "default",
      themeVersion = "latest"
    } = this.props;
    const { me } = this.state;

    let content = children;

    if (login && config) {
      content = <HiroLogin config={config}>{children}</HiroLogin>;
    } else if (orm) {
      content = (
        <HiroLoginContext.Provider value={{ orm, me }}>
          {children}
        </HiroLoginContext.Provider>
      );
    }

    return (
      <BrowserRouter>
        <ThemeContext.Provider
          value={{
            getColour: this.state.colours ? this.getColour : () => "transparent"
          }}
        >
          <link
            rel="stylesheet"
            href={`https://dtlv35ikt30on.cloudfront.net/${themeVersion}/${theme}/semantic.min.css`}
            onLoad={this.onLoad}
          />
          {content}
        </ThemeContext.Provider>
      </BrowserRouter>
    );
  };
}
