import { Container } from "unstated";

import { Auth } from "../auth";

export interface IAuthStore {
  token?: string;
  orm?: any;
  me?: any;
  updated?: Date;
}

export class AuthStore extends Container<IAuthStore> {
  auth?: Auth;
  state: IAuthStore = {};
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

  async ensureLogin() {
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
      return "Config required to check login";
    }

    if (!this.auth) {
      this.auth = new Auth(this.authConfig);
    }

    return this.auth.isLoggedIn().then(async res => {
      await this.setState(res);

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
        return "Failed to login!";
      }
    });
  }
}
