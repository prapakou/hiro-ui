import { createAsyncAction } from "typesafe-actions";

import {
  GraphQueryRequest,
  GraphQuerySuccess,
  GraphQueryError
} from "./constants";

export const graphQuery = createAsyncAction(
  "GRAPH_QUERY_REQUEST",
  "GRAPH_QUERY_SUCCESS",
  "GRAPH_QUERY_FAILURE",
  "GRAPH_QUERY_CANCEL"
)<GraphQueryRequest, GraphQuerySuccess, GraphQueryError, { id: string }>();
