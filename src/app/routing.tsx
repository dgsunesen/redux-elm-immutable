declare function require(name: string): any;
declare const window: any;

import * as React from "react";
const { connect } = require("react-redux");
import { Router, Route, Redirect, IndexRoute } from "react-router";

const { forwardTo } = require("redux-elm");

import App from "./containers/App/view";
import Users from "./containers/Users/view";
import AddUser from "./containers/AddUser/view";
import { push } from "react-router-redux";

/**
 * Prepare component for router
 * @param {View} View - imported view component class/name
 * @param {string} modelKey - key used in root reducer inside src/app/Root/updater.js
 * @param {string} ...nesting - action name/identifier for component
 */
const ConnectedView = (View, modelKey, ...nesting) =>
  connect(appState => ({ model: appState.root.get(modelKey)}))(
    props => <View {...props} dispatch={forwardTo(props.dispatch, ...nesting)} />);

const AppView = ConnectedView(App, "app", "App");
const UsersView = ConnectedView(Users, "usersView", "UsersView");
const AddUserView = ConnectedView(AddUser, "addUser", "AddUser");

export default (history, store) => {
  return (
    <Router history={history}>
      <Route path="/" component={AppView}>
        <Route path="/users" component={UsersView} />
        <Route path="/addUser" component={AddUserView} />
      </Route>
    </Router>
  );
};

