import "../styles/dashboard.css"
import TitleLabe from "../components/titleLabe.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import CarsSection from "../components/carsSection.jsx";

function dashboard() {
    const [username, setUsername] = useState("");



    useEffect(() => {

        setUsername(sessionStorage.getItem("username"));
    }, []);

    return(
        <>
        <div className="container">
            <div className="content">
            <div className="info">
                <TitleLabe title="Info"/>
                <label>Username: {username}</label>
                <CarsSection/>
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