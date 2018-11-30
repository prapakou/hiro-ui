import React from "react";
import { Button, Message, Rail } from "semantic-ui-react";

import { errorStore } from "../stores";

export const ErrorBar = ({ error }: { error: Error }) => (
  <Message
    error
    style={{
      backgroundColor: "mistyrose",
      bottom: 0,
      left: 0,
      position: "fixed",
      right: 0
    }}
  >
    <Rail position="right" internal close>
      <Button
        icon="close"
        color="red"
        floated="right"
        onClick={() => errorStore.actions.clearError()}
      />
    </Rail>
    <b>{error.name}</b>
    <p>{error.message}</p>
  </Message>
);
