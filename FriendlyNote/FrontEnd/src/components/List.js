import { React, useState } from 'react'
import axios from 'axios';
import { getAuthcredential } from "../pages/AuthHandler.js";
import mongoose from 'mongoose';

function List(props) {
    const [searcheFolders, setSearchedFolders] =useState([]);
    const data = async () => {
        try {
        let userInfo = await getAuthcredential();
        
        
        var id = mongoose.Types.ObjectId(userInfo.user.userId);
        console.log(id);
        
        const response = await axios.get(`http://localhost:8080/enclosure/user/`+id);
        setSearchedFolders(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    //create a new array by filtering the original array
    const filteredData = data.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    return (
        <ul>
            {filteredData.map((item) => (
                <li key={item.id}>{item.text}</li>
            ))}
        </ul>
    )
}

export default List
