import React from "react";
import { Button, Message, Rail } from "semantic-ui-react";

import { useErrorState, useErrorDispatch } from "../stores";

const style = {
  backgroundColor: "mistyrose",
  bottom: 0,
  left: 0,
  position: "fixed",
  right: 0
};

export const ErrorBar = () => {
  const error = useErrorState();
  const { clearError } = useErrorDispatch();

  if (!error) {
    return null;
  }

  return (
    <Message error style={style}>
      <Rail position="right" internal close>
        <Button
          icon="close"
          color="red"
          floated="right"
          compact
          onClick={clearError}
        />
      </Rail>
      <b>{error.name}</b>
      <p>{error.message}</p>
    </Message>
  );
};
