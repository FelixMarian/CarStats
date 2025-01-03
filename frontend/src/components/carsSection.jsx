import "../styles/components/carsSection.css"
import axios from "axios";
import {useEffect, useState} from "react";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function CarsSection({loadExpenses}) {
    const [cars, setCars] = useState([]);
    const [reloadCars, setReloadCars] = useState(false);
    const [deletedCars, setDeletedCars] = useState(false);
    const [carName, setCarName] = useState("");
    const [totalSpent, setTotalSpent] = useState(0);

    const navigate = useNavigate();

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

    async function addCar(prop){
        try{
            const name = prop;
            const response = await axios.post("https://localhost:7178/addCar",{
                car_name: name,
                player_uuid: sessionStorage.getItem("player_uuid")
            },{headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true});

            if(response.status==200){
                sessionStorage.setItem("selected_car_name", response.data.car_name);
                sessionStorage.setItem("selected_car_id", response.data.id);
                setReloadCars(!reloadCars);

            }
        }catch (err){
            console.log(err);
        }
    }

    async function totalSpentF(){
            const selected_car_id = sessionStorage.getItem("selected_car_id");
            const response = await axios.get(`https://localhost:7178/totalSpent/${selected_car_id}`,{
            }, {headers: {
                "Content-Type": "application/json"
                }});
        setTotalSpent(response.data);
    }

    useEffect(() => {
        getCars();
    }, [reloadCars,deletedCars]);


    return (
        <>
            <div className="list-group">
                {cars.map((item, index) => (
                    <div className="car_info">
                        <button key={index} type="button" className="list-group-item list-group-item-action"
                                aria-current="true" onClick={() => {
                            sessionStorage.setItem("selected_car_id", cars[index].id)
                            sessionStorage.setItem("selected_car_name", cars[index].name)
                            loadExpenses(cars[index].id)
                            totalSpentF()
                        }}>
                            {item.car_name}
                        </button>
                        <button className="deleteBtn" onClick={() => {
                            deleteCar(cars[index].id)
                            sessionStorage.removeItem("selected_car_id")
                            sessionStorage.removeItem("selected_car_name")
                        }}><i className="fa fa-trash-o"></i></button>

                    </div>

                ))}
                {cars.length < 3 ?
                    <div className="addCarSection">
                        <input type="text" className="addInput"  value={carName} placeholder="Car name"
                        onChange={event => {setCarName(event.target.value)}}></input>
                        <button className="addBtn" onClick={()=>{
                            addCar(carName)
                            setCarName("")}}>Add Car</button>
                    </div>: null}

                <div className="totalSpent">
                    <label className="totalSpentLabel">Total spent: {totalSpent}</label>
                    <button type="button" className="btn btn-default btn-sm" onClick={()=>{
                        navigate('/login')
                        sessionStorage.clear()
                    }}>
                        <span className="glyphicon glyphicon-log-out"></span> Log out
                    </button>
                </div>
            </div>
        </>
    );
}

export default CarsSection;