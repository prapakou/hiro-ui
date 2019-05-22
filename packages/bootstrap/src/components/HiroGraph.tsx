import React, { useEffect, useState, useCallback } from "react";
import { AuthAccountVertex } from "@hiro-graph/orm-mappings";

import { HiroGraphContext, Orm } from "../contexts";

export interface HiroGraphConfig {
  token: string;
  endpoint: string;
}

const ME_POLL = 30_000;

export const HiroGraph = ({ orm, children }: { orm: Orm; children: any }) => {
  const [me, setMe] = useState<AuthAccountVertex>();
  const getMe = useCallback(
    () =>
      orm &&
      orm
        .me()
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
    }, ME_POLL);

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
