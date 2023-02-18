import Sidebar from "../components/SideBar.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import { getAuthcredential } from "./AuthHandler.js";
import "./NoteList.css"

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState({ content: "" });
  const [nota, setNota] = useState("");

  const updateNote = async (note) => {
    console.log(note._id);
    console.log(note.content);

    try {
      console.log(note._id);
      await axios
        .post("http://localhost:8080/note/update/" + note._id, {
          content: note.content,
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (note) => {
    try {
      await axios
        .delete("http://localhost:8080/note/" + note._id)
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.error(error);
    }
  }

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
  useEffect(() => {
    setActiveNote({ ...activeNote, content: nota });
  }, [nota]);

  return (
    <div>
      <div>
        <Sidebar activeNote={activeNote} setActiveNote={setActiveNote} />
        <div>
          <MDEditor
            classname="editorMDE"
            value={activeNote.content}
            onChange={setNota}
            height={550}
          />
          <div style={{marginTop:"10px"}}>
            <button classname="SaveButton" onClick={() => updateNote(activeNote)} style={{backgroundColor:"#4dff4d", marginLeft:"40%"}}>salva</button>
            <button classname="DeleteButto" onClick={() => deleteNote(activeNote)} style={{backgroundColor:"#ff3737", marginLeft:"8.7%"}}>Elimina nota</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteList;
