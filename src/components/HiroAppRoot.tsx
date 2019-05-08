import React from "react";
import { Store } from "redux";
import { BrowserRouter } from "react-router-dom";
import { StoreContext } from "redux-react-hook";

import { Orm } from "../contexts";

import { ErrorBar } from "./ErrorBar";
import { HiroGraph } from "./HiroGraph";

interface HiroAppRootProps {
  store: Store;
  orm?: Orm;
  children?: any;
}

export const HiroAppRoot: React.FC<HiroAppRootProps> = ({
  orm,
  children,
  store
}) => (
  <BrowserRouter>
    <StoreContext.Provider value={store}>
      {orm ? <HiroGraph orm={orm}>{children}</HiroGraph> : children}
      <ErrorBar />
    </StoreContext.Provider>
  </BrowserRouter>
);
