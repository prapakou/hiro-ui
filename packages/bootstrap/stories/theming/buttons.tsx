import React, { useState, useCallback } from "react";

import { Grid, Header, Segment, Button, Divider } from "../../src";

export const ButtonsDemo = () => {
  return (
    <Segment basic padded>
      <Header dividing>Buttons</Header>

      <Grid columns="2">
        <Grid.Column>
          <Grid.Row>
            <Button>Default</Button>
            <Button primary>Primary</Button>
            <Button secondary>Secondary</Button>
            <Button basic>Basic</Button>
            <Button compact>Compact</Button>
          </Grid.Row>
          <Divider hidden />
          <Grid.Row>
            <Button loading>Default</Button>
            <Button primary loading>
              Primary
            </Button>
            <Button secondary loading>
              Secondary
            </Button>
            <Button basic loading>
              Basic
            </Button>
            <Button compact loading>
              Compact
            </Button>
          </Grid.Row>
          <Divider hidden />
          <Grid.Row style={{ backgroundColor: "black", padding: "20px" }}>
            <Button inverted>Default</Button>
            <Button primary inverted>
              Primary
            </Button>
            <Button secondary inverted>
              Secondary
            </Button>
            <Button basic inverted>
              Basic
            </Button>
            <Button compact inverted>
              Compact
            </Button>
          </Grid.Row>
          <Divider hidden />
          <Grid.Row>
            <Button icon="user" />
            <Button icon="user" label="Labeled" />
            <Button icon="user" label="Labeled" labelPosition="right" />
          </Grid.Row>
          <Divider hidden />
          <Grid.Row>
            <Button.Group>
              <Button>Cancel</Button>
              <Button.Or />
              <Button positive>Save</Button>
            </Button.Group>
            <Button circular icon="settings" />
          </Grid.Row>
        </Grid.Column>

        <Grid.Column>
          <Grid.Row>
            <Button size="mini">Mini</Button>
            <Button size="tiny">Tiny</Button>
            <Button size="small">Small</Button>
            <Button size="large">Large</Button>
            <Button size="big">Big</Button>
            <Button size="huge">Huge</Button>
            <Button size="massive">Massive</Button>
          </Grid.Row>
          <Divider hidden />
          <Grid.Row>
            <Button color="red">Red</Button>
            <Button color="orange">Orange</Button>
            <Button color="yellow">Yellow</Button>
            <Button color="olive">Olive</Button>
            <Button color="green">Green</Button>
            <Button color="teal">Teal</Button>
            <Button color="blue">Blue</Button>
            <Button color="violet">Violet</Button>
            <Button color="purple">Purple</Button>
            <Button color="pink">Pink</Button>
            <Button color="brown">Brown</Button>
            <Button color="grey">Grey</Button>
            <Button color="black">Black</Button>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};
