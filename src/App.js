import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ContextProvider } from "./Context";
import Nav from "./components/Nav/Nav";
import AddQuote from "./components/AddQuote/AddQuote";
import FullList from "./components/FullList/FullList";
import LandingPage from "./components/LandingPage/LandingPage";
import RandomQuote from "./components/RandomQuote/RandomQuote";
import SignIn from "./components/Sign-In/Sign-in";
import Login from "./components/Login/login";
import ErrorBoundary from "./components/ErrorBoundary";
import EditQuote from "./components/EditQuote/EditQuote";
import MyQuotes from "./components/MyQuotes/MyQuotes";
import SideNav from "./components/Sidenav/Sidenav";
import Settings from "./components/settings/Settings";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  useEffect(() => {
    const userAlreadyLoggedIn = localStorage.getItem("jwt token");
    if (userAlreadyLoggedIn) {
      setIsSignedIn(true);
    }
  }, []);

  const logInUser = () => {
    setIsSignedIn(true);
  };

  const logOut = () => {
    setIsSignedIn(false);
    localStorage.removeItem("jwt token");
    toggleSideNav();
  };
  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const navProps = {
    logOut,
    logInUser,
    isSideNavOpen,
    toggleSideNav,
    isSignedIn,
  };
  const loginProps = {
    isSignedIn,
    logInUser,
  };

  return (
    <Router>
      <ErrorBoundary>
        <Switch>
          <ContextProvider>
            <SideNav {...navProps} />
            <Nav {...navProps} />
            <Route exact path="/" component={LandingPage} />
            <Route path="/list" component={FullList} />
            <Route
              path="/edit/:id"
              render={props => <EditQuote {...props} />}
            />
            <Route path="/random" component={RandomQuote} />
            <Route
              path="/add"
              render={props => {
                return isSignedIn ? (
                  <AddQuote {...props} isSignedIn={isSignedIn} />
                ) : (
                  <Login logInUser={logInUser} />
                );
              }}
            />
            <Route path="/signup" render={() => <SignIn {...loginProps} />} />
            <Route path="/login" render={(props) => <Login {...props}{...loginProps} />} />
            <Route path="/settings/user/:id" render={(props) => <Settings {...props} {...loginProps} />} />
            <Route
              path="/my_quotes/user/:id"
              render={props => <MyQuotes {...props} isSignedIn={isSignedIn} />}
            />
          </ContextProvider>
        </Switch>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
