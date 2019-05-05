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
  store?: Store;
}

export const HiroAppRoot: React.FC<HiroAppRootProps> = ({
  auth,
  children,
  store
}) => (
  <BrowserRouter>
    <StoreContext.Provider value={store}>
      {auth ? <HiroGraph config={auth}>{children}</HiroGraph> : children}
      <ErrorBar />
    </StoreContext.Provider>
  </BrowserRouter>
);
