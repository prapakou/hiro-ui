import { BehaviorSubject } from "rxjs";

import { Auth } from "../auth";
import { createStateGetter } from "../helpers";

import { errorStore } from "./errors";

interface IAuthState {
  token?: string;
  orm?: any;
  me?: any;
  updated?: Date;
}

type AuthKeys = "authConfig" | "config" | "orm";

const store = new Map<AuthKeys, any>();
const auth$ = new BehaviorSubject<IAuthState>({});
let auth;

const getOrSet = (key: AuthKeys, value: any) => {
  if (store.has(key) && !value) {
    return store.get(key);
  }

  store.set(key, value);
  return value;
};

const ensureLogin = async (newAuthConfig?, newConfig?, newOrm?) => {
  const orm = getOrSet("orm", newOrm);
  const config = getOrSet("config", newConfig);
  const authConfig = getOrSet("authConfig", newAuthConfig);

  if (orm && config) {
    orm.person().then(me =>
      auth$.next({
        me,
        orm,
        token: config.token,
        updated: new Date()
      })
    );

    return true;
  }

  if (!authConfig) {
    errorStore.actions.setError(new Error("Config required to check login"));
    return false;
  }

  if (!auth) {
    auth = new Auth(authConfig);
  }

  return auth.isLoggedIn().then(async res => {
    await auth$.next(res);

    if (res.ok) {
      return true;
    }

    if (!auth) {
      auth = new Auth(authConfig);
    }

    const res2 = await auth.login();

    if (res2.ok) {
      window.location.reload();
    } else {
      errorStore.actions.setError(new Error("Failed to login!"));
      return false;
    }
  });
};

export const authStore = {
  actions: {
    ensureLogin
  },
  getters: {
    getToken: async () => {
      const ok = await ensureLogin();
      if (ok) {
        return auth$.getValue().token;
      }

      return;
    },
    useAuth: createStateGetter<IAuthState>(auth$)
  }
};
