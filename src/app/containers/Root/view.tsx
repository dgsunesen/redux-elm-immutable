declare function require(name: string): any;

import buildRouting from "../../routing";

const { view } = require("redux-elm");

export default view(({ history, store }) => buildRouting(history, store));
