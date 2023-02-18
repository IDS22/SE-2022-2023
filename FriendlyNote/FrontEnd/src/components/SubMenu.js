import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NuovaNota from "./NuovaNota.png";
import DeleteFolder from "./delete-folder.svg";
import * as RiIcons from "react-icons/ri";
import AddNote from "../pages/AddNote.js";

const SidebarLink = styled(Link)`
  display: flex;
  color: #000000;
  background: #C0C0CE;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: #a6a6a6;
    border-left: 4px solid #0000ff;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #8c8c8c;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;

  &:hover {
    background: #1a53ff;
    cursor: pointer;
  }
`;

const SubMenu = ({ item, activeNote, setActiveNote }) => {
  const [subnav, setSubnav] = useState(false);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const showSubnav = () => setSubnav(!subnav);

  const handleNewNote = async () => {
    const noteTitle = window.prompt("Enter the title of the new note:");

    if (noteTitle) {
      try {
        const response = await axios.post(`http://localhost:8080/note/${item._id}`, { title: noteTitle });
        setNotes([...notes, response.data]);
      } catch (error) {
        console.error(error);
      }
    }
  };


    const handleEnclosureDelete = async () => {
      try {
        const response = await axios.delete(`http://localhost:8080/enclosure/${item._id}`);
        console.log(response);
        navigate('/Notelist');
      } catch (error) {
        console.error(error);
      }
    };


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/note/enclosure/${item._id}`);
        setSubnav(false);
        setNotes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, [item]);

  return (
    <>
      <SidebarLink>
        <div>
          <SidebarLabel onClick={item.notes && showSubnav}>{item.name}</SidebarLabel>
        </div>
        <div>
          {item.notes && subnav ? (
            <RiIcons.RiArrowUpSFill />
          ) : item.notes ? (
            <RiIcons.RiArrowDownSFill />
          ) : null}
        </div>
        <div>
          <button onClick={handleNewNote} style={{ 
                  backgroundImage: `url(${NuovaNota})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  width: '80px',
                  height: '40px',
                  border: 'none'
                }}></button>
        </div>
        <div>
          <button onClick={handleEnclosureDelete} style={{ 
                  backgroundImage: `url(${DeleteFolder})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: '50%',
                  width: '80px',
                  height: '40px',
                  border: 'none'
                }}></button>
        </div>
      </SidebarLink>
      {subnav &&
        notes.map((item, index) => {
          return (
            <DropdownLink key={index} onClick={(event) => {event.preventDefault(); setActiveNote(item)}}>
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;