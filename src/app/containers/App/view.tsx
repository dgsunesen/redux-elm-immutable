declare function require(name: string): any;

import * as React from "react";
import MainContent from "../../components/MainContent";

const { push } = require("react-router-redux");

const { view } = require("redux-elm");

export default view(({model, dispatch, children}) => (
  <div>
    <MainContent>
      { children }
    </MainContent>
  </div>
));
