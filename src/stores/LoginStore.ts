import { Container } from "unstated";

import { Auth } from "../auth";

export interface ILoginStore {
  token?: string;
  orm?: any;
  me?: any;
}

export class LoginStore extends Container<ILoginStore> {
  auth?: Auth;
  constructor() {
    super();
    this.state = { token: "test1" };
  }

  setToken(token: string) {
    console.log("setting token to", token);
    return this.setState({ token });
  }

  getToken() {
    return this.state.token;
  }

  ensureLogin(authConfig, config, orm) {
    if (orm && config) {
      orm.person().then(me => this.setState({ orm, me, token: config.token }));
      return;
    }

    if (!authConfig) {
      console.warn("Config required to check login");
      return;
    }

    if (!this.auth) {
      this.auth = new Auth(authConfig);
    }

    this.auth.isLoggedIn().then(async res => {
      this.setState(res);

      if (res.ok) {
        return;
      }

      if (!this.auth) {
        this.auth = new Auth(authConfig);
      }

      const res2 = await this.auth.login();

      if (res2.ok) {
        window.location.reload();
      } else {
        console.error("Failed to login!");
      }
    });
  }
}
