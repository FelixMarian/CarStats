import "../styles/components/carsSection.css"
import axios from "axios";
import {useEffect, useState} from "react";
import { IoIosClose } from "react-icons/io";

function CarsSection({loadExpenses}) {
    const [cars, setCars] = useState([]);
    const [reloadCars, setReloadCars] = useState(false);
    const [deletedCars, setDeletedCars] = useState(false);

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

    async function deleteCar(prop){
        try{
            const id = prop;
            const response = await axios.delete(`https://localhost:7178/deleteCar/${id}`,{
            })
            setDeletedCars(!deletedCars);
        } catch (err){
            console.log(err);
        }
    }

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
                sessionStorage.setItem("car_name", response.data.car_name);
                sessionStorage.setItem("car_id", response.data.id);
                setReloadCars(!reloadCars);

            }
        }catch (err){
            console.log(err);
        }
    }
    useEffect(() => {
        getCars();
    }, [reloadCars,deletedCars]);

    function handleClick(){

    }

    return (
        <>
            <div className="list-group">
                {cars.map((item, index) => (
                    <div className="car_info">
                        <button key={index} type="button" className="list-group-item list-group-item-action"
                                aria-current="true" onClick={() => {
                            sessionStorage.setItem("selected_car_id", cars[index].id)
                            loadExpenses(cars[index].id)
                        }}>
                            {item.car_name}
                        </button>
                        <button className="deleteBtn" onClick={() => {
                            deleteCar(cars[index].id)
                        }}><i className="fa fa-trash-o"></i></button>

                    </div>

                ))}

                {cars.length < 3 ?
                    <button type="button" className="list-group-item list-group-item-action" aria-current="true"
                            onClick={addCar}>
                        Add car
                    </button> : null}
            </div>
        </>
    );
}

export default CarsSection;