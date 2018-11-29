import { BehaviorSubject } from "rxjs";

import { Auth } from "../auth";

import { createStateGetter } from "../helpers";

interface IAuthState {
  token?: string;
  orm?: any;
  me?: any;
  updated?: Date;
}

const auth$ = new BehaviorSubject<IAuthState>({});
let auth;

const ensureLogin = async (authConfig, config, orm) => {
  if (orm && config) {
    orm.person().then(me =>
      auth$.next({
        me,
        orm,
        token: config.token,
        updated: new Date()
      })
    );

    return;
  }

  if (!authConfig) {
    return "Config required to check login";
  }

  if (!auth) {
    auth = new Auth(authConfig);
  }

  return auth.isLoggedIn().then(async res => {
    await auth$.next(res);

    if (res.ok) {
      return;
    }

    if (!auth) {
      auth = new Auth(authConfig);
    }

    const res2 = await auth.login();

    if (res2.ok) {
      window.location.reload();
    } else {
      return "Failed to login!";
    }
  });
};

export const authStore = {
  actions: {
    ensureLogin
  },
  getters: {
    getToken: () => auth$.getValue().token,
    useAuth: createStateGetter<IAuthState>(auth$)
  }
};
