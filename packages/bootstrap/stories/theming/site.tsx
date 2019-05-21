import React from "react";

import { Grid, Header, Segment } from "../../src";

const Text = () => (
  <>
    <Header as="h1" content="Heading 1" />
    <Header as="h2" content="Heading 2" />
    <Header as="h3" content="Heading 3" />
    <Header as="h4" content="Heading 4" />
    <Header as="h5" content="Heading 5" />
    <p>
      Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque
      penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam
      id dolor id nibh ultric
    </p>
  </>
);
const Body = () => (
  <>
    <Header>Example body text</Header>
    <p>
      Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque
      penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam
      id dolor id nibh ultricies vehicula.
    </p>
    <p>
      <small>This line of text is meant to be treated as fine print.</small>
    </p>

    <p>
      The following snippet of text is <strong>rendered as bold text</strong>.
    </p>

    <p>
      The following snippet of text is rendered as <em>italicized text</em>.
    </p>

    <p>
      An abbreviation of the word attribute is{" "}
      <abbr title="attribute">attr</abbr>.
    </p>
  </>
);
const Colours = () => (
  <Grid
    columns="2"
    stackable
    centered
    padded
    verticalAlign="middle"
    textAlign="center"
  >
    <Grid.Column color="red">Red</Grid.Column>
    <Grid.Column color="orange">Orange</Grid.Column>
    <Grid.Column color="yellow">Yellow</Grid.Column>
    <Grid.Column color="olive">Olive</Grid.Column>
    <Grid.Column color="green">Green</Grid.Column>
    <Grid.Column color="teal">Teal</Grid.Column>
    <Grid.Column color="blue">Blue</Grid.Column>
    <Grid.Column color="violet">Violet</Grid.Column>
    <Grid.Column color="purple">Purple</Grid.Column>
    <Grid.Column color="pink">Pink</Grid.Column>
    <Grid.Column color="brown">Brown</Grid.Column>
    <Grid.Column color="grey">Grey</Grid.Column>
    <Grid.Column color="black">Black</Grid.Column>
  </Grid>
);

export const SiteDemo = () => (
  <Segment basic padded>
    <Header dividing>Site</Header>
    <Grid columns="3">
      <Grid.Column>
        <Text />
      </Grid.Column>
      <Grid.Column>
        <Body />
      </Grid.Column>
      <Grid.Column>
        <Colours />
      </Grid.Column>
    </Grid>
  </Segment>
);
