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

export interface INavItem {
  href: string;
  contents: React.ReactNode;
}

export interface ISearchItem {
  key: string | number;
  text: string | number;
  value: string | number;
}

export interface ISearchProps {
  options: ISearchItem[];
  onChange: DropdownProps["onChange"];
}

export interface IDropdownProps {
  options: DropdownItemProps[];
  color: SemanticCOLORS;
  trigger?: React.ReactNode;
}

export interface ITopBarProps extends RouteComponentProps {
  title: string;
  logo?: string;

  navigation?: INavItem[];
  dropdown?: IDropdownProps;
  search?: ISearchProps;
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

const renderSearch = ({ options, onChange }: ISearchProps) => (
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
}: IDropdownProps) => (
  <Dropdown
    item
    options={options}
    trigger={trigger}
    icon={<Icon name="caret down" size="large" color={color} />}
  />
);

export const TopBar = withRouter(
  ({ navigation, logo, title, search, dropdown, location }: ITopBarProps) => {
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
