import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";

export default function ViewDeck() {
    const history = useHistory();
    const { deckId } = useParams();

    const [deck, setDeck] = useState(null);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        // create function that calls on readDeck from utils/api/index.js, which retrieves the deck with the specified `deckId`
        async function getDeck() {
            const response = await readDeck(deckId);
            setDeck(response);
            setCards(response.cards);
        }
        getDeck();
        // function is called everytime 'deckId' changes
    }, [deckId]);


    async function handleDeleteDeck(deck) {
        if (window.confirm("Delete this deck? You will not be able to recover it once deleted.")){
            await deleteDeck(deck.id);
            // redirect to the home page if deleted
            history.push("/");
        } else {
            // if the delete is not confirmed, leave the deck as is and remain on the same page
            history.go();
        }
    }

    async function handleDeleteCard(card) {
        if (window.confirm("Delete this card? You will not be able to recover it once deleted.")){
            await deleteCard(card.id);
            history.go();
        } else {
            history.go();
        }
    }

    async function handleEditDeck() {
        history.push(`/decks/${deckId}/edit`);
    }

    async function handleStudy() {
        history.push(`/decks/${deckId}/study`);
    }

    async function handleEditCard(card) {
        history.push(`/decks/${deckId}/cards/${card.id}/edit`);
    }

    async function handleAddCard() {
        history.push(`/decks/${deckId}/cards/new`);
    }

    

    // If there are no decks or no cards, return null
    if(!deck || !cards) {
        return null;
    } else {
        return (
            <div className="col-9 mx-auto">
              {/* a navigation bar with the following links */}
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  {/* a link to the home page */}
                  <li className="breadcrumb-item">
                    <Link to={"/"}>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">{deck.name}</li>
                </ol>
              </nav>
              <div className="card border-0 mb-4">
                <div className="card-body">
                  {/* deck name */}
                  <div className="row px-3">
                    <h5 className="card-title">{deck.name}</h5>
                  </div>
                  {/* deck description */}
                  <p className="card-text">{deck.description}</p>
                  <div className="row px-3">
                    {/* edit button */}
                    <button className="btn btn-secondary" onClick={() => handleEditDeck()}>
                      Edit
                    </button>
                    {/* study button */}
                    <button className="btn btn-primary ml-2" onClick={() => handleStudy()}>
                      Study
                    </button>
                    {/* add cards button */}
                    <button className="btn btn-primary ml-2" onClick={() => handleAddCard()}>
                      Add Cards
                    </button>
                    {/* delete button */}
                    <button onClick={() => handleDeleteDeck(deck)} className="btn btn-danger ml-auto">
                     Delete
                    </button>
                  </div>
                </div>
              </div>
              {/*container holding all cards with front/back, an edit button, and a delete button */}
              <div className="row pl-3 pb-2">
                <h1>Cards</h1>
              </div>
              {cards.map((card, index) => (
                <div className="row" key={index}>
                  <div className="col">
                    <div className="card">
                      <div className="row card-body">
                        {/* front */}
                        <p className="col-6 card-text">{card.front}</p>
                        {/* back */}
                        <p className="col-6 card-text">{card.back}</p>
                      </div>
                      <div className="d-flex justify-content-end p-2">
                        {/* edit button */}
                        <button onClick={() => handleEditCard(card)} className="btn btn-secondary">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteCard(card)} className="btn btn-danger ml-2">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
              )
          }
      }