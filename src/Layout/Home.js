import React from "react";
import CreateDeckBtn from "./CreateDeckBtn";
import ShowDecks from "./ShowDecks"


export default function Home() {
    return (
        <div className="container">
            <CreateDeckBtn />
            <ShowDecks />
        </div>
    )
}