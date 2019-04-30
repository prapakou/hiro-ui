import React, { useCallback, useState, useEffect } from "react";
import { Store } from "redux";
import { BrowserRouter } from "react-router-dom";
import { Container, Loader } from "semantic-ui-react";

import { ErrorBar } from "./ErrorBar";
import { HiroStyle, IThemeOptions } from "./HiroStyle";
import { StoreContext } from "redux-react-hook";
import { init } from "../stores";

type HiroAppProps = {
  ready?: () => void;
  config?: any;
  children?: any;
  fluid?: boolean;
  store?: Store;
} & IThemeOptions;

export const HiroApp = ({
  children,
  ready,
  theme,
  themeVersion,
  fluid,
  store
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
  }, []);

  const content = loading ? (
    <Loader active size="huge" content="Logging in..." />
  ) : (
    children
  );

  return (
    <StoreContext.Provider value={rootStore}>
      <BrowserRouter>
        <Container fluid={fluid}>
          <HiroStyle
            theme={theme}
            themeVersion={themeVersion}
            onLoad={setReady}
          />
          {content}
          <ErrorBar />
        </Container>
      </BrowserRouter>
    </StoreContext.Provider>
  );
};
