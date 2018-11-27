import { BehaviorSubject } from "rxjs";

import { createSubscribedState } from "../helpers";

import { errorStore } from "./errors";

type ThemeColours =
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

/*
 * ThemeStore -->
 */

const theme$ = new BehaviorSubject<IThemeState>({ colours: {} });

const loadThemes = (theme = "latest", themeVersion = "default") => {
  fetch(
    `https://dtlv35ikt30on.cloudfront.net/${themeVersion}/${theme}/colours.json`
  )
    .then(res => res.json())
    .then(colours => {
      theme$.next({ colours });
    })
    .catch(errorStore.actions.setError);
};

export const themeStore = {
  actions: { loadThemes },
  getters: { useThemes: createSubscribedState<IThemeState>(theme$) }
};
