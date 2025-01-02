import "../styles/dashboard.css"
import TitleLabe from "../components/titleLabe.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import CarsSection from "../components/carsSection.jsx";
import carsSection from "../components/carsSection.jsx";

function dashboard() {
    const [username, setUsername] = useState("");
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState(false);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);


    async function getExpenses(prop){
        try{
            const car_id = prop;
            const response = await axios.get(`https://localhost:7178/getExpenses/${car_id}`, {
            }, {headers: {
                "Content-Type": "application/json"
                }}
            );
            setExpenses(response.data);
        } catch (err){
            console.log(err);
        }
    }


    useEffect(() => {
        setUsername(sessionStorage.getItem("username"));
    }, []);


    useEffect(() => {
        getExpenses(sessionStorage.getItem("selected_car_id"));
    }, [newExpense]);

    async function addExpense(){
        try{
            const car_id = sessionStorage.getItem("selected_car_id");
            const response = await axios.post("https://localhost:7178/addExpense",{
                car_id: car_id,
                title: title,
                price: price
            },{headers: {
                "Content-Type": "application/json"
                }});
            setNewExpense(!newExpense);
        } catch (err){
            console.log(err);
        }
    }

    return(
        <>
        <div className="container">
            <div className="content">
            <div className="info">
                <TitleLabe title="Info"/>
                <label>Username: {username}</label>
                {}
                <CarsSection loadExpenses={getExpenses} />
            </div>

                <div className="stats">
                    <TitleLabe title="Expenses"/>
                    <table>
                        <tr>
                            <th>Title</th>
                            <th>Date Added</th>
                            <th>Price</th>
                        </tr>
                        {expenses.map((item, index) => (
                            <tr key={index}>
                                <td>{item.title}</td>
                                <td>{item.date}</td>
                                <td>{item.price}</td>
                            </tr>
                        ))}
                    </table>
                    <div className="expensesDetailsSection">
                        <input type="text" className="addInputExpense" value={title} placeholder="Title"
                               onChange={event => {
                                   setTitle(event.target.value)
                               }}></input>
                        <input type="number" className="addInputExpense" value={price} placeholder="0"
                               onChange={event => {
                                   setPrice(event.target.value)
                               }}></input>
                        <button className="addExp" onClick={()=>{
                            addExpense();
                            setPrice(0);
                            setTitle("");
                        }}>
                           Add</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default dashboard;