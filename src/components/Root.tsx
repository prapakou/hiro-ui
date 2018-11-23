import React, { useCallback, useEffect, useRef, useState } from "react";
import { Loader, Message } from "semantic-ui-react";

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
  const isCheckingLogin = useRef(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const ensureLogin = useCallback(
    () =>
      // Don't check if we're already checking
      authStore.ensureLogin().then(e => {
        // Check to avoid un-needed re-render
        if (e) {
          setError(e);
        }
        isCheckingLogin.current = false;
      }),
    []
  );

  useEffect(() => {
    ensureLogin();

    const i = setInterval(() => {
      if (isCheckingLogin.current) {
        return;
      }

      ensureLogin();
    }, 30000);

    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    themeStore.load();
  }, []);

  if (!authStore.state.me || !authStore.state.token) {
    return <Loader active size="huge" content="Logging in..." />;
  }

  return (
    <>
      {children}
      {error && <Message content={error} error />}
    </>
  );
});
