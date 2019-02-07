import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Container, Loader } from "semantic-ui-react";

import { IAuthConfig } from "../auth";
import { authStore, errorStore } from "../stores";

import { ErrorBar } from "./ErrorBar";
import { HiroStyle, IThemeOptions } from "./HiroStyle";

type HiroAppProps = {
  ready?: () => void;
  orm?: any;
  authConfig?: IAuthConfig;
  config?: any;
  children: any;
} & IThemeOptions;

export const HiroApp = ({
  children,
  ready,
  authConfig,
  config,
  orm,
  theme,
  themeVersion
}: HiroAppProps) => {
  const [loading, setLoading] = useState(true);
  const error = errorStore.getters.useError();
  const hasAuth = !!authConfig || (!!config && !!orm);

  const setReady = useCallback(() => {
    if (ready) {
      ready();
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (hasAuth) {
      authStore.actions.ensureLogin(authConfig, config, orm);

      const i = setInterval(() => {
        authStore.actions.ensureLogin(authConfig, config, orm);
      }, 30000);

      if (!theme) {
        setReady();
      }

      return () => clearInterval(i);
    }

    if (!theme) {
      setReady();
    }
  }, []);

  return (
    <BrowserRouter>
      <Container fluid>
        {theme && (
          <HiroStyle
            theme={theme}
            themeVersion={themeVersion}
            onLoad={setReady}
          />
        )}
        {loading ? (
          <Loader active size="huge" content="Logging in..." />
        ) : (
          children
        )}
        {error && <ErrorBar error={error} />}
      </Container>
    </BrowserRouter>
  );
};
