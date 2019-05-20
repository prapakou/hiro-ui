import React from "react";
import { storiesOf } from "@storybook/react";

import { Container, HiroTheme } from "../src";

import { SiteDemo } from "./theming/site";
import { MenuDemo } from "./theming/menu";
import { ButtonsDemo } from "./theming/buttons";
import { TableDemo } from "./theming/tables";

storiesOf("Themes", module).add("Demo", () => (
  <Container fluid>
    <HiroTheme.Default />
    <SiteDemo />
    <MenuDemo />
    <ButtonsDemo />
    <TableDemo />
  </Container>
));
