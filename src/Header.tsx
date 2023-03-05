import { Button } from "react-bootstrap";
import { Auth } from "aws-amplify";
const Header = ({ user }) => {
  const getEmail = () => {
    try {
      return JSON.stringify(
        user["signInUserSession"]["idToken"]["payload"]["email"]
      );
    } catch (e) {
      return "";
    }
  };

  return (
    <>
      <div className="header">
        <div className="logo">YukiChannel</div>
        <nav>
          <ul className="list">
            {
              user && <li className="normal">user: { getEmail() }</li>
            }
            <li className="button">
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
                  Sign In
                </Button>
              )}

            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Header
