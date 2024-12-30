import "../styles/register.css";
import { useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import {useNavigate} from "react-router-dom";


function register(){
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [user, setUser] = useState("");

    const navigate = useNavigate();


    async function creataAcc(){

        try{
            const response = await axios.post("https://localhost:7178/registerAccount", {
                    email: mail,
                    username: user,
                    password: bcrypt.hashSync(pass,10)
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            //If register was made, redirect
            if(response.status === 200)
                navigate("/login");
        } catch (err) {
            console.log(err)
        }
    }


    return(
        <>
        <div className="container">
            <div className="register-wrap">
                <div className="sign_in">
                    <label className="label">Sign up</label>
                </div>
                <div className="register-input">
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" value = {mail} placeholder="Email address"
                        onChange = {event => setMail(event.target.value)}/>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" value = {user} placeholder="Username"
                        onChange ={event => setUser(event.target.value)}/>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" value = {pass} placeholder="Password"
                        onChange={event => setPass(event.target.value)}/>
                    </div>
                </div>
                <button type="button" className="btn btn-outline-primary" onClick={creataAcc}>Sign un</button>
                <a href="/login">Sign in</a>
            </div>
        </div>
        </>
    );
}

export default register;