import React from "react";
import { Store } from "redux";
import { BrowserRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { StoreContext } from "redux-react-hook";

import { ErrorBar } from "./ErrorBar";
import { HiroAuth, HiroAuthConfig } from "./HiroAuth";

interface HiroAppRootProps {
  auth?: HiroAuthConfig;
  children?: any;
  className?: string;
  fluid?: boolean;
  ready?: () => void;
  store?: Store;
}

export const HiroAppRoot: React.FC<HiroAppRootProps> = ({
  auth,
  children,
  className,
  fluid,
  store
}) => (
  <BrowserRouter>
    <StoreContext.Provider value={store}>
      <Container fluid={fluid} className={className}>
        {auth ? <HiroAuth config={auth}>{children}</HiroAuth> : children}
        <ErrorBar />
      </Container>
    </StoreContext.Provider>
  </BrowserRouter>
);
