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
  class Content extends React.Component<IHiroLogin> {
    componentDidMount() {
      const { loginStore, authConfig, config, orm } = this.props;

      loginStore.ensureLogin(authConfig, config, orm);
    }

    componentWillReceiveProps(nextProps) {
      const { loginStore, authConfig, config, orm } = nextProps;

      loginStore.ensureLogin(authConfig, config, orm);
    }

    render() {
      const { children } = this.props;

      return <>{children}</>;
    }
  }
);
