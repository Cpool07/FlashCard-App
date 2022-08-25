import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "./CreateDeck";
import ViewDeck from "./ViewDeck";
import Study from "./Study";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import { Switch, Route } from "react-router-dom";


function Layout() {

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
              <Home />
          </Route>
          <Route path="/decks/new">
              <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
              <ViewDeck />
          </Route>
          <Route path="/decks/:deckId/study">
              <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
              <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
              <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
              <EditCard />
          </Route>
          <NotFound />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
