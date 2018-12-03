import React, { useCallback, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);
  const { me, token } = authStore.getters.useAuth();
  const error = errorStore.getters.useError();

  const setReady = useCallback(() => {
    if (ready) {
      ready();
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    themeStore.actions.loadTheme(theme, themeVersion);
    authStore.actions.ensureLogin(authConfig, config, orm);

    const i = setInterval(() => {
      authStore.actions.ensureLogin(authConfig, config, orm);
    }, 30000);

    return () => clearInterval(i);
  }, []);

  let body = <Loader active size="huge" content="Logging in..." />;

  if (me && token && !loading) {
    body = (
      <>
        <BrowserRouter>{children}</BrowserRouter>
        {error && <ErrorBar error={error} />}
      </>
    );
  }

  return (
    <>
      <link
        rel="stylesheet"
        href={`https://dtlv35ikt30on.cloudfront.net/${themeVersion ||
          "latest"}/${theme || "default"}/semantic.min.css`}
        onLoad={setReady}
      />

      {body}
    </>
  );
};
