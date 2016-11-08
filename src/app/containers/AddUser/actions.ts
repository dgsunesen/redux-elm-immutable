export const ADD_USER = "ADD_USER";

export const createUser = email => ({
  type: ADD_USER,
  email
});
