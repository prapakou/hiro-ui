import React, { useEffect } from "react";
import { Loader } from "semantic-ui-react";

import { LoginStore, ThemeStore } from "../stores";

import subscribe from "../subscribe";

interface IHiroLogin {
  children: any;
  loginStore: LoginStore;
  themeStore: ThemeStore;
}

export const Root = subscribe({
  loginStore: LoginStore,
  themeStore: ThemeStore
})(({ loginStore, themeStore, children }: IHiroLogin) => {
  useEffect(
    () => {
      loginStore.ensureLogin();
    },
    [children]
  );

  useEffect(() => {
    themeStore.load();
  }, []);

  if (!loginStore.state.me || !loginStore.state.token) {
    return <Loader active size="huge" content="Logging in..." />;
  }

  return <>{children}</>;
});
