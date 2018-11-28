import { useCallback } from "react";
import { BehaviorSubject } from "rxjs";

import { createStateGetter } from "../helpers";

import { errorStore } from "./errors";

export type ThemeColours =
  | "primaryColor"
  | "secondaryColor"
  | "primaryText"
  | "secondaryText"
  | "lightPrimaryColor"
  | "lightSecondaryColor"
  | "pageBackground"
  | "red"
  | "orange"
  | "yellow"
  | "olive"
  | "green"
  | "teal"
  | "blue"
  | "violet"
  | "purple"
  | "pink"
  | "brown"
  | "grey"
  | "black"
  | "subtleTransparentBlack"
  | "transparentBlack"
  | "strongTransparentBlack"
  | "veryStrongTransparentBlack"
  | "subtleTransparentWhite"
  | "transparentWhite"
  | "strongTransparentWhite"
  | "veryStrongTransparentWhite";

interface IThemeState {
  colours: { [key in ThemeColours]: string } | {};
}

export type ThemeVersions = string | "latest";
export type ThemeNames = "portal" | "saas" | "default";

/*
 * ThemeStore -->
 */

const theme$ = new BehaviorSubject<IThemeState>({ colours: {} });

const loadTheme = (
  theme: ThemeNames = "default",
  themeVersion: ThemeVersions = "latest"
) => {
  console.log(theme, themeVersion);
  fetch(
    `https://dtlv35ikt30on.cloudfront.net/${themeVersion}/${theme}/colours.json`
  )
    .then(res => res.json())
    .then(colours => {
      theme$.next({ colours });
    })
    .catch(errorStore.actions.setError);
};

const useTheme = createStateGetter<IThemeState>(theme$);

export const themeStore = {
  actions: { loadTheme },
  getters: {
    useColour: () => {
      const theme = useTheme();
      return useCallback((colour: ThemeColours) => theme.colours[colour], [
        theme
      ]);
    }
  }
};
