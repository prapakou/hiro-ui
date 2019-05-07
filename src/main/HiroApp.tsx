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

export class HiroApp {
  config?: SdkConfig;

  reducers?: { [index: string]: Reducer<any, any> };

  sagas?: Saga[];

  constructor({ config, reducers, sagas }: HiroAppParams = {}) {
    this.config = config;
    this.reducers = reducers;
    this.sagas = sagas;
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
