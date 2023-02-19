import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import SubMenu from "./SubMenu.js";
import { IconContext } from "react-icons/lib";
import axios from "axios";
import Tendina from "./Tendina.js";
import { getAuthcredential } from "../pages/AuthHandler.js";
import "./facciauno.png";
const mongoose = require("mongoose");

const Nav = styled.div`
  background: #7998f5;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #000000;
`;

const SidebarNav = styled.nav`
  background: #7070db;
  width: 400px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = ({ activeNote, setActiveNote }) => {
  const [sidebar, setSidebar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [folders, setFolders] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        let userInfo = await getAuthcredential();

        var id = mongoose.Types.ObjectId(userInfo.user.userId);
        console.log(id);

        const response = await axios.get(
          `http://localhost:8080/enclosure/user/` + id
        );
        setFolders(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFolders();
  }, []);

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#00000" }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>

          <h1
            style={{
              textAlign: "center",
              marginLeft: "200px",
              color: "#000000",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            Friendly Note
          </h1>
          <Tendina />
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {folders?.map((item, index) => {
              return (
                <SubMenu
                  item={item}
                  activeNote={activeNote}
                  setActiveNote={setActiveNote}
                  key={index}
                />
              );
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
