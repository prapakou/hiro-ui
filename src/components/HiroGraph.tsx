import React, { useEffect, useState, useCallback } from "react";
import HiroGraphOrm from "@hiro-graph/orm";
import HiroGraphMappings, {
  AuthAccountVertex,
  AuthAccountProfileVertex
} from "@hiro-graph/orm-mappings";

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
        .catch(() => {
          if (process.env && process.env.NODE_ENV === "development") {
            if (!window.sessionStorage.getItem("access_token")) {
              return;
            }

            window.sessionStorage.removeItem("access_token");
            window.location.reload();
          }
        }),
    [orm]
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
