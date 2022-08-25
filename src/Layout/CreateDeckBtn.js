import React from "react";
import { Link } from "react-router-dom";

export default function CreateDeckBtn() {
    return (
        <React.Fragment>
          <div className="row">
            <div className="col-sm-6">
                <Link to={"/decks/new"} className="btn btn-outline-primary">
                    <strong>
                        + Create Deck
                    </strong>
                </Link>
            </div>
          </div>
        </React.Fragment>
    )
}