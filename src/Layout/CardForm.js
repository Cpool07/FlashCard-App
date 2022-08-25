import React from "react";
import { Link } from "react-router-dom";

export default function CardForm({submitForm, changeForm, card, deckId}) {
    return (
        <React.Fragment>
            <form id="cardForm" onSubmit={submitForm}>
                <div>
                    <label>
                        Front
                    </label>
                    <textarea   
                        id="front"
                        name="front"
                        className="form-control"
                        onChange={changeForm}
                        value={card.front}
                        placeholder="Frontside of Card"
                    />
                    <label>
                        Back
                    </label>
                    <textarea
                        id="back"
                        name="back"
                        className="form-control"
                        onChange={changeForm}
                        value={card.back}
                        placeholder={"Backside of Card"}   
                    />
                    <Link to={`/decks/${deckId}`} className="btn btn-secondary" name="cancel">
                        Done    
                    </Link>
                    <button className="btn btn-primary" type="submit">
                        Save
                    </button>  
                </div>
            </form>
        </React.Fragment>
    )
}