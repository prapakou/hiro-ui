import { useCallback } from "react";
import { get } from "lodash-es";
import { useMappedState, useDispatch } from "redux-react-hook";

import { HIRO_NAMESPACE } from "../constants";

import { GRAPH_NAMESPACE, GraphStateType } from "./constants";
import { tokenSet, tokenClear } from "./actions";

export const useToken = () => {
  const mapState = useCallback(
    state => get(state, [HIRO_NAMESPACE, GRAPH_NAMESPACE]),
    []
  );

  const auth = useMappedState(mapState) as GraphStateType;

  return auth.token;
};

export const useTokenDispatch = () => {
  const dispatch = useDispatch();

  const setToken = useCallback(
    (token: string) => dispatch(tokenSet({ token })),
    [dispatch]
  );
  const clearToken = useCallback(() => dispatch(tokenClear()), [dispatch]);

  return { setToken, clearToken };
};
