import React, { useCallback, useState } from "react";
import { Store } from "redux";
import { BrowserRouter } from "react-router-dom";
import { Container, Loader } from "semantic-ui-react";

import { ErrorBar } from "./ErrorBar";
import { HiroStyle, IThemeOptions } from "./HiroStyle";
import { StoreContext } from "redux-react-hook";
import { init } from "../stores";
import { HiroAuth, IHiroAuthConfig } from "./HiroAuth";

type HiroAppProps = {
  ready?: () => void;
  children?: any;
  fluid?: boolean;
  store?: Store;
  auth?: IHiroAuthConfig;
} & IThemeOptions;

export const HiroApp = ({
  children,
  ready,
  theme,
  themeVersion,
  fluid,
  store,
  auth
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
    <Loader active size="huge" content="Loading..." />
  ) : (
    children
  );

  const main = (
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
  );

  return (
    <StoreContext.Provider value={rootStore}>
      {auth ? <HiroAuth config={auth}>{main}</HiroAuth> : main}
    </StoreContext.Provider>
  );
};
