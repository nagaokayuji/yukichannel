import { useEffect, useState } from "react";
import Amplify, { Auth, Hub } from "aws-amplify";
import awsconfig from "./aws-exports";
import Slide from "./Slide";
import Header from "./Header";
import Vlog from "./Vlog";
import Live from "./Live";
import Nav from "./Nav";
import Yuki from "./Yuki";

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

  return (
    <>
      <Header user={user} />
      <Slide />
      <Nav />
      <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
      <div className="container mb-3 mt-3">
        <div className="element" id="yuki"><Yuki /></div>
        <div className="element" id="vlog"><Vlog /></div>
        <div className="element" id="live"><Live user={user} /></div>
      </div>
      <div className="footer"> YukiChannel </div>
    </>
  );
}

export default App;
