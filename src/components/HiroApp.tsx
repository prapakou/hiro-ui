import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Loader, Message } from "semantic-ui-react";

import { IAuthConfig } from "../auth";
import { authStore, errorStore, themeStore } from "../streams";

interface IHiroAppProps {
  theme?: "portal" | "saas" | "default";
  themeVersion?: string | "latest";
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
    themeStore.actions.loadThemes(theme, themeVersion);
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
        href={`https://dtlv35ikt30on.cloudfront.net/${themeVersion}/${theme}/semantic.min.css`}
        onLoad={() => ready && ready()}
      />

      <BrowserRouter>{children}</BrowserRouter>
      {error && (
        <Message
          header="Error"
          content={error.message}
          error
          style={{
            backgroundColor: "mistyrose",
            bottom: 0,
            left: 0,
            position: "fixed",
            right: 0
          }}
        />
      )}
    </>
  );
};
