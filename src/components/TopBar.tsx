import React from "react";
import cx from "classnames";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import {
  Container,
  Dropdown,
  DropdownProps,
  Icon,
  Image,
  Menu
} from "semantic-ui-react";
import { Location } from "history";

interface INavItem {
  href: string;
  contents: React.ReactNode;
}

interface ISearchItem {
  key: string | number;
  text: string | number;
  value: string | number;
}

interface ITopBarProps extends RouteComponentProps {
  title: string;

  search?: ISearchItem[];
  searchProps?: DropdownProps;
  navigation?: INavItem[];
  logo?: string;
  trigger?: React.ReactNode;
  options?: Array<import("semantic-ui-react").DropdownItemProps>;
  color?: import("semantic-ui-react").SemanticCOLORS;
}

const renderLogo = (logo: string) => (
  <Image size="mini" src={logo} spaced="right" alt="logo" />
);

const renderNav = (navigation: INavItem[], location: Location) => {
  const className = (n: INavItem) =>
    cx("link", "item", {
      active: n.href === location.pathname
    });

  return navigation.map(n => (
    <Link to={n.href} key={n.href} className={className(n)}>
      {n.contents}
    </Link>
  ));
};

const renderSearch = (search: ISearchItem[], searchProps?: DropdownProps) => (
  <Menu.Item>
    <Dropdown
      placeholder="State"
      search
      selection
      options={search}
      {...searchProps}
    />
  </Menu.Item>
);

const renderDropDown = (
  options?: Array<import("semantic-ui-react").DropdownItemProps>,
  trigger?: React.ReactNode,
  color?: import("semantic-ui-react").SemanticCOLORS
) => (
  <Dropdown
    item
    options={options}
    trigger={trigger}
    icon={<Icon name="caret down" size="large" color={color} />}
  />
);

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
    const showMenu = showSearch || showDropdown;

    let menu: React.ReactNode;

    if (showMenu) {
      menu = (
        <Menu.Menu position="right">
          {search && renderSearch(search, searchProps)}
          {showDropdown && renderDropDown(options, trigger, color)}
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
