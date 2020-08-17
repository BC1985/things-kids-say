import React, { useState, useEffect } from "react";
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
import Login from "./components/Login/login";

function App() {

  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    const userAlreadyLoggedIn = localStorage.getItem('jwt token')
    if (userAlreadyLoggedIn) {
        setIsSignedIn(true)            
    }
  }, []);

  function logInUser(){
    setIsSignedIn(true)    
  }
  return (
    <Router>
      <Nav isSignedIn={isSignedIn} />
      <Switch>
        <ContextProvider>
          <Route exact path="/" component={LandingPage} />
          <Route path="/list" component={FullList} />
          <Route path="/random" component={RandomQuote} />
          <Route path="/add" component={AddQuote} />
          <Route path="/signup" 
            render={(props)=>(
              <SignIn {...props} logInUser={logInUser} isSignedIn={isSignedIn}/>
            )}
          />
          <Route path="/login" component={Login} />
        </ContextProvider>
      </Switch>
    </Router>
  );
}

export default App;
