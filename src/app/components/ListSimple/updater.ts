declare function require(name: string): any;

import { takeEvery } from "redux-saga";
import { take, put, call, fork, select, Effect } from "redux-saga/effects";
import { REQUEST_USERS, RECEIVE_USERS, requestUsers, receiveUsers, errorHandler } from "./actions";
import listItemUpdater, { init as listItemInit } from "../ListSimpleItem/updater";
import { getUsers } from "./effects";
import { Map } from "immutable";

const { Updater, Matchers } = require("redux-elm");

type GetApiUrl = (model: Map<string, any>) => string;
const getApiUrl: GetApiUrl = model => model.get("apiUrl");

type Init = (apiUrl: string) => Map<string, any>;
export const init: Init = apiUrl => Map({
  apiUrl: apiUrl,
  listItems: [],
  isFetching: false
});

// Generators applied to the model whenever an action matches the provided pattern.
function* fetchUsers (): IterableIterator<Effect> {
  try {
    yield put( requestUsers() );
    const apiUrl = yield select(getApiUrl);
    const users = yield call(getUsers, apiUrl);
    yield put( receiveUsers(users) );
  }
  catch (error) {
    yield put( errorHandler(error));
  }
}


// Main saga passed to the Updater.
function* saga() {
  console.log("listsimple saga");
  yield* fetchUsers();
}

export default new Updater(init("http://localhost:3004/users"), saga)
  .case(REQUEST_USERS, model => model.set("isFetching", true))
  .case(RECEIVE_USERS, (model, { users }) =>
    model
      .set("isFetching", false)
      .set("listItems", users))
  .case("ListSimpleItem", (model, action, ...rest) => {
    console.log("action", action);
    const numericListItemIndex = parseInt(action.args.param, 10);

    return model.get("listItems").map((listItemModel, index) => {
      if (index === numericListItemIndex) {
        return listItemUpdater(listItemModel, action, ...rest);
      }
      return listItemModel;
    });
  }, Matchers.parameterizedMatcher)
  .toReducer();
