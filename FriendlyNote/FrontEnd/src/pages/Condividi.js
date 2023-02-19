import React, { useState, useEffect } from "react";
import axios from 'axios';
import {setAuthcredential , getAuthcredential} from "../pages/AuthHandler.js";
import immagine from '../immagine.png';
const mongoose = require('mongoose');


const Condividi = () => {
    const [folders, setFolders] = useState([]);
    const [activeFolder, setActiveFolder] = useState({content: '' });

    let handleSubmit = async (event) => {
        event.preventDefault();
        let FolderId = activeFolder._id;
        console.log(FolderId)
        var { mail }= document.forms[0];
        await axios.put(`http://localhost:8080/enclosure/share`, { mail: mail.value , enclosure: FolderId})
        .then((res, err) => {
            if(err) console.log("peni");
        })
    }
    
    useEffect(() => {
        
        const fetchFolders = async () => {
          try {
            let userInfo = await getAuthcredential();
            var id = mongoose.Types.ObjectId(userInfo.user.userId);
            const response = await axios.get(`http://localhost:8080/enclosure/user/` + id);
            setFolders(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchFolders();
      }, []);
             
    const renderForm = (
        <div className="form">
        <form onSubmit={handleSubmit}>
        <img src = {immagine} className="dimensione"/>
            <div className="aaaaaaa">
                <div className="input-container">
                    <label>Scegli argomento:</label>
                    <select name="languages" id="lang">
                    <option value="select" >Select a topic</option>
                    {folders.map((item, index) => {
                        return <option key={index} 
                        value={item.name}
                        onClick={(event) =>{
                            event.preventDefault();
                            setActiveFolder(item)
                        }}>
                            {item.name}
                        </option>;
                    })}
                    </select>
                </div>
                <div className="input-container">
                <label>choose your mate</label>
                    <input type="text" name="mail" required />
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
            <div className="login-form-condividi">
                <div className="title">Condivisione file</div>
                {renderForm}
            </div>
        </div>
    )
}
export default Condividi