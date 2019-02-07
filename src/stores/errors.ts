import { BehaviorSubject } from "rxjs";

import { createObserver } from "../helpers";

type ErrorState = Error | undefined;

const error$ = new BehaviorSubject<ErrorState>(undefined);

export const errorStore = {
  actions: {
    clearError: () => error$.next(undefined),
    setError: (e: Error) => error$.next(e)
  },
  getters: {
    useError: createObserver<ErrorState>(error$, undefined)
  }
};
