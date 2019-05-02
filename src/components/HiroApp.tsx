import React, { useCallback, useState } from "react";
import { Store } from "redux";
import { BrowserRouter } from "react-router-dom";
import { Container, Loader } from "semantic-ui-react";
import { StoreContext } from "redux-react-hook";

import { init } from "../stores";

import { ErrorBar } from "./ErrorBar";
import { HiroStyle, ThemeOptions } from "./HiroStyle";
import { HiroAuth, HiroAuthConfig } from "./HiroAuth";

type HiroAppProps = {
  auth?: HiroAuthConfig;
  children?: any;
  className?: string;
  fluid?: boolean;
  ready?: () => void;
  store?: Store;
} & ThemeOptions;

export const HiroApp = ({
  auth,
  children,
  className,
  fluid,
  ready,
  store,
  theme,
  themeVersion
}: HiroAppProps) => {
  const [loading, setLoading] = useState(true);

  let rootStore = store;

  if (!rootStore) {
    rootStore = init();
  }

  const setReady = useCallback(() => {
    if (ready) {
      ready();
    }
    setLoading(false);
  }, [ready]);

  const content = loading ? (
    <Loader active size="huge" content="Loading..." />
  ) : (
    children
  );

  return (
    <BrowserRouter>
      <StoreContext.Provider value={rootStore}>
        <HiroStyle
          theme={theme}
          themeVersion={themeVersion}
          onLoad={setReady}
        />
        <Container fluid={fluid} className={className}>
          {auth ? <HiroAuth config={auth}>{content}</HiroAuth> : content}
          <ErrorBar />
        </Container>
      </StoreContext.Provider>
    </BrowserRouter>
  );
};
