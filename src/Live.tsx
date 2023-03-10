import { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import axios from "axios";
import Player from "./Player";

const Live = ({ user }) => {
  const [urls, setUrls] = useState<string[]>([]);
  const getToken = () => {
    try {
      return user["signInUserSession"]["idToken"]["jwtToken"];
    } catch (e) {}
  };

  const notAuthenticated = <Alert variant="danger">権限がありません</Alert>;

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
        setUrls([]);
        console.log(error.response);
      });
  };

  return (
    <>
      {user &&
        (urls ? (
          <>
            <div>
              <h2 style={{ marginTop: "40px" }}>Live</h2>
              <Button
                variant="primary"
                style={{ margin: "20px" }}
                onClick={getUrls}
              >
                Reload
              </Button>
              <div className="row loader"></div>
              {urls ? (
                urls.map((url) => <Player src={url} key={url} />)
              ) : (
                <span> No videos </span>
              )}
            </div>
          </>
        ) : (
          notAuthenticated
        ))}
      <h3>Demo stream</h3>
      <Player
        src={
          "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
        }
      />
    </>
  );
};

export default Live;
