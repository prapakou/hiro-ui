import React from "react";
import { Button, ButtonGroupProps } from "semantic-ui-react";
import { SemanticShorthandContent } from "semantic-ui-react/dist/commonjs/generic";

type Omit<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>;

type GroupProps = Omit<
  ButtonGroupProps,
  "toggle" | "content" | "children" | "buttons"
>;

type RockerProps = {
  on?: SemanticShorthandContent;
  off?: SemanticShorthandContent;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>,
    data: RockerProps
  ) => void;
} & GroupProps;

export const Rocker = (props: RockerProps) => {
  const { on = "On", off = "Off", onClick, active, ...rest } = props;

  return (
    <Button.Group {...rest} className="rocker">
      <Button onClick={onClick} content={on} active={active} />
      <Button onClick={onClick} content={off} active={!active} />
    </Button.Group>
  );
};
