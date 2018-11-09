import React from "react";
import { Link } from "react-router-dom";
import { Container, Dropdown, Icon, Image, Menu } from "semantic-ui-react";

interface ITopBarProps {
  title: string;

  navigation?: Array<{
    href: string;
    contents: React.ReactNode;
  }>;
  logo?: string;
  trigger?: React.ReactNode;
  options?: Array<import("semantic-ui-react").DropdownItemProps>;
  color?: import("semantic-ui-react").SemanticCOLORS;
}

export const TopBar = ({
  navigation,
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
      {navigation &&
        navigation.map(n => (
          <Menu.Item key={n.href} link>
            <Link to={n.href}>{n.contents}</Link>
          </Menu.Item>
        ))}
      {options && trigger && (
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
