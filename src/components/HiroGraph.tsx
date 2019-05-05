import React, { useEffect, useState } from "react";
import HiroGraphOrm from "@hiro-graph/orm";
import HiroGraphMappings from "@hiro-graph/orm-mappings";

import { useTokenDispatch, useToken } from "../stores/auth/hooks";
import { HiroGraphContext, Orm } from "../contexts";

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
    <HiroGraphContext.Provider value={value}>
      {children}
    </HiroGraphContext.Provider>
  );
};
