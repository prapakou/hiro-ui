import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Loader } from "semantic-ui-react";

import { Auth, IAuthConfig } from "../auth";
import { IThemeColour, ThemeContext } from "../contexts";
import { HiroAppStore } from "../stores";

interface IHiroAppProps {
  theme?: "portal" | "saas" | "default";
  themeVersion?: string;
  ready?: () => void;
  orm?: any;
  authConfig?: IAuthConfig;
  config?: any;
  login?: boolean;
  children: any;
}

export const HiroApp = ({
  children,
  config,
  authConfig,
  login,
  orm,
  ready,
  theme = "default",
  themeVersion = "latest"
}: IHiroAppProps) => {
  const [me, setMe] = useState({});
  const [loading, setLoading] = useState(true);
  const [colours, setColours] = useState({});
  const authRef = useRef(null);

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

  useEffect(() => {
    if (login && authConfig) {
      // @ts-ignore
      authRef.current = new Auth(authConfig);
      // @ts-ignore
      authRef.current.isLoggedIn().then(() => {
        setLoading(false);
      });
    } else if (config) {
      HiroAppStore.set("token", config.token);
      HiroAppStore.set("me", me);
      HiroAppStore.set("orm", orm);
      setLoading(false);
    }
  }, []);

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
        {loading ? (
          <Loader active size="huge">
            Logging in...
          </Loader>
        ) : (
          children
        )}
      </ThemeContext.Provider>
    </BrowserRouter>
  );
};
