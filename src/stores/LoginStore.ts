import { Container } from "unstated";

import { Auth } from "../auth";

export interface ILoginStore {
  token?: string;
  orm?: any;
  me?: any;
  updated?: Date;
}

export class LoginStore extends Container<ILoginStore> {
  auth?: Auth;
  state: ILoginStore = {};
  authConfig?: any;
  config?: any;
  orm?: any;
  constructor(authConfig, config, orm) {
    super();
    this.authConfig = authConfig;
    this.config = config;
    this.orm = orm;
  }

  getToken() {
    return this.state.token;
  }

  ensureLogin() {
    if (this.orm && this.config) {
      this.orm.person().then(me =>
        this.setState({
          me,
          orm: this.orm,
          token: this.config.token,
          updated: new Date()
        })
      );

      return;
    }

    if (!this.authConfig) {
      console.warn("Config required to check login");
      return;
    }

    if (!this.auth) {
      this.auth = new Auth(this.authConfig);
    }

    this.auth.isLoggedIn().then(async res => {
      this.setState(res);

      if (res.ok) {
        return;
      }

      if (!this.auth) {
        this.auth = new Auth(this.authConfig);
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
