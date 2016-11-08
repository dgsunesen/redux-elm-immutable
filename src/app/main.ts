declare function require(name: string): any;
declare const module: { hot: any };

import boot from "./boilerplate";

const run = boot("app");

const start = () => run(
  require("./containers/Root/view").default,
  require("./containers/Root/updater").default
);

if (module.hot) {
  module.hot.accept("./containers/Root/view", start);
  module.hot.accept("./containers/Root/updater", start);
}

start();
