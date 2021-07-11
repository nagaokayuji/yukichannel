import React, { useEffect, useState } from "react";
import Amplify, { Auth, Hub } from "aws-amplify";
import awsconfig from "./aws-exports";
import { Button } from "react-bootstrap";
import axios from "axios";

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
        default:
          break;
      }
    });

    getUser().then((userData) => {
      setUser(userData);
    });
  }, []);

  const getUser = async () => {
    return Auth.currentAuthenticatedUser()
      .then((userData) => {
        return userData;
      })
      .catch(() => console.log("Not signed in"));
  };
  const getEmail = () => {
    try {
      return JSON.stringify(
        user["signInUserSession"]["idToken"]["payload"]["email"]
      );
    } catch (e) {}
  };
  const getToken = () => {
    try {
      return user["signInUserSession"]["idToken"]["jwtToken"];
    } catch (e) {}
  };

  const getUrls = async () => {
    const token = getToken();
    const response = axios.get("/videos", {
      headers: {
        Authorization: token,
      },
    });
    console.log(JSON.stringify(response));
    return JSON.stringify(response);
  };

  return (
    <div>
      <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
      <div className="container mb-3">
        <div style={{ display: "flex" }}>
          user: {user ? getEmail() : "None"}
          <div style={{ "margin-left": "40px" }}>
            {user ? (
              <Button
                variant="outline-secondary"
                onClick={() => Auth.signOut()}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="outline-primary"
                onClick={() => Auth.federatedSignIn()}
              >
                Federated Sign In
              </Button>
            )}
          </div>
        </div>
        <h2 style={{ "margin-top": "80px" }}>Live</h2>
        <Button variant="primary" style={{ margin: "20px" }} onClick={getUrls}>
          get session url
        </Button>
        <div className="row loader"></div>
        <video
          id="hlsjs"
          class="player"
          style={{ width: "100%", height: "auto", outline: "none" }}
          controls
          autoplay
        ></video>
        <h2 style={{ "margin-top": "80px" }}>諭吉動画リスト</h2>
        <iframe
          width="664"
          height="380"
          src="https://www.youtube.com/embed/B9krT5Lq-1U?list=PLBn82aS9YRQJ3Apw0cLYCBfC-vOCU5BkG"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export default App;
