import { useCallback } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";
import { get } from "lodash-es";

import { HIRO_NAMESPACE } from "../constants";

import { ERROR_NAMESPACE, ErrorMessage } from "./constants";
import { errorSet, errorClear } from "./actions";

export const useErrorState = () => {
  const mapState = useCallback(
    state => get(state, [HIRO_NAMESPACE, ERROR_NAMESPACE]),
    []
  );

  return useMappedState(mapState);
};

export const useErrorDispatch = () => {
  const dispatch = useDispatch();

  const setError = useCallback(
    (error: ErrorMessage) => dispatch(errorSet(error)),
    [dispatch]
  );
  const clearError = useCallback(() => dispatch(errorClear()), [dispatch]);

  return { setError, clearError };
};
