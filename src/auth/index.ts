import { Popup } from "hiro-graph-implicit-oauth";
import HiroGraphOrm from "hiro-graph-orm";
import mappings from "hiro-graph-orm-mappings";

export interface IAuthConfig {
  api: string;
  url: string;
  clientId: string;
}

interface IToken {
  accessToken: string;
  meta: any;
}

interface ILoginResult {
  ok: boolean;
  token: string;
  me?: void | any;
  orm?: any;
  updated: Date;
}
type AuthCallback = (err: Error, token: any) => void;

const doAuth = (f: (callback: AuthCallback) => void): Promise<ILoginResult> => {
  return new Promise(resolve => {
    f(async (err, token: IToken) => {
      // @ts-ignore
      let me: void | any;
      let orm: void | HiroGraphOrm;

      const accessToken = (token || {}).accessToken;

      if (err) {
        console.error(err);
      } else if (!!accessToken) {
        orm = new HiroGraphOrm(
          {
            endpoint: "https://stagegraph.arago.co/",
            token: accessToken
          },
          mappings
        );

        me = await orm.person().catch(console.error);
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

  constructor(config: IAuthConfig) {
    const { check, request } = Popup(config);
    this.check = check;
    this.request = request;
  }

  isLoggedIn = () => {
    return doAuth(this.check);
  };

  login = () => {
    return doAuth(this.request);
  };
}
