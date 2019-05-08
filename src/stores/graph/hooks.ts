import { useCallback } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";
import { get } from "lodash-es";

import { HIRO_NAMESPACE } from "../constants";

import { GRAPH_NAMESPACE, GraphQueryRequest } from "./constants";
import { graphQuery } from "./actions";

export const useGraphState = () => {
  const mapState = useCallback(
    state => get(state, [HIRO_NAMESPACE, GRAPH_NAMESPACE]),
    []
  );

  return useMappedState(mapState);
};

type SendQueryParams = Pick<GraphQueryRequest, "args" | "method" | "entity">;

export const useGraphDispatch = () => {
  const dispatch = useDispatch();

  const sendQuery = useCallback(
    (query: SendQueryParams) => {
      let id = `${query.entity}-${query.method}`;

      if (query.args) {
        id = `${id}-${JSON.stringify(query.args)}`;
      }

      dispatch(graphQuery.request({ ...query, id }));

      return () => void dispatch(graphQuery.cancel({ id }));
    },
    [dispatch]
  );

  return { sendQuery };
};
