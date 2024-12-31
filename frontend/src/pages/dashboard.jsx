import "../styles/dashboard.css"
import TitleLabe from "../components/titleLabe.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

function dashboard() {
    const [username, setUsername] = useState("");

   async function loadUser(){

   }

    useEffect(() => {

        setUsername(sessionStorage.getItem("username"));
    }, []);

    return(
        <>
        <div className="container">
            <div className="content">
            <div className="info">
                <TitleLabe title="Info"/>
                Username: {username}
            </div>
            <div className="stats">
                <TitleLabe title="Expenses"/>
            </div>
            </div>
        </div>
        </>
    );
}

export default dashboard;