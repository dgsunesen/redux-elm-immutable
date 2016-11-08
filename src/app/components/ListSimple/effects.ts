declare function require(name: string): any;
import * as fetch from "isomorphic-fetch";

export const getUsers = url => fetch(url)
  .then(response => {
    if (response.status > 400) {
      throw new Error("Error while fetching from the server");
    } else {
      return response.json();
    }
  });
