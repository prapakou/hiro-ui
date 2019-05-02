import React from "react";
import cx from "classnames";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import {
  Container,
  Dropdown,
  Icon,
  Image,
  Menu,
  SemanticCOLORS,
  DropdownItemProps,
  DropdownProps
} from "semantic-ui-react";
import { Location } from "history";

export interface NavItem {
  href: string;
  contents: React.ReactNode;
}

export interface SearchItem {
  key: string | number;
  text: string | number;
  value: string | number;
}

export interface TopBarSearchProps {
  options: SearchItem[];
  onChange: DropdownProps["onChange"];
}

export interface TopBarDropdownProps {
  options: DropdownItemProps[];
  color: SemanticCOLORS;
  trigger?: React.ReactNode;
}

export interface TopBarProps extends RouteComponentProps {
  title: string;
  logo?: string;

  navigation?: NavItem[];
  dropdown?: TopBarDropdownProps;
  search?: TopBarSearchProps;
}

const renderLogo = (logo: string) => (
  <Image size="mini" src={logo} spaced="right" alt="logo" />
);

const renderNav = (navigation: NavItem[], location: Location) => {
  const className = (n: NavItem) =>
    cx("link", "item", {
      active: n.href === location.pathname
    });

  return navigation.map(n => (
    <Link to={n.href} key={n.href} className={className(n)}>
      {n.contents}
    </Link>
  ));
};

const renderSearch = ({ options, onChange }: TopBarSearchProps) => (
  <Menu.Item>
    <Dropdown
      placeholder="State"
      search
      selection
      options={options}
      onChange={onChange}
    />
  </Menu.Item>
);

const renderDropDown = ({
  options,
  trigger,
  color = "black"
}: TopBarDropdownProps) => (
  <Dropdown
    item
    options={options}
    trigger={trigger}
    icon={<Icon name="caret down" size="large" color={color} />}
  />
);

export const TopBar = withRouter(
  ({ navigation, logo, title, search, dropdown, location }: TopBarProps) => {
    const showMenu = search || dropdown;

    let menu: React.ReactNode;

    if (showMenu) {
      menu = (
        <Menu.Menu position="right">
          {search && renderSearch(search)}
          {dropdown && renderDropDown(dropdown)}
        </Menu.Menu>
      );
    }

    return (
      <Menu>
        <Container fluid>
          <Menu.Item header>
            <span>
              {logo && renderLogo(logo)}
              {title}
            </span>
          </Menu.Item>
          {navigation && renderNav(navigation, location)}
          {menu}
        </Container>
      </Menu>
    );
  }
);
