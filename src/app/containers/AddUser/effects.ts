declare function require(name: string): any;
import * as fetch from "isomorphic-fetch";

// Temp. UUID generator.
const generateUUID = () => {
  let d = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};

export const createUser = (data, resolve, reject) => fetch(`http://localhost:3004/users`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ id: generateUUID(), email: data.email })
})
  .then(response => {
    if (response.status > 400) {
      throw new Error("Error while fetching from the server");
    } else {
      return response.json();
    }
  });