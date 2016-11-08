declare function require(name: string): any;

import { Map } from "immutable";
const { Updater } = require("redux-elm");

type Init = () => Map<string, any>;
export const init: Init = () => Map({});

export default new Updater(init())
  .toReducer();
