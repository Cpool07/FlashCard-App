import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import CardForm from "./CardForm";

export default function AddCard() {
    //create a variable that is an object with empty keys to pass through as the original state of card
    const initialCardForm = {
        front:"",
        back:"",
        deckId:"",
    }

    //set original state of the deck to an empty array
    const [ deck, setDeck] = useState([]);
    //set original state of card to initialCardForm
    const [ card, setCard ] = useState(initialCardForm)

    const { deckId } = useParams();


    //Define signal since readDeck(deckId, signal) takes signal as a parameter
    useEffect(() => {
        const abortController = new AbortController();
        const deckInfo = async () => {
            const response = await readDeck(deckId, abortController.signal);
            setDeck(() => response)
            console.log(readDeck(deckId, abortController.signal))
        }
        deckInfo();
        return () => abortController.abort()
    }, [deckId])

    //changeForm is called anytime a change is present in CardForm for the front/back
    const changeForm= ({ target }) => {
        setCard({...card, [target.name]: target.value});
    }

    const submitForm = (event) => {
        event.preventDefault();
        //use setCard to add the new card to the deck
        setCard({...card, deckId: deckId})
        //use createCard from utils/api/index to make a post request to add the card to the deck
        createCard(deckId, card)
        //reset the decks inital state with initialCardForm variable
        console.log("submitForm saved");
        setCard(initialCardForm);
    }

    return (
     <React.Fragment>
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to={"/"}>
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>
                            {deck.name}
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}/cards/new`}>
                            Add Card
                        </Link>
                    </li>
                </ol>
            </nav>
            <div>
                <h1>
                    {deck.name}: Add Card
                </h1>
            </div>
            <CardForm submitForm={submitForm} changeForm={changeForm} card={card} deckId={deckId} />
        </div>
     </React.Fragment>
    )
}