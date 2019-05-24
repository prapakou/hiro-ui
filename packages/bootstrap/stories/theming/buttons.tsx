import React, { useCallback, useState } from "react";

import { Header, Button, Divider, Rocker } from "../../src";

export const ButtonsDemo = () => {
  const [toggle, setToggle] = useState(false);
  const [tab, setTab] = useState(0);

  const handleToggle = useCallback(() => void setToggle(!toggle), [toggle]);

  const handleTab = useCallback((i: number) => () => void setTab(i), []);

  return (
    <>
      <Header as="h1">Buttons</Header>

      <Button>Default</Button>
      <Button active>Active</Button>
      <Divider hidden />
      <Button.Group>
        <Button active={tab === 0} onClick={handleTab(0)}>
          {tab === 0 ? "Active" : "Tab 1"}
        </Button>
        <Button active={tab === 1} onClick={handleTab(1)}>
          {tab === 1 ? "Active" : "Tab 2"}
        </Button>
        <Button active={tab === 2} onClick={handleTab(2)}>
          {tab === 2 ? "Active" : "Tab 3"}
        </Button>
      </Button.Group>
      <Divider hidden />
      <Rocker active={!toggle} onClick={handleToggle} />
      <Rocker active={toggle} onClick={handleToggle} />
      <Divider hidden />
      <Button disabled>Disabled button</Button>
      <Button secondary>Secondary button</Button>
      <Divider hidden />
      <Button>Normal</Button>
      <Button size="mini">Small</Button>
    </>
  );
};

/* export const ButtonsDemo = () => {
  return (
    <Segment basic padded>
      <Header dividing>Buttons</Header>

      <Grid columns="2">
        <Grid.Column>
          <Grid.Row>
            <Button>Default</Button>
            <Button active>Active</Button>
            <Button disabled>Disabled</Button>
            <Divider hidden />
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
}; */
