import React from "react";
import { Button, Message, Rail } from "semantic-ui-react";

import { errorStore } from "../stores";

const style = {
  backgroundColor: "mistyrose",
  bottom: 0,
  left: 0,
  position: "fixed",
  right: 0
};

export const ErrorBar = ({ error }: { error: Error }) => (
  <Message error style={style}>
    <Rail position="right" internal close>
      <Button
        icon="close"
        color="red"
        floated="right"
        compact
        onClick={errorStore.actions.clearError}
      />
    </Rail>
    <b>{error.name}</b>
    <p>{error.message}</p>
  </Message>
);
