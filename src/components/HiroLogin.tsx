import React, { Component } from "react";
import { Loader } from "semantic-ui-react";
import { Auth, IAuthConfig } from "../auth";
import { HiroLoginContext } from "../contexts";

interface IProps {
  config: IAuthConfig;
}

interface IState {
  ok: boolean;
  token?: string;
  me?: any;
  orm?: any;
}

export class HiroLogin extends Component<IProps, IState> {
  private cancel?: () => void;
  private auth: Auth;

  constructor(props: IProps) {
    super(props);

    this.auth = new Auth(props.config);

    this.state = {
      ok: false
    };
  }

  check = () => {
    let cancel = false;

    this.auth.isLoggedIn().then(async ({ ok, token, orm, me }: IState) => {
      if (cancel) {
        return;
      }

      this.setState({ ok, token, orm, me });

      if (ok) {
        return;
      }

      const success = await this.auth.login();

      if (cancel) {
        return;
      }

      if (success) {
        window.location.reload();
      } else {
        console.error("Failed to login");
      }
    });

    return () => {
      cancel = true;
    };
  };

  componentDidMount() {
    this.cancel = this.check();
  }

  componentWillReceiveProps() {
    this.cancel = this.check();
  }

  componentWillUnmount() {
    if (this.cancel && typeof this.cancel === "function") {
      this.cancel();
    }
  }

  render = () => {
    const { children } = this.props;
    const { ok } = this.state;

    if (!ok) {
      return (
        <div>
          <Loader active size="huge">
            Logging in...
          </Loader>
        </div>
      );
    }

    return (
      <HiroLoginContext.Provider
        value={{
          me: this.state.me,
          orm: this.state.orm,
          token: this.state.token
        }}
      >
        {children}
      </HiroLoginContext.Provider>
    );
  };
}
