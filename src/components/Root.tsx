import React, { useEffect } from "react";
import { Loader } from "semantic-ui-react";

import { LoginStore } from "../stores/LoginStore";
import { ThemeStore } from "../stores/ThemeStore";
import subscribe from "../subscribe";

interface IHiroLogin {
  children: any;
  loginStore: LoginStore;
  themeStore: ThemeStore;
  authConfig?: any;
  config?: any;
  orm?: any;
  theme?: any;
  themeVersion?: any;
}

export const Root = subscribe({
  loginStore: LoginStore,
  themeStore: ThemeStore
})(
  ({
    authConfig,
    children,
    config,
    loginStore,
    orm,
    theme,
    themeStore,
    themeVersion
  }: IHiroLogin) => {
    console.log(loginStore.state);

    useEffect(() => {
      loginStore.ensureLogin(authConfig, config, orm);
    }, []);

    useEffect(() => {
      themeStore.load(theme, themeVersion);
    }, []);

    if (!loginStore.state.me) {
      return <Loader active size="huge" content="Logging in..." />;
    }

    return <>{children}</>;
  }
);
/*
export class HiroLogin extends React.Component<IHiroLogin> {
  componentDidMount() {
    const { store } = this.props;

    store.setToken("test2");
  }

  componentWillReceiveProps(nextProps, oldProps) {
    console.log(nextProps, oldProps);
  }

  render() {
    console.log(this.props.store.state);
    return <>{this.props.children}</>;
  }
}
*/
/*

const Content = ({ loginStore, children }) => {
  console.log(loginStore.state);

  return (
    <>
      <p>{loginStore.getToken()}</p>
      <Button
        onClick={() => loginStore.setToken("test2")}
        content="Set token"
      />
    </>
  );
};

export const HiroLogin2 = ({ children, authConfig, orm, config }) => {
  return (
    <Subscribe to={[LoginStore, TestStore]}>
      {(loginStore: LoginStore) => (
        <Content loginStore={loginStore} children={children} />
      )}
    </Subscribe>
  );
};
*/
