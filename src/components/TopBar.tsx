import cx from "classnames";
import React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import {
  Container,
  Dropdown,
  DropdownProps,
  Icon,
  Image,
  Menu
} from "semantic-ui-react";

import { themeStore } from "../streams";

interface ITopBarProps extends RouteComponentProps {
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

export const TopBar = withRouter(
  ({
    navigation,
    logo,
    options,
    trigger,
    title,
    search,
    searchProps,
    color = "black",
    location
  }: ITopBarProps) => {
    const showDropdown = !!options && !!trigger;
    const showSearch = !!search && !!searchProps;

    const themes = themeStore.getters.useThemes();
    console.log("themes", themes);

    return (
      <Menu>
        <Container fluid>
          <Menu.Item header>
            <span>
              {logo && (
                <Image size="mini" src={logo} spaced="right" alt="logo" />
              )}
              {title}
            </span>
          </Menu.Item>
          {navigation &&
            navigation.map(n => (
              <Link
                to={n.href}
                key={n.href}
                className={cx("link", "item", {
                  active: n.href === location.pathname
                })}
              >
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
  }
);
