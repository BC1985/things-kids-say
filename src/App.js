import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ContextProvider } from "./Context";
import Nav from "./components/Nav/Nav";
import AddQuote from "./components/AddQuote/AddQuote";
import FullList from "./components/FullList/FullList";
import LandingPage from "./components/LandingPage/LandingPage"
import RandomQuote from "./components/RandomQuote/RandomQuote";
import SignIn from "./components/Sign-In/Sign-in";

function App() {

  const [isSignedIn, setIsSignedIn] = useState(false)
  return (
    <Router>
      <Nav isLoggedIn={isSignedIn} />
      <Switch>
        <ContextProvider>
          <Route exact path="/" component={LandingPage} />
          <Route path="/list" component={FullList} />
          <Route path="/random" component={RandomQuote} />
          <Route path="/add" component={AddQuote} />
          <Route path="/sign-in" component={SignIn} />
        </ContextProvider>
      </Switch>
    </Router>
  );
}

export default App;
