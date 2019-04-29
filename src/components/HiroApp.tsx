import React, { useCallback, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Container, Loader } from "semantic-ui-react";

import { ErrorBar } from "./ErrorBar";
import { HiroStyle, IThemeOptions } from "./HiroStyle";
import { StoreContext } from "redux-react-hook";
import { useErrorDispatch, init } from "../stores";

const store = init();

type HiroAppProps = {
  ready?: () => void;
  config?: any;
  children?: any;
  fluid?: boolean;
} & IThemeOptions;

const Test = () => {
  const { setError } = useErrorDispatch();
  setError({ message: "Test error" });

  return null;
};

export const HiroApp = ({
  children,
  ready,
  theme,
  themeVersion,
  fluid
}: HiroAppProps) => {
  const [loading, setLoading] = useState(true);

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
    <StoreContext.Provider value={store}>
      <BrowserRouter>
        <Container fluid={fluid}>
          <Test />
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
