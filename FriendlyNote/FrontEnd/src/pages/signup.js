import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import immag from '../immagine.png'

import "../index.css";

const SignUp = () => {
    const [errorMessages, setErrorMessage] = useState({});
    const navigate = useNavigate();


    let handleSubmit = async (event) => {
        event.preventDefault();
        var { mail, pass } = document.forms[0];
        try {
            await fetch('http://localhost:8080/user/', {
                method: 'POST',
                body: JSON.stringify({
                    "mail": mail.value,
                    "password": pass.value
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'

                },
            }).then((response) => response.json())
            .then((data) => {
            if(data){
                    navigate("/")
            } else {
                setErrorMessage({name: 'mail', message:"email o password non corretta"});
            }
            });
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
                <p style = {{position:"center"}}>hai già un account?</p>
                <a href="/signup">vai al log in</a>
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
                <div className="title">Sign up</div>
                {renderForm}
            </div>
        </div>
    )
}
export default SignUp