import React, { useEffect, useState, useCallback } from "react";
import HiroGraphOrm from "@hiro-graph/orm";
import HiroGraphMappings, {
  AuthAccountVertex,
  AuthAccountProfileVertex
} from "@hiro-graph/orm-mappings";

import { HiroGraphContext, Orm, AuthMe } from "../contexts";
import { useErrorDispatch } from "../stores";

const safeMappings = HiroGraphMappings.filter(
  m => m.name !== "AutomationVariable"
);

export interface HiroGraphConfig {
  token: string;
  endpoint: string;
}

export interface FetchError {
  name: string;
  message: string;
  code: number;
}

export const HiroGraph = ({
  config,
  children
}: {
  config: HiroGraphConfig;
  children: any;
}) => {
  const [orm, setOrm] = useState<Orm>();
  const [me, setMe] = useState<AuthMe>();
  const { setError } = useErrorDispatch();

  const getMe = useCallback(
    () =>
      orm &&
      Promise.all([
        orm
          .getClient()
          .api.meAccount()
          .then(account => orm.insertRaw<AuthAccountVertex>(account)),
        orm
          .getClient()
          .api.getMeProfile()
          .then(account => orm.insertRaw<AuthAccountProfileVertex>(account))
      ])
        .then(([account, profile]) => ({ account, profile }))
        .then(newMe => void setMe(newMe))
        .catch(({ code }: FetchError) => {
          setError({
            name: "Graph Error",
            code,
            message: `Failed to get user profile data.${
              code === 401 ? " Please try logging in again." : ""
            }`
          });
        }),
    [orm, setError]
  );

  useEffect(() => {
    if (config.token) {
      setOrm(new HiroGraphOrm(config, safeMappings) as Orm);
    }
  }, [config]);

  useEffect(() => {
    getMe();

    const i = setInterval(() => {
      getMe();
    }, 30000);

    return () => clearInterval(i);
  }, [getMe]);

  const value = {
    token: config.token,
    orm,
    me
  };

  return (
    <HiroGraphContext.Provider value={value}>
      {children}
    </HiroGraphContext.Provider>
  );
};
