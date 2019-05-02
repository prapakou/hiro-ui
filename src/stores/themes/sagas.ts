import { take, call, put } from "redux-saga/effects";
import fetch from "node-fetch";

import { errorSet } from "../errors";

import {
  ThemeNames,
  ThemeVersions,
  ColourListType,
  ThemeRequest
} from "./constants";
import { themeRequest, themeSuccess, themeError } from "./actions";

const fetchColours = (
  theme: ThemeNames,
  themeVersion: ThemeVersions
): Promise<ColourListType> =>
  fetch(
    `https://dtlv35ikt30on.cloudfront.net/${themeVersion}/${theme}/colours.json`
  ).then(res => res.json());

export function* handleThemes() {
  while (true) {
    const { payload } = yield take(themeRequest);
    const { theme, themeVersion } = payload as ThemeRequest;

    try {
      const colours = yield call(fetchColours, theme, themeVersion);
      yield put(themeSuccess({ colours }));
    } catch (error) {
      yield put(themeError({ error }));
      yield put(errorSet(error));
    }
  }
}
