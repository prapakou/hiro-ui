import { useCallback, DependencyList } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";
import { MappedTypes } from "@hiro-graph/orm-mappings";
import { Entity, GraphVertex } from "@hiro-graph/orm";
import { get } from "lodash-es";

import { HIRO_NAMESPACE } from "../constants";

import { GRAPH_NAMESPACE, GraphQueryItem } from "./constants";
import { graphQuery } from "./actions";

type EntityKeys = keyof Entity<GraphVertex>;

type PromiseReturnType<M extends EntityKeys> = ReturnType<
  Entity<GraphVertex>[M]
> extends Promise<infer U>
  ? U
  : ReturnType<Entity<GraphVertex>[M]>;

export const useGraphState = () => {
  const mapState = useCallback(
    state => get(state, [HIRO_NAMESPACE, GRAPH_NAMESPACE]),
    []
  );

  return useMappedState(mapState);
};

export const useGraphQuery = <E extends MappedTypes, M extends EntityKeys>(
  query: {
    entity: E;
    method: M;
    args?: Parameters<Entity<GraphVertex>[M]>;
  },
  deps: DependencyList = []
) => {
  const dispatch = useDispatch();
  let id = `${query.entity}-${query.method}`;

  if (query.args) {
    id = `${id}-${JSON.stringify(query.args)}`;
  }

  const send = useCallback(() => {
    dispatch(graphQuery.request({ ...query, id }));

    return () => void dispatch(graphQuery.cancel({ id }));
  }, [deps]);

  const mapState = useCallback(
    state =>
      get(state, [HIRO_NAMESPACE, GRAPH_NAMESPACE, id], {
        loading: true
      }) as GraphQueryItem,
    [deps]
  );

  const state = useMappedState(mapState);

  return {
    send,
    loading: state.loading,
    response: state.response as PromiseReturnType<M>,
    error: state.error
  };
};
