import { useCallback, DependencyList } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";
import { get } from "lodash-es";

import { HIRO_NAMESPACE } from "../constants";

import {
  GRAPH_NAMESPACE,
  GraphQueryRequest,
  GraphQueryItem
} from "./constants";
import { graphQuery } from "./actions";

export const useGraphState = () => {
  const mapState = useCallback(
    state => get(state, [HIRO_NAMESPACE, GRAPH_NAMESPACE]),
    []
  );

  return useMappedState(mapState);
};

type SendQueryParams = Pick<GraphQueryRequest, "args" | "method" | "entity">;

export const useGraphQuery = (
  query: SendQueryParams,
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
      get(state, [HIRO_NAMESPACE, GRAPH_NAMESPACE, id], {}) as GraphQueryItem,
    [deps]
  );

  const state = useMappedState(mapState);

  return {
    send,
    loading: state.loading,
    response: state.response,
    error: state.error
  };
};
