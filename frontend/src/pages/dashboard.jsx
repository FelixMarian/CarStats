import "../styles/dashboard.css"
import TitleLabe from "../components/titleLabe.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import CarsSection from "../components/carsSection.jsx";

function dashboard() {
    const [username, setUsername] = useState("");

   async function addCar(){
        try{
            const response = await axios.post("https://localhost:7178/addCar",{
                car_name: "masina",
                player_uuid: sessionStorage.getItem("player_uuid")
            },{headers: {
                "Content-Type": "application/json"
                },
            withCredentials: true});
            if(response.status==200){
                console.log(response.data);
                sessionStorage.setItem("car_name", response.data.car_name);
                sessionStorage.setItem("car_id", response.data.id);
            }
        }catch (err){
            console.log(err);
        }
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
                <CarsSection/>
                <button onClick={addCar}>APASA</button>
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