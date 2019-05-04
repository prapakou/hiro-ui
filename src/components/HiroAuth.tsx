import React, { useEffect, useState } from "react";
import HiroGraphOrm from "@hiro-graph/orm";
import HiroGraphMappings from "@hiro-graph/orm-mappings";

import { useTokenDispatch, useToken } from "../stores/auth/hooks";
import { HiroAuthContext, Orm } from "../contexts";

const safeMappings = HiroGraphMappings.filter(
  m => m.name !== "AutomationVariable"
);

export interface HiroAuthConfig {
  token: string;
  endpoint: string;
}

export const HiroAuth = ({
  config,
  children
}: {
  config: HiroAuthConfig;
  children: any;
}) => {
  const { setToken } = useTokenDispatch();
  const currentToken = useToken();
  const [orm, setOrm] = useState<Orm>();

  useEffect(() => {
    if (config.token) {
      setToken(config.token);
      setOrm(new HiroGraphOrm(config, safeMappings) as Orm);
    }
  }, [config, setToken]);

  const value = {
    token: currentToken,
    orm
  };

  return (
    <HiroAuthContext.Provider value={value}>
      {children}
    </HiroAuthContext.Provider>
  );
};
