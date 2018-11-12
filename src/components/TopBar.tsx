import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Dropdown,
  DropdownProps,
  Icon,
  Image,
  Menu
} from "semantic-ui-react";

interface ITopBarProps {
  title: string;

  search?: Array<{
    key: string | number;
    text: string | number;
    value: string | number;
  }>;
  searchProps?: DropdownProps;
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
  search,
  searchProps,
  color = "black"
}: ITopBarProps) => {
  const showDropdown = !!options && !!trigger;
  const showSearch = !!search && !!searchProps;

  return (
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
            <Link to={n.href} key={n.href} className="link item">
              {n.contents}
            </Link>
          ))}
        {(showSearch || showDropdown) && (
          <Menu.Menu position="right">
            {search && (
              <Menu.Item>
                <Dropdown
                  placeholder="State"
                  search
                  selection
                  options={search}
                  {...searchProps}
                />
              </Menu.Item>
            )}
            {showDropdown && (
              <Dropdown
                item
                options={options}
                trigger={trigger}
                icon={<Icon name="caret down" size="large" color={color} />}
              />
            )}
          </Menu.Menu>
        )}
      </Container>
    </Menu>
  );
};
