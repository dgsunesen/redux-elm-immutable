declare function require(name: string): any;

import * as React from "react";
import Form from "../../components/Forms";
const { view, forwardTo } = require("redux-elm");


export default view(({ model, dispatch }) => {
  const submit = values => {
    return new Promise((resolve, reject) => {
      dispatch({ type: "ADD_USER", data: values, resolve, reject });
    });
  };

  return (
    <div>
      {!model.get("pristine") && model.get("isAddingUser") &&
        <p>Adding user..</p>
      }
      {!model.get("pristine") && !model.get("isAddingUser") &&
        <p>User is added</p>
      }
      <Form submit={submit} model={model.addUserForm} dispatch={forwardTo(dispatch, "AddUserForm")} />
    </div>
  );
});

/*
  <button onClick={() => dispatch({type: "ADD_USER", email: "hardcoded@gmail.com"})}>Tilføj bruger</button>
*/
