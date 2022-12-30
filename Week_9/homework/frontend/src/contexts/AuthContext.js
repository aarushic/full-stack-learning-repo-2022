// based on the tutorial from https://usehooks.com/useAuth/

import { createContext, useState } from "react";
// a bug with this hook prevented me from using it 😢
// import { useLocalStorage } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

let AuthContext = createContext();
export { AuthContext as default };

// Provider hook that creates auth object and handles state
export function useProvideAuth() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(
    window.localStorage.getItem("loggedIn") === "true"
  );

  async function login(values, form) {
    await fetch("http://localhost:4000/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ username: values.email, password: values.password }) // body data type must match "Content-Type" header
    })
      .then((data) => {
        if (data.status === 200) {
          const json = data.json();
          return json;
        } 
        if (data.status === 400) {
          console.log("user does not exist");
        } 
        else {
          throw Error("Invalid");
        }
      })
      .then((json) => {
        setLoggedIn(true);
        window.localStorage.setItem("loggedIn", true);
        window.localStorage.setItem("username", json.data.username);
        window.localStorage.setItem("token", json.token); // Should be sent upon subsequent requests
        navigate("../");
      })
      .catch((err) => {
        console.log(err);
      });
  }


  async function register(values, form) {
    await fetch("http://localhost:4000/register", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ username: values.email, password: values.password }) // body data type must match "Content-Type" header
    })
      .then((data) => {
        if (data.status === 200) {
          const json = data.json();
          return json;
        } 
        if (data.status === 400) {
          console.log("user does not exist");
        } 
        else {
          throw Error("Invalid");
        }
      })
      .then((json) => {
        setLoggedIn(true);
        window.localStorage.setItem("loggedIn", true);
        window.localStorage.setItem("username", json.data.username);
        window.localStorage.setItem("token", json.token); // Should be sent upon subsequent requests
        navigate("../");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function profilePic(formData){
    console.log("qergw " + formData.type);
    const user = window.localStorage.getItem("username");
    await fetch("http://localhost:4000/profilepic/" + user, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": formData.type
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: formData // body data type must match "Content-Type" header
    })
      .then((data) => {
        if (data.status === 200) {
          const json = data.json();
          return json;
        } 
        if (data.status === 400) {
          console.log("user does not exist");
        } 
        else {
          throw Error("Invalid");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


  async function uploadFile(file){
    await fetch("http://localhost:4000/upload/", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": file.type
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: { profile_pic: file } // body data type must match "Content-Type" header
    })
      .then((data) => {
        if (data.status === 200) {
          const json = data.json();
          return json;
        } 
        if (data.status === 400) {
          console.log("user does not exist");
        } 
        else {
          throw Error("Invalid");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }




  async function exportFile(){
    const user = window.localStorage.getItem("username");
    await fetch("http://localhost:4000/export/" + user, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "image/png"
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
    .then(resp => resp.json())
    .catch((err) => {
        console.log(err);
    });
  }




  function logout() {
    window.localStorage.clear();
    setLoggedIn(false);
  }

  return {
    loggedIn,
    login,
    register,
    profilePic,
    logout,
    exportFile,
    uploadFile
  };
}
