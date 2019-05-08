import React, { useEffect, useState, useCallback } from "react";
import {
  AuthAccountVertex,
  AuthAccountProfileVertex
} from "@hiro-graph/orm-mappings";

import { HiroGraphContext, Orm, AuthMe } from "../contexts";

export interface HiroGraphConfig {
  token: string;
  endpoint: string;
}

export const HiroGraph = ({ orm, children }: { orm: Orm; children: any }) => {
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
    getMe();

    const i = setInterval(() => {
      getMe();
    }, 30000);

    return () => clearInterval(i);
  }, [getMe]);

  const value = {
    orm,
    me
  };

  return (
    <HiroGraphContext.Provider value={value}>
      {children}
    </HiroGraphContext.Provider>
  );
};
