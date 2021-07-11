import React, { useEffect, useState } from "react";
import Amplify, { Auth, Hub } from "aws-amplify";
import awsconfig from "./aws-exports";

// settings
Amplify.configure(awsconfig);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI": {
          getUser().then((userData) => {
            setUser(userData);
          });
          break;
        }
        case "signOut":
          setUser(null);
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data);
          break;
      }
    });

    getUser().then((userData) => {
      setUser(userData);
    });
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => {
        return userData;
      })
      .catch(() => console.log("Not signed in"));
  }
  function getEmail() {
    try {
      return JSON.stringify(
        user["signInUserSession"]["idToken"]["payload"]["email"]
      );
    } catch (e) {}
  }
  function getToken() {
    try {
      return user["signInUserSession"]["idToken"]["jwtToken"];
    } catch (e) {}
  }

  return (
    <div>
      <p>User: {user ? getEmail() : "None"}</p>
      {user ? (
        <div>
          <button onClick={() => Auth.signOut()}>Sign Out</button>
        </div>
      ) : (
        <button onClick={() => Auth.federatedSignIn()}>
          Federated Sign In
        </button>
      )}
      <h3>token</h3>
      {getToken()}
    </div>
  );
}

export default App;
