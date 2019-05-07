import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { SdkConfig, initSdk } from "@hiro-ui/sdk";
import { Reducer } from "typesafe-actions";
import { Saga } from "redux-saga";

import { init } from "../stores";
import { HiroAppRoot, HiroGraphConfig } from "../components";

interface HiroAppParams {
  config?: SdkConfig;
  reducers?: { [index: string]: Reducer<any, any> };
  sagas?: Saga[];
}

const getConfigFromEnv = () => {
  const graphUrl = process.env.REACT_APP_GRAPH_URL;
  const authUrl =
    process.env.REACT_APP_AUTH_URL || `${graphUrl}/api/6/auth/ui/`;
  const redirectUrl =
    process.env.REACT_APP_REDIRECT_URL || `${graphUrl}/api/6/auth/ui-redirect`;
  const clientId = process.env.REACT_APP_CLIENT_ID;

  const config = {
    graphUrl,
    authUrl,
    clientId,
    redirectUrl
  };

  if (Object.values(config).every(Boolean)) {
    return config;
  }

  return undefined;
};

export class HiroApp {
  config?: SdkConfig;

  reducers?: { [index: string]: Reducer<any, any> };

  sagas?: Saga[];

  constructor({ config, reducers, sagas }: HiroAppParams = {}) {
    this.config = config;
    this.reducers = reducers;
    this.sagas = sagas;

    if (!config) {
      this.config = getConfigFromEnv();
    }
  }

  render = async (children: ReactNode, target: HTMLElement | null) => {
    const { ready, state, token, graphUrl } = await initSdk(this.config);
    const store = init(state, this.reducers, this.sagas);

    let authConfig: HiroGraphConfig | undefined;

    if (token && graphUrl) {
      authConfig = {
        endpoint: graphUrl,
        token
      };
    }

    ReactDOM.render(
      <HiroAppRoot store={store} auth={authConfig}>
        {children}
      </HiroAppRoot>,
      target,
      ready
    );
  };
}
