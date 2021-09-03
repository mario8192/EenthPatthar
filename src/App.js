import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(user);
  }, user);

  const logout = () => {
    //logout logic goes here
  };

  const handleLogin = () => {
    console.log("logging in");
    //login logic goes here
  };

  const handleSignup = () => {
    console.log("signing up");
    //signup logic goes here
  };

  return (
    <div className="App">
      <Navbar
        user={user}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        logout={logout}
      />
    </div>
  );
}

export default App;
