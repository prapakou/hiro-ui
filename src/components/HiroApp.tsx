import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "unstated";

import { IAuthConfig } from "../auth";

import { Root } from "./Root";

interface IHiroAppProps {
  theme?: "portal" | "saas" | "default";
  themeVersion?: string;
  ready?: () => void;
  orm?: any;
  authConfig?: IAuthConfig;
  config?: any;
  login?: boolean;
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
  <Provider>
    <link
      rel="stylesheet"
      href={`https://dtlv35ikt30on.cloudfront.net/${themeVersion}/${theme}/semantic.min.css`}
      onLoad={() => ready && ready()}
    />
    <Root
      authConfig={authConfig}
      config={config}
      orm={orm}
      theme={theme}
      themeVersion={themeVersion}
    >
      <BrowserRouter>{children}</BrowserRouter>
    </Root>
  </Provider>
);
