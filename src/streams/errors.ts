import { BehaviorSubject } from "rxjs";

import { createSubscribedState } from "./_helpers";

type ErrorState = Error | undefined;

const error$ = new BehaviorSubject<ErrorState>(undefined);

const setError = (e: Error) => {
  error$.next(e);
};

export const errorStore = {
  actions: {
    setError
  },
  getters: {
    useError: createSubscribedState<ErrorState>(error$)
  }
};
