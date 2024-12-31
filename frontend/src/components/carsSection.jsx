import "../styles/components/carsSection.css"
import axios from "axios";
import {useEffect, useState} from "react";

function CarsSection() {
    const [cars, setCars] = useState([]);

    async function getCars(){
        try{
            const response = await axios.post("https://localhost:7178/getCars",{
                player_id: sessionStorage.getItem("player_uuid")
            },{
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            setCars(response.data);


        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCars();
    }, []);

    return (
        <>
            <div className="list-group">
                {cars.map((item, index) => (
                    <button key={index} type="button" className="list-group-item list-group-item-action" aria-current="true">
                        {item.car_name}
                    </button>
                ))}
                <button type="button" className="list-group-item list-group-item-action active" aria-current="true">
                    The current button
                </button>

            </div>
        </>
    );
}

export default CarsSection;