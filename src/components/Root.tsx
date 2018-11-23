import React, { useEffect } from "react";
import { Loader } from "semantic-ui-react";

import { AuthStore, ThemeStore } from "../stores";

import subscribe from "../subscribe";

interface IHiroLogin {
  children: any;
  authStore: AuthStore;
  themeStore: ThemeStore;
}

export const Root = subscribe({
  authStore: AuthStore,
  themeStore: ThemeStore
})(({ authStore, themeStore, children }: IHiroLogin) => {
  useEffect(
    () => {
      authStore.ensureLogin();
    },
    [children]
  );

  useEffect(() => {
    themeStore.load();
  }, []);

  if (!authStore.state.me || !authStore.state.token) {
    return <Loader active size="huge" content="Logging in..." />;
  }

  return <>{children}</>;
});
