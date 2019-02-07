import { AuthAccountVertex } from "@hiro-graph/orm-mappings";
import { BehaviorSubject, Subject } from "rxjs";
import { catchError, filter, switchMap, throttleTime } from "rxjs/operators";

import { Auth } from "../auth";
import { createObserver } from "../helpers";
import { Orm } from "../typings";

import { errorStore } from "./errors";

// Types
interface IAuthState {
  token?: string;
  orm?: Orm;
  me?: AuthAccountVertex;
  updated?: Date;
}

interface IAuthCheck {
  authConfig?: any;
  config?: any;
  orm?: any;
}

type AuthKeys = "authConfig" | "config" | "orm";

// Helpers
const getOrSet = (key: AuthKeys, value: any) => {
  if (store.has(key) && !value) {
    return store.get(key);
  }

  store.set(key, value);
  return value;
};

// Stores
const store = new Map<AuthKeys, any>();
const authCheck$ = new Subject<IAuthCheck>();
const auth$ = new BehaviorSubject<IAuthState>({});

let auth;

class LoginError extends Error {
  constructor(...params) {
    super(...params);
    this.name = "LoginError";
  }
}

// Subscriptions
authCheck$
  .pipe(
    filter(v => !!v.authConfig || (!!v.config && !!v.orm)),
    throttleTime(2000),
    switchMap(async v => {
      if (v.orm && v.config) {
        const me = await v.orm.person();
        return { me, orm: v.orm, token: v.config.token, updated: new Date() };
      }

      if (!auth) {
        auth = new Auth(v.authConfig);
      }

      const res = await auth.isLoggedIn();

      if (res.ok) {
        return res;
      }

      const res2 = await auth.login();
      if (res2.ok) {
        window.location.reload();
        return res2;
      } else {
        throw new LoginError("Failed to login!");
      }
    }),
    catchError(err => {
      errorStore.actions.setError(err);
      return [{}];
    })
  )
  .subscribe(auth$);

const ensureLogin = (newAuthConfig?, newConfig?, newOrm?) => {
  const orm = getOrSet("orm", newOrm);
  const config = getOrSet("config", newConfig);
  const authConfig = getOrSet("authConfig", newAuthConfig);

  authCheck$.next({ orm, config, authConfig });
};

export const authStore = {
  actions: {
    ensureLogin
  },
  getters: {
    getToken: () => {
      return new Promise<string>((resolve, reject) => {
        ensureLogin();
        auth$.subscribe({
          error: reject,
          next: v => resolve(v.token)
        });
      });
    },
    useAuth: createObserver<IAuthState>(auth$, {})
  }
};
