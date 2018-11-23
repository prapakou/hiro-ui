import React from "react";
import { Container, ContainerType, Subscribe } from "unstated";

interface ISubscribe {
  [name: string]: Container<any> | ContainerType<any>;
}

export default (stores: ISubscribe) => WrappedComponent => props => {
  const keys = Object.keys(stores);
  return (
    <Subscribe to={Object.values(stores)}>
      {(...s) => (
        <WrappedComponent
          {...props}
          {...s.reduce((prev, curr, i) => ({ ...prev, [keys[i]]: curr }), {})}
        />
      )}
    </Subscribe>
  );
};
