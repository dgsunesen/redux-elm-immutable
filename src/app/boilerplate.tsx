declare const window: any;
declare function require(name: string): any;

import * as React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, Middleware, compose, combineReducers } from "redux";
import { Provider, connect } from "react-redux";
import { reducer as formReducer } from "redux-form";
import routerMiddleware from "./utils/routerMiddleware";

// Using require() instead of import until @types are fixed
const reduxElm = require("redux-elm").default;
const { browserHistory } = require("react-router");
const { push, syncHistoryWithStore, routerReducer } = require("react-router-redux");
const { AppContainer } = require("react-hot-loader");

// Activate Redux DevTools during development
const activatedDevTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

let store;


const middleware: Array<Middleware> = new Array<Middleware>();
middleware.push(routerMiddleware(browserHistory));

export default (containerDomId) => {

  return (View, updater) => {
    const reducers = combineReducers({
      root: updater,
      routing: routerReducer,
      form: formReducer
    });

    const storeFactory = createStore(reducers,
      compose(
        reduxElm,
        applyMiddleware(...middleware),
        activatedDevTools
      )
    );

    if (!store) {
      store = storeFactory;
    } else {
      store.replaceReducer(reducers);
    }

    const history = syncHistoryWithStore(browserHistory, store);
    /* Logs the state object */

    /* let unsubscribe = store.subscribe(() => {
      console.log("store:");
      console.log(store.getState());
    }); */



    render((
      <AppContainer>
        <Provider store={store}>
          <View
            history={history}
            dispatch={store.dispatch}
            store={store}
          />
        </Provider>
      </AppContainer>
    ), document.getElementById(containerDomId));
  };
};
