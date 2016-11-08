declare function require(name: string): any;

import * as React from "react";
const { reduxForm, Field } = require("redux-form");
const { view } = require("redux-elm");

let Form: React.StatelessComponent<{
  fields?: any,
  submitting?: any,
  handleSubmit?: any,
  submit?: any,
  pristine?: any,
  model?: any,
  dispatch?: any
}> = ({ fields, submitting, handleSubmit, pristine, submit }) => {
  return <div>
    <form onSubmit={handleSubmit(submit)}>
      <Field name="email" component="input" type="text" />
      <button type="submit" disabled={pristine || submitting}>Submit</button>
    </form>
  </div>;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch: ownProps.dispatch
});

Form = reduxForm({
  form: "addUser",
}, undefined, mapDispatchToProps)(Form);

export default view(({ model, dispatch, submit }) => (
  <Form model={model} dispatch={dispatch} submit={submit} />
));
