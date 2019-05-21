import React, { useState, useCallback } from "react";

import { Grid, Header, Segment, Menu, Dropdown, MenuProps } from "../../src";

export const MenuDemo = () => {
  const [active, setActive] = useState("aboutUs");
  const [value, setValue] = useState("1");

  const handleItemClick = useCallback(
    (_, { name }) => void setActive(name),
    []
  );

  const handleDropdown = useCallback(
    (_, { value: newValue }) => void setValue(newValue),
    []
  );

  const renderMenu = useCallback(
    (props: MenuProps = {}) => (
      <Menu {...props}>
        <Menu.Item header>Our Company</Menu.Item>
        <Menu.Item
          name="aboutUs"
          active={active === "aboutUs"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="jobs"
          active={active === "jobs"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="locations"
          active={active === "locations"}
          onClick={handleItemClick}
        />

        <Menu.Item position="right">
          <Dropdown
            value={value}
            search
            item
            icon="search"
            selection
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
        </Menu.Item>
      </Menu>
    ),
    [active, value]
  );

  return (
    <Segment basic padded>
      <Header dividing>Menu</Header>

      {renderMenu()}
      {renderMenu({ inverted: true })}
      {renderMenu({ tabular: true })}
      {renderMenu({ pointing: true })}
      {renderMenu({ secondary: true })}
    </Segment>
  );
};
