import React, { useEffect, useState } from "react";
import Amplify, { Auth, Hub } from "aws-amplify";
import awsconfig from "./aws-exports";
import { Button, Alert } from "react-bootstrap";
import axios from "axios";
import Player from "./Player";

Amplify.configure(awsconfig);
function App() {
  const [user, setUser] = useState(null);
  const [urls, setUrls] = useState(null);

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

  const getUrls = () => {
    const token = getToken();
    axios
      .get("https://api.oyukimaru.com/videos", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        setUrls(res["data"]["videos"]);
        console.warn(urls);
      })
      .catch((error) => {
        setUrls("not authenticated");
        console.log(error.response);
      });
  };

  const notAuthenticated = <Alert variant="danger">権限がありません</Alert>;

  return (
    <div>
        <div class="header">
          <div class="logo">YukiChannel</div>
          <nav>
          <ul class="list">
            <li class="normal">user: {user ? getEmail() : "None"}</li>
            <li class="button">
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
          
          </li>
          </ul>
          </nav>
        </div>
      <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
      <div className="container mb-3">
        {user ? (
          urls !== "not authenticated" ? (
            <>
              <div>
                <h2 style={{ marginTop: "80px" }}>Live</h2>
                <Button
                  variant="primary"
                  style={{ margin: "20px" }}
                  onClick={getUrls}
                >
                  Reload
                </Button>
                <div className="row loader"></div>
                {urls
                  ? urls.map((url) => <Player src={url} key={url} />)
                  : "no videos"}
              </div>
            </>
          ) : (
            notAuthenticated
          )
        ) : (
          <div></div>
        )}
        <h2 style={{ marginTop: "80px" }}>諭吉動画リスト</h2>
        <iframe
          width="664"
          height="380"
          src="https://www.youtube.com/embed/B9krT5Lq-1U?list=PLBn82aS9YRQJ3Apw0cLYCBfC-vOCU5BkG"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default App;
