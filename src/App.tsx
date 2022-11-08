import React from "react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Home from "./Home";
import "./index.css";

function App() {
  return (
    <main>
      <h1>Auth0 login</h1>
      <Home />
      <LoginButton />
      <LogoutButton />
    </main>
  );
}

export default App;
