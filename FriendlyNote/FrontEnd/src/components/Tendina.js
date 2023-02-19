import React, { useState } from "react";
import "../Tendina.css";
import { logout } from "../pages/AuthHandler.js";
import facciauno from "./facciauno.png";
import axios from "axios";
import { getAuthcredential } from "../pages/AuthHandler.js";

const Tendina = () => {
  const newEnclosure = async () => {
    try {
      let user = await getAuthcredential();

      const enclosureTitle = window.prompt(
        "Enter the title of the new enclosure:"
      );
      if (enclosureTitle) {
        const response = await axios
          .post("http://localhost:8080/enclosure/" + user.user.userId, {
            name: enclosureTitle,
          })
          .then((res) => {
            console.log(res);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div class="dropdown" style={{ zIndex: 40 }}>
      <button class="dropbtn">
        <img src="facciauno"></img>
      </button>
      <div class="dropdown-content">
        <a href="/" onClick={logout}>
          Log out
        </a>
        <a href="/Condividi">Condividi argomenti</a>
        <a href="#" onClick={newEnclosure}>
          Nuovo argomento
        </a>
      </div>
    </div>
  );
};

export default Tendina;
