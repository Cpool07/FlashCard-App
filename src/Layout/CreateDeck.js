import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api/index";

export default function CreateDeck() {
    //Create initial form state variable
    const initialState = {
            name: "",
            description: "",
    };

    //default state to the initialState variable
    const [ newDeck, setNewDeck ] = useState(initialState);

    //update and set newDeck variable with target values when changed
    function handleChange({ target }) {
        setNewDeck({...newDeck, [target.name]: target.value,})
    };

    const history = useHistory();

    //use createDeck from utils/api/index to save the new deck to the database when submitted
    //use history hook to send user to homepage once newDeck has been submitted to database
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await createDeck(newDeck);
        history.push("/");
        return response;
    }
    
    async function handleCancel() {
        history.push("/");
    }

    return (
        <React.Fragment>
         <div>
        {/* breadcrumb/ nav bar for Home and Create Deck */}
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to={"/"}>
                        Home
                    </Link>
                </li>
                <li className="breadcrumb-item active">
                    Create Deck
                </li>
            </ol>
            {/* create a form with Name and Description text fields */}
            <form onSubmit={(event) => handleSubmit(event)}>
                <h1>
                  Create Deck
                </h1>
                <div className="form-group">
                    <label htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={newDeck.name}
                        placeholder="Deck Name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={newDeck.description}
                        placeholder="Deck Description"
                    />    
                </div>
                <button className="btn btn-secondary" onClick={() => handleCancel()}>
                    Cancel    
                </button>
                <button className="btn btn-primary" type="submit">
                    Submit    
                </button> 
            </form>
         </div>
        </React.Fragment> 
    );
}