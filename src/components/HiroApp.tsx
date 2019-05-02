import React, { useEffect } from "react";
import { Store } from "redux";
import { BrowserRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { StoreContext } from "redux-react-hook";

import { init } from "../stores";

import { ErrorBar } from "./ErrorBar";
import { HiroAuth, HiroAuthConfig } from "./HiroAuth";

interface HiroAppProps {
  auth?: HiroAuthConfig;
  children?: any;
  className?: string;
  fluid?: boolean;
  ready?: () => void;
  store?: Store;
}

export const HiroApp = ({
  auth,
  children,
  className,
  fluid,
  ready,
  store
}: HiroAppProps) => {
  let rootStore = store;

  if (!rootStore) {
    rootStore = init();
  }

  useEffect(() => {
    if (ready) {
      ready();
    }
  }, [ready]);

  return (
    <BrowserRouter>
      <StoreContext.Provider value={rootStore}>
        <Container fluid={fluid} className={className}>
          {auth ? <HiroAuth config={auth}>{children}</HiroAuth> : children}
          <ErrorBar />
        </Container>
      </StoreContext.Provider>
    </BrowserRouter>
  );
};
