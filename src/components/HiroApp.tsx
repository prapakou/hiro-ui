import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { IAuthConfig } from "../auth";
import { HiroLoginContext, IThemeColour, ThemeContext } from "../contexts";

import { HiroLogin } from "./HiroLogin";

interface IHiroAppProps {
  theme?: "portal" | "saas" | "default";
  themeVersion?: string;
  ready?: () => void;
  orm?: any;
  config?: IAuthConfig;
  login?: boolean;
  children: any;
}

export const HiroApp = ({
  children,
  config,
  login,
  orm,
  ready,
  theme = "default",
  themeVersion = "latest"
}: IHiroAppProps) => {
  const [me, setMe] = useState({});
  const [colours, setColours] = useState({});

  useEffect(() => {
    let cancel = false;

    fetch(
      `https://dtlv35ikt30on.cloudfront.net/${themeVersion}/${theme}/colours.json`
    )
      .then(res => res.json())
      .then(c => {
        if (cancel) {
          return;
        }
        setColours(c);
      });

    if (orm) {
      orm.person().then(m => setMe(m));
    }

    return () => (cancel = true);
  }, []);

  const onLoad = () => ready && ready();

  const getColour = (colour: IThemeColour) =>
    colours ? colours[colour] || "black" : "black";

  let content = children;

  if (login && config) {
    content = <HiroLogin config={config}>{children}</HiroLogin>;
  } else if (orm) {
    content = (
      <HiroLoginContext.Provider value={{ orm, me }}>
        {children}
      </HiroLoginContext.Provider>
    );
  }

  return (
    <BrowserRouter>
      <ThemeContext.Provider
        value={{
          getColour: colours ? getColour : () => "transparent"
        }}
      >
        <link
          rel="stylesheet"
          href={`https://dtlv35ikt30on.cloudfront.net/${themeVersion}/${theme}/semantic.min.css`}
          onLoad={onLoad}
        />
        {content}
      </ThemeContext.Provider>
    </BrowserRouter>
  );
};
