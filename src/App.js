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
