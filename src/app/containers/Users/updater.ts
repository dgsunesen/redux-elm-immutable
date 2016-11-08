declare function require(name: string): any;

import { takeEvery } from "redux-saga";
import { take, put, call, fork, select, Effect } from "redux-saga/effects";
import { Map } from "immutable";
import listSimpleUpdater, { init as listSimpleInit } from "../../components/ListSimple/updater";

const { Updater } = require("redux-elm");

// Initial immutable model/state passed to the Updater.
type Init = Map<string, any>;
export const init: Init = Map({
  userList: listSimpleInit("http://localhost:3004/users")
});

export default new Updater(init)
  .case("UserList", (model, action) => model.set("userList", listSimpleUpdater(model.get("userlist"), action)))
  .toReducer();
