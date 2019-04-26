import React, { useEffect } from "react";

import { ThemeNames, themeStore, ThemeVersions } from "../stores";

export interface IThemeOptions {
  theme?: ThemeNames;
  themeVersion?: ThemeVersions;
}

type HiroStyleProps = IThemeOptions & { onLoad: () => void };

export const HiroStyle = (props: HiroStyleProps) => {
  const { onLoad, theme = "default", themeVersion = "latest" } = props;

  useEffect(() => themeStore.actions.loadTheme(theme, themeVersion), []);

  return (
    <link
      rel="stylesheet"
      href={`https://dtlv35ikt30on.cloudfront.net/${themeVersion}/${theme}/semantic.min.css`}
      onLoad={onLoad}
    />
  );
};
