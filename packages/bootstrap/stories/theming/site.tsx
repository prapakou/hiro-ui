import React from "react";

import { Grid, Header, Segment, Label, Divider } from "../../src";

export const TextDemo = () => (
  <>
    <Header as="h1">Font</Header>
    <Header as="h1" content="H1 // Titillium Web 18px regular" />
    <Header as="h2" content="H2 // Titillium Web 16px regular" />
    <Header as="h3" content="H3 // Titillium Web 14px regular" />
    <p>p // Titillium Web 14px regular, italic, bold</p>

    <Divider hidden />
    <Header as="h1">Font</Header>
    <a href="#">link</a>
  </>
);

export const ColoursDemo = () => (
  <>
    <Header as="h1">Color</Header>
    <Label circular color="red" />
    <Label circular color="orange" />
    <Label circular color="yellow" />
    <Label circular color="olive" />
    <Label circular color="green" />
    <Label circular color="teal" />
    <Label circular color="blue" />
    <Label circular color="violet" />
    <Label circular color="purple" />
    <Label circular color="pink" />
    <Label circular color="brown" />
    <Label circular color="grey" />
    <Label circular color="black" />
  </>
);
