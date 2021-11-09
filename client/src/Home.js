import React from 'react';
import NavBar from "./NavBar";
import { Redirect } from 'react-router-dom';

function Home({ authorized }){
    if (authorized === false) {
        console.log(authorized);
        return <Redirect to ="/" />;
    }
    return (
        <div>
            <NavBar />
            <h1>This is the Home Page! You have successfully logged in!</h1>
        </div>
    );
}

export default Home;