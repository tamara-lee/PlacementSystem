import React from 'react';
import NavBar from "./NavBar";
import { Redirect } from 'react-router-dom';

function FAQ({ authorized }){
    if (authorized === false) {
        console.log(authorized);
        return <Redirect to ="/" />;
    }
    return (
        <div>
            <NavBar />
            <h1>This is the FAQ page!</h1>
        </div>
    );
}

export default FAQ;