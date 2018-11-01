import React from "react";
import { Container, Dropdown, Icon, Image, Menu } from "semantic-ui-react";

interface ITopBarProps {
  title: string;

  logo?: string;
  trigger?: React.ReactNode;
  options?: import("semantic-ui-react").DropdownItemProps[];
  color?: import("semantic-ui-react").SemanticCOLORS;
}

export const TopBar = ({
  logo,
  options,
  trigger,
  title,
  color = "black"
}: ITopBarProps) => (
  <Menu>
    <Container>
      <Menu.Item header>
        <span>
          {logo && <Image size="mini" src={logo} spaced="right" alt="logo" />}
          {title}
        </span>
      </Menu.Item>
      {options &&
        trigger && (
          <Menu.Menu position="right">
            <Dropdown
              item
              options={options}
              trigger={trigger}
              icon={<Icon name="caret down" size="large" color={color} />}
            />
          </Menu.Menu>
        )}
    </Container>
  </Menu>
);
