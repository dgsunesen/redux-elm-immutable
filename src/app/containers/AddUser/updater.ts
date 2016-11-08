declare function require(name: string): any;

import { takeEvery } from "redux-saga";
import { take, put, call, fork, select, Effect } from "redux-saga/effects";
import { createUser } from "./effects";
import { Map } from "immutable";
import { ADD_USER } from "./actions";

const { Updater } = require("redux-elm");

// Initial immutable model/state passed to the Updater.
type Init = Map<string, any>;
export const init: Init = Map({
  pristine: true
});

// Generators applied to the model whenever an action matches the provided pattern.
function* submitForm (eventData): IterableIterator<Effect> {
  yield put({type: "ADDING_USER" });
  const result = yield call(createUser, eventData.data, eventData.resolve, eventData.reject);
  yield put({ type: "USER_ADDED", result });
}

// Main saga passed to the Updater.
function* saga() {
  yield* takeEvery(ADD_USER, submitForm);
}

export default new Updater(init, saga)
  .case("ADDING_USER", model => model.set("isAddingUser", true).set("pristine", false))
  .case("USER_ADDED", model => model.set("isAddingUser", false))
  .toReducer();
