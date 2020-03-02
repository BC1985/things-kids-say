import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ContextProvider } from "./Context";
import Nav from "./components/Nav/Nav";
import AddQuote from "./components/AddQuote/AddQuote";
import FullList from "./components/FullList/FullList";
import LandingText from "./components/LadingPage/LandingPage";
import RandomQuote from "./components/RandomQuote/RandomQuote";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <ContextProvider>
          <Route exact path="/" component={LandingText} />
          <Route path="/list" component={FullList} />
          <Route path="/random" component={RandomQuote} />
          <Route path="/add" component={AddQuote} />
        </ContextProvider>
      </Switch>
    </Router>
  );
}

export default App;
