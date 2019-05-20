import React, { useCallback } from "react";
import { storiesOf } from "@storybook/react";

import { Container, HiroTheme, Dropdown, Menu } from "../src";

import { SiteDemo } from "./theming/site";
import { MenuDemo } from "./theming/menu";
import { ButtonsDemo } from "./theming/buttons";
import { TableDemo } from "./theming/tables";

const ThemeController = () => {
  const theme = sessionStorage.getItem("theme") || "default";

  const changeTheme = useCallback((_, { value }) => {
    sessionStorage.setItem("theme", value);
    window.location.reload();
  }, []);

  let content = <HiroTheme.Default />;

  if (theme === "portal") {
    content = <HiroTheme.Portal />;
  }

  if (theme === "saas") {
    content = <HiroTheme.SAAS />;
  }

  return (
    <>
      <Menu borderless secondary>
        <Menu.Item position="right">
          <span style={{ paddingRight: "10px" }}>Theme</span>
          <Dropdown
            options={[
              { text: "Default", value: "default" },
              { text: "SAAS", value: "saas" },
              { text: "Portal", value: "portal" }
            ]}
            onChange={changeTheme}
            selection
            value={theme}
          />
        </Menu.Item>
      </Menu>
      {content}
    </>
  );
};

storiesOf("Themes", module).add("Demo", () => {
  return (
    <Container fluid>
      <ThemeController />
      <SiteDemo />
      <MenuDemo />
      <ButtonsDemo />
      <TableDemo />
    </Container>
  );
});
