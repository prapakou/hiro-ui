import React, { useState, useCallback } from "react";

import {
  Grid,
  Header,
  Button,
  Divider,
  Dropdown,
  Checkbox,
  Input,
  Form
} from "../../src";

export const InputDemo = () => {
  const [value, setValue] = useState();
  const [checked, setChecked] = useState(false);

  const handleCheck = useCallback(() => setChecked(!checked), [checked]);

  const handleDropdown = useCallback(
    (_, { value: newValue }) => void setValue(newValue),
    []
  );

  return (
    <>
      <Header as="h1">Form</Header>

      <Grid columns="2">
        <Grid.Column>
          <Dropdown
            value={value}
            search
            item
            selection
            placeholder="Search for..."
            icon="search"
            options={[
              {
                text: "Electronics",
                value: "1"
              },
              { text: "Automotive", value: "2" },
              { text: "Home", value: "3" }
            ]}
            onChange={handleDropdown}
          />
        </Grid.Column>
        <Grid.Column>
          <Dropdown
            open
            search
            item
            icon="search"
            selection
            options={[
              {
                text: "Option 1",
                value: "1",
                selected: false
              },
              {
                text: "Active",
                value: "2",
                active: true,
                selected: true,
                icon: "check"
              },
              { text: "Option 3", value: "3" }
            ]}
          />
        </Grid.Column>
      </Grid>

      <Divider hidden style={{ height: "100px" }} />

      <Form widths="equal">
        <Form.Group inline>
          <Form.Checkbox label="Default" />
          <Form.Checkbox
            label="Default"
            radio
            checked={checked}
            onClick={handleCheck}
          />
        </Form.Group>
        <Form.Group inline>
          <Form.Checkbox label="Checked" checked />
          <Form.Checkbox label="Checked" radio checked />
        </Form.Group>
        <Form.Input label="Label" placeholder="Default - Placeholder" inline />
        <Form.Input
          label="Label"
          error
          placeholder="Error - Placeholder"
          inline
        />
        <Form.Input
          disabled
          label="Label"
          placeholder="Disabled - Placeholder"
          inline
        />
        <Form.TextArea
          label="Textarea"
          rows="7"
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet sodales risus. Phasellus vel massa eget justo mattis egestas. Mauris velit libero, ultricies vel orci nec, ultricies bibendum leo. Curabitur dignissim vel eros nec maximus. Nam fermentum lorem odio, quis consectetur quam fringilla eget. Pellentesque eleifend dictum quam, mollis."
        />
      </Form>

      <Divider hidden />

      <Grid columns="2">
        <Grid.Column>
          <Header as="h1">Login button</Header>

          <Grid>
            <Grid.Column>
              <Grid.Row>
                <Button positive>Sign Up</Button>
                <Button color="blue">Login</Button>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Grid.Column>

        <Grid.Column>
          <Header as="h1">Login form</Header>

          <Grid columns="2">
            <Grid.Row verticalAlign="middle">
              <Grid.Column width="3">
                <label>Email</label>
              </Grid.Column>
              <Grid.Column width="13">
                <Input fluid />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row verticalAlign="middle">
              <Grid.Column width="3">
                <label>Password</label>
              </Grid.Column>
              <Grid.Column width="13">
                <Input fluid />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign="right">
              <Grid.Column floated="right">
                <Checkbox label="Remember password" checked />
                <br />
                <a href="#">Forgot password</a>
                <Divider hidden />
                <Button floated="right">Login</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid>
    </>
  );
};
