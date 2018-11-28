import { BehaviorSubject } from "rxjs";

import { createStateGetter } from "../helpers";

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
    useError: createStateGetter<ErrorState>(error$)
  }
};
