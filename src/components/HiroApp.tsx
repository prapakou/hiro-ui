import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Loader } from "semantic-ui-react";

import { IAuthConfig } from "../auth";
import {
  authStore,
  errorStore,
  ThemeNames,
  themeStore,
  ThemeVersions
} from "../stores";

import { ErrorBar } from "./ErrorBar";

interface IHiroAppProps {
  theme?: ThemeNames;
  themeVersion?: ThemeVersions;
  ready?: () => void;
  orm?: any;
  authConfig?: IAuthConfig;
  config?: any;
  children: any;
}

export const HiroApp = ({
  children,
  ready,
  theme,
  themeVersion,
  authConfig,
  config,
  orm
}: IHiroAppProps) => {
  const { me, token } = authStore.getters.useAuth();

  useEffect(() => {
    themeStore.actions.loadTheme(theme, themeVersion);
    authStore.actions.ensureLogin(authConfig, config, orm);

    const i = setInterval(() => {
      authStore.actions.ensureLogin(authConfig, config, orm);
    }, 30000);

    return () => clearInterval(i);
  }, []);

  const error = errorStore.getters.useError();

  if (!me || !token) {
    return <Loader active size="huge" content="Logging in..." />;
  }

  return (
    <>
      <link
        rel="stylesheet"
        href={`https://dtlv35ikt30on.cloudfront.net/${themeVersion ||
          "latest"}/${theme || "default"}/semantic.min.css`}
        onLoad={() => ready && ready()}
      />

      <BrowserRouter>{children}</BrowserRouter>
      {error && <ErrorBar error={error} />}
    </>
  );
};
