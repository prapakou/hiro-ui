import HiroGraphOrm, { GraphVertex } from "@hiro-graph/orm";
import mappings, { IAuthAccount } from "@hiro-graph/orm-mappings";
import { Popup } from "hiro-graph-implicit-oauth";

import { Orm } from "../typings";

export interface IAuthConfig {
  api: string;
  url: string;
  clientId: string;
}

type AuthCallback = (err: Error, token: any) => void;

interface IToken {
  accessToken: string;
  meta: any;
}

interface ILoginResult {
  ok: boolean;
  token: string;
  me?: void | GraphVertex<IAuthAccount>;
  orm?: void | Orm;
  updated: Date;
}

const doAuth = (
  f: (callback: AuthCallback) => void,
  config: IAuthConfig
): Promise<ILoginResult> => {
  return new Promise(resolve => {
    f(async (err, token: IToken) => {
      // @ts-ignore
      let me: void | GraphVertex<IAuthAccount>;
      let orm: void | Orm;

      const accessToken = (token || {}).accessToken;

      if (err) {
        console.error(err);
      } else if (!!accessToken) {
        orm = new HiroGraphOrm(
          {
            endpoint: config.api,
            token: accessToken
          },
          mappings
        ) as Orm;

        me = await orm.me<IAuthAccount>().catch(console.error);
      }

      return resolve({
        me,
        ok: !err && !!accessToken && !!me,
        orm,
        token: accessToken,
        updated: new Date()
      });
    });
  });
};

export class Auth {
  private check: any;
  private request: any;
  private config: IAuthConfig;

  constructor(config: IAuthConfig) {
    const { check, request } = Popup(config);
    this.check = check;
    this.request = request;
    this.config = config;
  }

  isLoggedIn = () => {
    return doAuth(this.check, this.config);
  };

  login = () => {
    return doAuth(this.request, this.config);
  };
}
