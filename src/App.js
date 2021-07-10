import Amplify from "aws-amplify";

Amplify.configure({
  aws_project_region: process.env.REACT_APP_AWS_PROJECT_REGION,
  aws_cognito_region: process.env.REACT_APP_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.REACT_APP_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_AWS_USER_POOLS_CLIENT_ID,
});

const App = () => {
  const profiles = [
    { name: "1", age: 1 },
    { name: "2", age: 2 },
  ];
  return (
    <div>
      {profiles.map((profile) => {
        return <User name={profile.name} age={profile.age} />;
      })}
    </div>
  );
};
const User = (props) => {
  return (
    <div>
      name = {props.name}, age = {props.age}{" "}
    </div>
  );
};

export default App;
