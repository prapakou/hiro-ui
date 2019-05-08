import { takeEvery, take, call, put, race, delay } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";

import { Orm } from "../../contexts";

import { GraphQueryRequest } from "./constants";
import { graphQuery } from "./actions";

function* sendRequest(req: any, id: string, params: any[]) {
  try {
    const response = yield call(req, ...params);
    yield put(graphQuery.success({ id, response }));
  } catch (error) {
    yield put(graphQuery.failure({ id, error }));
  }
}

function* handleRequest(
  orm: Orm,
  action: ActionType<typeof graphQuery.request>
) {
  const { id, entity, method, args } = action.payload as GraphQueryRequest;
  const params = Array.isArray(args) ? args : [args];

  yield race({
    result: yield call(sendRequest, orm[entity][method], id, params),
    cancel: yield take(graphQuery.cancel)
  });
}

export function* handleGraphRequests(orm?: Orm) {
  if (!orm) {
    console.warn(
      `HiroGraph: No orm available will not run saga handleGraphRequests`
    );
    return;
  }

  // @ts-ignore
  yield takeEvery(graphQuery.request, handleRequest, orm);
}
