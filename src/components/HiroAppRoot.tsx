import React from "react";
import { Store } from "redux";
import { BrowserRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { StoreContext } from "redux-react-hook";

import { ErrorBar } from "./ErrorBar";
import { HiroGraph, HiroGraphConfig } from "./HiroGraph";

interface HiroAppRootProps {
  auth?: HiroGraphConfig;
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
        {auth ? <HiroGraph config={auth}>{children}</HiroGraph> : children}
        <ErrorBar />
      </Container>
    </StoreContext.Provider>
  </BrowserRouter>
);
