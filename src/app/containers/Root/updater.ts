declare function require(name: string): any;

import appUpdater, { init as appInit } from "../App/updater";
import usersUpdater, { init as usersInit } from "../Users/updater";
import addUserUpdater, { init as addUserInit } from "../AddUser/updater";
import { Map } from "immutable";

const { Updater } = require("redux-elm");

type Init = () => Map<string, any>;
export const initialModel: Init = () => Map({
  // models are keyed by the modelKey defined in src/app/routing.tsx
  app: appInit(),
  usersView: usersInit,
  addUser: addUserInit
});

export default new Updater(initialModel())
  .case("UsersView", (model, action) => model.update("usersView", usersView => usersUpdater(usersView, action)))
  .case("App", (model, action) => model.update("app", app => appUpdater(app, action)))
  .case("AddUser", (model, action) => model.update("addUser", callback => addUserUpdater(callback, action)))
  .toReducer();
