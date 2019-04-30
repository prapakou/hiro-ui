import React, { useEffect, useState } from "react";
import HiroGraphOrm from "@hiro-graph/orm";
import HiroGraphMappings from "@hiro-graph/orm-mappings";

import { useTokenDispatch, useToken } from "../stores/auth/hooks";
import { AuthContext, Orm } from "../contexts";

export interface IHiroAuthConfig {
  token: string;
  endpoint: string;
}

const safeMappings = HiroGraphMappings.filter(
  m => m.name !== "AutomationVariable"
);

export const HiroAuth = ({
  config,
  children
}: {
  config: IHiroAuthConfig;
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
  }, [config]);

  const value = {
    token: currentToken,
    orm
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
