import React, { useCallback } from "react";
import { storiesOf } from "@storybook/react";

import { Container, HiroTheme, Dropdown, Menu, Segment } from "../src";

import { SiteDemo, TextDemo, ColoursDemo } from "./theming/site";
import { MenuDemo } from "./theming/menu";
import { ButtonsDemo } from "./theming/buttons";
import { TableDemo } from "./theming/tables";
import { InputDemo } from "./theming/inputs";

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

  return (
    <>
      <Menu borderless secondary>
        <Menu.Item position="right">
          <span style={{ paddingRight: "10px" }}>Theme</span>
          <Dropdown
            options={[
              { text: "Default", value: "default" },
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

storiesOf("Themes", module)
  .addParameters({ options: { showAddonPanel: false } })
  .add("Demo", () => {
    return (
      <Container fluid>
        <Segment basic padded>
          <ThemeController />
          <TextDemo />
          <ButtonsDemo />
          <ColoursDemo />
          <InputDemo />
          <TableDemo />
        </Segment>
      </Container>
    );
  });
