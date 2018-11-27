import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "unstated";

import { IAuthConfig } from "../auth";
import { AuthStore, ThemeNames, ThemeStore } from "../stores";

import { Root } from "./Root";

interface IHiroAppProps {
  theme?: ThemeNames;
  themeVersion?: string;
  ready?: () => void;
  orm?: any;
  authConfig?: IAuthConfig;
  config?: any;
  children: any;
}

export const HiroApp = ({
  children,
  ready,
  theme = "default",
  themeVersion = "latest",
  authConfig,
  config,
  orm
}: IHiroAppProps) => (
  <>
    <link
      rel="stylesheet"
      href={`https://dtlv35ikt30on.cloudfront.net/${themeVersion}/${theme}/semantic.min.css`}
      onLoad={() => ready && ready()}
    />

    <Root authConfig={authConfig} config={config} orm={orm}>
      <BrowserRouter>{children}</BrowserRouter>
    </Root>
  </>
);
