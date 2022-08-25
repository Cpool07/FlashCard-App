import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index"

export default function EditDeck() {
    //Create initial form state variable
    const initialFormState = {
        name: "",
        description: "",
    };

    //default state to the initialFormState variable
    const [ editDeck, setEditDeck ] = useState(initialFormState);
    const { deckId } = useParams();
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        const deckInfo = async () => {
            const response = await readDeck(deckId, abortController.signal)
            setEditDeck(() => response);
        }
        deckInfo();
        return () => abortController.abort()
        //function is called everytime 'deckId' changes
    }, [deckId])

     //update and set editDeck variable with target values when changed
    const changeForm = ({ target }) => {
        setEditDeck({...editDeck, [target.name]: target.value});
    }

     //use updateDeck from utils/api/index to save the edited deck to the database when submitted
    //use history hook to send user to the edited deck once it has been submitted to database
    const submitForm= async (event) => {
        event.preventDefault();
        const response = await updateDeck(editDeck);
        history.push(`/decks/${response.id}`);
    }

    if(!editDeck) {
        return null
    } else {
        return (
            <div className="col-9 mx-auto">
                {/* navigation bar */}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/"}>
                                Home
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}>
                                {editDeck.name}
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            Edit Deck
                        </li>
                    </ol>
                </nav>
                <div className="row pl-3 pb-2">
                    <h1>Edit Deck</h1>
                </div>
                {/* submit form */}
                <form onSubmit={submitForm}>
                    <div className="form-group">
                        <label>Name</label>
                        <input 
                        type="text" 
                        name="name"
                        value={editDeck.name}
                        onChange={changeForm}
                        id="name" 
                        className="form-control" 
                        placeholder={editDeck.name} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                        name="description" 
                        value={editDeck.description}
                        onChange={changeForm}
                        className="form-control" 
                        id="description" 
                        placeholder={editDeck.description}
                        rows={4}
                        />
                    </div>
                    <Link to={`/decks/${deckId}`} name="cancel" className="btn btn-secondary mr-3">
                        Cancel
                    </Link>
                    {/* submit button */}
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}