import { useCallback } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import { get } from "lodash-es";

import { HIRO_NAMESPACE } from "../constants";
import {
  THEME_NAMESPACE,
  ThemeColours,
  IThemeRequest,
  ThemeStateType
} from "./constants";
import { themeRequest } from "./actions";

export const useColours = () => {
  const mapState = useCallback(
    state => get(state, [HIRO_NAMESPACE, THEME_NAMESPACE]),
    []
  );

  const { colours } = useMappedState(mapState);

  return useCallback((colour: ThemeColours) => colours && colours[colour], [
    colours
  ]);
};

export const useThemeState = () => {
  const mapState = useCallback(
    state => get(state, [HIRO_NAMESPACE, THEME_NAMESPACE]),
    []
  );

  return useMappedState(mapState) as ThemeStateType;
};

export const useThemeDispatch = () => {
  const dispatch = useDispatch();

  const loadTheme = useCallback(
    (theme: IThemeRequest) => dispatch(themeRequest(theme)),
    []
  );

  return { loadTheme };
};
