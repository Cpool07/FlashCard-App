import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api/index";

export default function ShowDecks() {
    const [ decks, setDecks ] = useState([]);
    const history = useHistory();
    

    useEffect(() => {
        const getDecks = async () => {
            const response = await listDecks();
            setDecks(response);
        }
        getDecks();
    }, [])
    console.log(decks);
    
    const deckList = decks.map((deck) => {
        const cards = deck.cards;

        const handleDelete = async () => {
            if(window.confirm("Are you sure you want to delete this deck? You will not be able to recover it once deleted.")) {
                await deleteDeck(deck.id);
                history.go();
            } else {
                history.go();
            }
        }    
            
        return (
            <div className="col-sm-6" key={deck.id}>
              <div className="card">
                <div className="card-body">
                  <div className='d-flex justify-content-between'>
                    <h5 className="card-title">{deck.name}</h5>
                    <p>{`${cards.length} cards`}</p>
                  </div>
                  <p className="card-text">{deck.description}</p>
                  <div className="d-flex justify-content-between">
                    <div>
                      <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-1">View</Link>
                      <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
                    </div>
                    <div>
                      <button className="btn btn-danger" onMouseDown={(event) => event.target.parentElement.parentElement.parentElement.style.backgroundColor = "#E8eff1"} onClick={handleDelete}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )
        })
        
        return (
          <div className="row">
            {deckList}
          </div>
        )
      }