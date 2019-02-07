import { useCallback } from "react";
import { BehaviorSubject } from "rxjs";
import { ajax } from "rxjs/ajax";
import { distinctUntilChanged, filter, switchMap } from "rxjs/operators";

import { createObserver } from "../helpers";

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

type ColourListType = { [key in ThemeColours]: string } | undefined;

interface IThemeRequest {
  theme?: ThemeNames;
  themeVersion?: ThemeVersions;
}

export type ThemeVersions = string | "latest";
export type ThemeNames = "portal" | "saas" | "default";

/*
 * ThemeStore -->
 */

// Behaviours
const theme$ = new BehaviorSubject<ColourListType>(undefined);
const themeRequest$ = new BehaviorSubject<IThemeRequest>({});

// Subscriptions
themeRequest$
  .pipe(
    filter(r => !!r.themeVersion && !!r.theme),
    distinctUntilChanged(
      (a, b) => a.theme === b.theme && a.themeVersion === b.themeVersion
    ),
    switchMap(r =>
      ajax.getJSON<ColourListType>(
        `https://dtlv35ikt30on.cloudfront.net/${r.themeVersion}/${
          r.theme
        }/colours.json`
      )
    )
  )
  .subscribe(theme$);

const loadTheme = (
  theme: ThemeNames = "default",
  themeVersion: ThemeVersions = "latest"
) => themeRequest$.next({ theme, themeVersion });

const useTheme = createObserver<ColourListType>(theme$, undefined);

export const themeStore = {
  actions: { loadTheme },
  getters: {
    useColour: () => {
      const theme = useTheme();

      return useCallback((colour: ThemeColours) => theme && theme[colour], [
        theme
      ]);
    }
  }
};
