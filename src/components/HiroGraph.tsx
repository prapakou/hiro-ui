import React, { useEffect, useState, useCallback } from "react";
import HiroGraphOrm from "@hiro-graph/orm";
import HiroGraphMappings, {
  AuthAccountVertex,
  AuthAccountProfileVertex
} from "@hiro-graph/orm-mappings";

import { useTokenDispatch, useToken } from "../stores";
import { HiroGraphContext, Orm, AuthMe } from "../contexts";

const safeMappings = HiroGraphMappings.filter(
  m => m.name !== "AutomationVariable"
);

export interface HiroGraphConfig {
  token: string;
  endpoint: string;
}

export const HiroGraph = ({
  config,
  children
}: {
  config: HiroGraphConfig;
  children: any;
}) => {
  const { setToken } = useTokenDispatch();
  const currentToken = useToken();
  const [orm, setOrm] = useState<Orm>();
  const [me, setMe] = useState<AuthMe>();

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
        .catch(err => void console.error("Orm error", err)),
    [orm]
  );

  useEffect(() => {
    if (config.token) {
      setToken(config.token);
      setOrm(new HiroGraphOrm(config, safeMappings) as Orm);
    }
  }, [config, setToken]);

  useEffect(() => {
    getMe();

    const i = setInterval(() => {
      getMe();
    }, 30000);

    return () => clearInterval(i);
  }, [getMe]);

  const value = {
    token: currentToken,
    orm,
    me
  };

  return (
    <HiroGraphContext.Provider value={value}>
      {children}
    </HiroGraphContext.Provider>
  );
};
