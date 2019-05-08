import { take, call, put } from "redux-saga/effects";

import { Orm } from "../../contexts";

import { graphQuery } from "./actions";
import { GraphQueryRequest } from "./constants";

export function* handleGraphRequests(orm?: Orm) {
  if (!orm) {
    console.warn(
      `HiroGraph: No orm available will not run saga handleGraphRequests`
    );
    return;
  }

  while (true) {
    const action = yield take(graphQuery.request);
    const { id, entity, method, args } = action.payload as GraphQueryRequest;

    const params = Array.isArray(args) ? args : [args];

    // @ts-ignore
    const result = yield call(orm[entity][method], ...params);

    try {
      yield put(graphQuery.success({ id, result }));
    } catch (error) {
      yield put(graphQuery.failure({ id, error }));
    }
  }
}
