import React, { useEffect } from "react";
import { Loader } from "semantic-ui-react";

import { LoginStore } from "../stores/LoginStore";
import { ThemeNames, ThemeStore } from "../stores/ThemeStore";
import subscribe from "../subscribe";

interface IHiroLogin {
  children: any;
  loginStore: LoginStore;
  themeStore: ThemeStore;
  authConfig?: any;
  config?: any;
  orm?: any;
  theme?: ThemeNames;
  themeVersion?: string;
}

export const Root = subscribe({
  loginStore: LoginStore,
  themeStore: ThemeStore
})(
  ({
    authConfig,
    config,
    loginStore,
    orm,
    theme,
    themeStore,
    themeVersion,
    children
  }: IHiroLogin) => {
    useEffect(
      () => {
        loginStore.ensureLogin(authConfig, config, orm);
      },
      [children]
    );

    useEffect(
      () => {
        themeStore.load(theme, themeVersion);
      },
      [theme, themeVersion]
    );

    if (!loginStore.state.me || !loginStore.state.token) {
      return <Loader active size="huge" content="Logging in..." />;
    }

    return <>{children}</>;
  }
);
