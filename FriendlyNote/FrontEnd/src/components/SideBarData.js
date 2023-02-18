import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import axios from 'axios';

const fetchFolders = async (userId) => {
    try {
        const response = await axios.get('http://localhost:8080/enclosure/user/:userId');
        const data = response.data;
    } catch (error) {
        console.error(error);
    }
}

export default fetchFolders;