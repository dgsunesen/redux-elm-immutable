declare function require(name: string): any;

import * as React from "react";
import List from "../../components/ListSimple/view";
const { view, forwardTo } = require("redux-elm");

export default view(({ model, dispatch }) => (
  <div>
    <h2>Users</h2>
    <List model={model.get("userList")} dispatch={forwardTo(dispatch, "UserList")} />
  </div>
));
