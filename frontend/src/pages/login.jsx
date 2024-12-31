import "../styles/login.css";
import {useState} from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import TitleLabe from "../components/titleLabe.jsx";

function login(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();


    async function loginAcount() {
        try {
            const response = await axios.post("https://localhost:7178/loginAccount", {
                email: email,
                password: password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });


            if(response.status === 200) {
                sessionStorage.setItem("email", email);
                sessionStorage.setItem("uuid", response.data.id);
                sessionStorage.setItem("username", response.data.username);
                navigate("/dashboard");
            }
        } catch (err) {
            console.log(err);
        }

    }


    return(
        <>
        <div className="container">
            <div className="login-wrap">
                <TitleLabe title={"Sign in"} />
                <div className="login-input">
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" value={email} id="floatingInput" placeholder="Email address"
                        onChange={event => setEmail(event.target.value)}/>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" value={password} id="floatingPassword" placeholder="Password"
                        onChange={event => setPassword(event.target.value)}/>
                    </div>
                </div>
                <button type="button" className="btn btn-outline-primary" onClick={loginAcount}>Sign in</button>
                <a href="/register">Sign up</a>
            </div>
        </div>
        </>
    );
}

export default login;