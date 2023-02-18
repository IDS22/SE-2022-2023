import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import immag from '../immagine.png'
import axios from 'axios';
import "../index.css";
import {setAuthcredential , getAuthcredential} from './AuthHandler';



const Login = () => {
    const [errorMessages, setErrorMessage] = useState({});
    const navigate = useNavigate();


    let handleSubmit = async (event) => {
        event.preventDefault();
        var { mail, pass } = document.forms[0];
        try {
            await axios.post('http://localhost:8080/user/login', {mail: mail.value, password: pass.value}).then(  
                (res) => {
                    setAuthcredential(res.data.AccessToken);
                    console.log(res.data.login);
                    if(res.data.login){
                        navigate('/NoteList')
                    } else {
                        setErrorMessage({ name: "mail", message: "mail or password incorrect"});
                    };
                }
            )
          }
        catch (error) {
            console.error(error);
            setErrorMessage('An error occurred, please try again later');
        }
        
      }

      const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

    const renderForm = (
    <div className="form">
        <form onSubmit={handleSubmit}>
        <img src = {immag} alt = "Test Image" />
            <div className="aaaaaaa">
                <div className="input-container">
                    <label>Email</label>
                    <input type="text" name="mail" required /> 
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("mail")}
                </div>
                <div style={{position:"center"}}> 
                    <p style = {{position:"center"}}>Non hai un account? </p>
                    <a href="/signup">Registrati</a>
                </div>
                <div className="button-container"> 
                    <input type="submit"/>
                </div>
            </div>
        </form>
    </div>
    );


    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Sign In</div>
                {renderForm}
            </div>
        </div>
    )
}
export default Login