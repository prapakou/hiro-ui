import React, { useEffect, useState } from "react";

import { ThemeNames, themeStore, ThemeVersions } from "../stores";

export interface IThemeOptions {
  theme?: ThemeNames;
  themeVersion?: ThemeVersions;
}

interface IUIComponents {
  Accordion?: true | IThemeOptions;
  Ad?: true | IThemeOptions;
  Breadcrumb?: true | IThemeOptions;
  Button?: true | IThemeOptions;
  Card?: true | IThemeOptions;
  Checkbox?: true | IThemeOptions;
  Comment?: true | IThemeOptions;
  Container?: true | IThemeOptions;
  Dimmer?: true | IThemeOptions;
  Divider?: true | IThemeOptions;
  Dropdown?: true | IThemeOptions;
  Embed?: true | IThemeOptions;
  Feed?: true | IThemeOptions;
  Flag?: true | IThemeOptions;
  Form?: true | IThemeOptions;
  Grid?: true | IThemeOptions;
  Header?: true | IThemeOptions;
  Icon?: true | IThemeOptions;
  Image?: true | IThemeOptions;
  Input?: true | IThemeOptions;
  Item?: true | IThemeOptions;
  Label?: true | IThemeOptions;
  List?: true | IThemeOptions;
  Loader?: true | IThemeOptions;
  Menu?: true | IThemeOptions;
  Message?: true | IThemeOptions;
  Modal?: true | IThemeOptions;
  Nag?: true | IThemeOptions;
  Placeholder?: true | IThemeOptions;
  Popup?: true | IThemeOptions;
  Progress?: true | IThemeOptions;
  Rail?: true | IThemeOptions;
  Rating?: true | IThemeOptions;
  Reset?: true | IThemeOptions;
  Reveal?: true | IThemeOptions;
  Search?: true | IThemeOptions;
  Segment?: true | IThemeOptions;
  Shape?: true | IThemeOptions;
  Sidebar?: true | IThemeOptions;
  Site?: true | IThemeOptions;
  Statistic?: true | IThemeOptions;
  Step?: true | IThemeOptions;
  Sticky?: true | IThemeOptions;
  Tab?: true | IThemeOptions;
  Table?: true | IThemeOptions;
  Transition?: true | IThemeOptions;
}

type LoadedStyles = { [k in keyof IUIComponents]?: boolean };

type HiroStyleProps = IThemeOptions & IUIComponents & { onLoad: () => void };

export const HiroStyle = (props: HiroStyleProps) => {
  const {
    onLoad,
    theme = "default",
    themeVersion = "latest",
    ...styles
  } = props;

  useEffect(() => themeStore.actions.loadTheme(theme, themeVersion), []);

  // Load all if no styles set
  if (Object.keys(styles).length === 0) {
    return (
      <link
        rel="stylesheet"
        href={`https://dtlv35ikt30on.cloudfront.net/${themeVersion}/${theme}/semantic.min.css`}
        onLoad={onLoad}
      />
    );
  }

  // Include defaults unless specifically disabled
  if (props.Reset === undefined) {
    styles.Reset = true;
  }
  if (!props.Site === undefined) {
    styles.Site = true;
  }
  if (!props.Container === undefined) {
    styles.Container = true;
  }

  const activeStyles = Object.keys(styles)
    .filter(k => Boolean(styles[k]))
    .reduce((prev: object, k: string) => ({ ...prev, [k]: styles[k] }), {});

  useEffect(() => {
    // Print themes
    console.groupCollapsed("Themes");
    Object.entries(activeStyles).map(([k, v]: [string, IThemeOptions]) =>
      console.log(`Loading theme ${v.theme || theme} for ${k}`)
    );
    console.groupEnd();
  }, []);

  const [loaded, setLoaded] = useState<LoadedStyles>({});

  useEffect(() => {
    if (Object.keys(activeStyles).filter(k => !loaded[k]).length === 0) {
      onLoad();
    }
  }, [loaded]);

  return (
    <>
      {Object.entries(activeStyles).map(([k, v]: [string, IThemeOptions]) => (
        <link
          key={k}
          rel="stylesheet"
          href={`https://dtlv35ikt30on.cloudfront.net/${v.themeVersion ||
            themeVersion}/${v.theme ||
            theme}/components/${k.toLowerCase()}.min.css`}
          onLoad={() => setLoaded({ ...loaded, [k]: true })}
        />
      ))}
    </>
  );
};
