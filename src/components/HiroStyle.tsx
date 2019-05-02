import React, { useEffect } from "react";

import { ThemeNames, ThemeVersions, useThemeDispatch } from "../stores";

export interface ThemeOptions {
  theme?: ThemeNames;
  themeVersion?: ThemeVersions;
}

type HiroStyleProps = ThemeOptions & { onLoad: () => void };

export const HiroStyle = (props: HiroStyleProps) => {
  const { onLoad, theme = "default", themeVersion = "latest" } = props;

  const { loadTheme } = useThemeDispatch();

  useEffect(() => void loadTheme({ theme, themeVersion }), [
    loadTheme,
    theme,
    themeVersion
  ]);

  return (
    <link
      rel="stylesheet"
      href={`https://dtlv35ikt30on.cloudfront.net/${themeVersion}/${theme}/semantic.min.css`}
      onLoad={onLoad}
    />
  );
};
