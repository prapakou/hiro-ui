import { AUTH_NAMESPACE, AuthStateType } from "./constants";
import { useCallback } from "react";
import { get } from "lodash-es";
import { HIRO_NAMESPACE } from "../constants";
import { useMappedState, useDispatch } from "redux-react-hook";
import { tokenSet, tokenClear } from "./actions";

export const useToken = () => {
  const mapState = useCallback(
    state => get(state, [HIRO_NAMESPACE, AUTH_NAMESPACE]),
    []
  );

  const auth = useMappedState(mapState) as AuthStateType;

  return auth.token;
};

export const useTokenDispatch = () => {
  const dispatch = useDispatch();

  const setToken = useCallback(
    (token: string) => dispatch(tokenSet({ token })),
    []
  );
  const clearToken = useCallback(() => dispatch(tokenClear()), []);

  return { setToken, clearToken };
};
