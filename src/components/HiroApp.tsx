import React, { useCallback, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Container, Loader } from "semantic-ui-react";

import { errorStore } from "../stores";

import { ErrorBar } from "./ErrorBar";
import { HiroStyle, IThemeOptions } from "./HiroStyle";

type HiroAppProps = {
  ready?: () => void;
  config?: any;
  children?: any;
  fluid?: boolean;
} & IThemeOptions;

export const HiroApp = ({
  children,
  ready,
  theme,
  themeVersion,
  fluid
}: HiroAppProps) => {
  const [loading, setLoading] = useState(true);
  const error = errorStore.getters.useError();

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
    <BrowserRouter>
      <Container fluid={fluid}>
        <HiroStyle
          theme={theme}
          themeVersion={themeVersion}
          onLoad={setReady}
        />
        {content}
        {error && <ErrorBar error={error} />}
      </Container>
    </BrowserRouter>
  );
};
