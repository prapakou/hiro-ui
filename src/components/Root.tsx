import React, { useCallback, useEffect, useRef, useState } from "react";
import { Loader, Message } from "semantic-ui-react";

import { authStore, errorStore, themeStore } from "../streams";

interface IHiroLogin {
  children: any;
  authConfig?: any;
  config?: any;
  orm?: any;
}

export const Root = ({ children, authConfig, config, orm }: IHiroLogin) => {
  const { me, token } = authStore.getters.useAuth();

  useEffect(() => {
    authStore.actions.ensureLogin(authConfig, config, orm);

    const i = setInterval(() => {
      authStore.actions.ensureLogin(authConfig, config, orm);
    }, 30000);

    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    themeStore.actions.loadThemes();
  }, []);

  const error = errorStore.getters.useError();

  if (!me || !token) {
    return <Loader active size="huge" content="Logging in..." />;
  }

  return (
    <>
      {children}
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
