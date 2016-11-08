declare function require(name: string): any;

import { Map } from "immutable";

const { Updater } = require("redux-elm");

// Initial immutable model/state passed to the Updater.
type Init = () => Map<string, any>;
export const init: Init = () => Map({});

// Generators applied to the model whenever an action matches the provided pattern.
// function* myGenerator(): IterableIterator<Effect> {}

// Main saga passed to the Updater.
function* saga() {
  // Call sub-sagas here.
  console.log("The saga has just been initialized");
}

export default new Updater(init(), saga)
  .toReducer();