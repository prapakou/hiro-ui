import { useCallback } from "react";
import { get } from "lodash-es";
import { HIRO_NAMESPACE } from "../constants";
import { ERROR_NAMESPACE, IErrorMessage } from "./constants";
import { useMappedState, useDispatch } from "redux-react-hook";
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
    (error: IErrorMessage) => dispatch(errorSet(error)),
    []
  );
  const clearError = useCallback(() => dispatch(errorClear()), []);

  return { setError, clearError };
};
