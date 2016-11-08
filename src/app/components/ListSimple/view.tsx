declare function require(name: string): any;

import * as React from "react";
import ListItem from "../ListSimpleItem/view";

const { view, forwardTo } = require("redux-elm");

// This component is what should work. Should be put in line 18.
// <ListItem key={i} dispatch={forwardTo(dispatch, "ListSimpleItem", i)} />

export default view(({model, dispatch}) => {
  console.log("listSimpleModel", model);
  return <div>
    <div>
      {!model.get("isFetching") && model.get("listItems") &&
        <div>
          {model.get("listItems").map((listItemModel, i) =>
            <p key={i}>{listItemModel.email}</p>
          )}
        </div>
      }
      { model.get("isFetching") &&
        <h2>Loading content...</h2>
      }
    </div>
  </div>;
});