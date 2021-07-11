import React, { useEffect, useState } from "react";
import Amplify, { Auth, Hub } from "aws-amplify";

Amplify.configure({
  Auth: {
    region: "ap-northeast-1", //process.env.REACT_APP_AWS_COGNITO_REGION,
    userPoolId: "ap-northeast-1_T9t0ZjajV", //process.env.REACT_APP_AWS_USER_POOLS_ID,
    userPoolWebClientId: "6i67no96drvb941gajdt3lfv7f", //process.env.REACT_APP_AWS_USER_POOLS_CLIENT_ID,
  },
});
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          getUser().then((userData) => setUser(userData));
          break;
        case "signOut":
          setUser(null);
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data);
          break;
        default:
          console.warn("unexpected state");
      }
    });

    getUser().then((userData) => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log("Not signed in"));
  }

  return (
    <div>
      <p>User: {user ? JSON.stringify(user.attributes) : "None"}</p>
      {user ? (
        <button onClick={() => Auth.signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => Auth.federatedSignIn()}>
          Federated Sign In
        </button>
      )}
    </div>
  );
}

export default App;
