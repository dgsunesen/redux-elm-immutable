declare function require(name: string): any;

import * as React from "react";
const { view } = require("redux-elm");

export default view(({dispatch, model}) => (
  <div>
    <div>
      <span>Name</span>
      <span>{model.email}</span>
    </div>
    <div>
      <button onClick={dispatch({type: "DELETE_USER"})}>Delete user</button>
    </div>
  </div>
));
