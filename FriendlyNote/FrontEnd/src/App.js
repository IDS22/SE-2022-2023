import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Logged from './pages/Logged'
import Login from './pages/Login'
import SignUp from './pages/signup'
import NoteList from './pages/NoteList'
import Condividi from "./pages/Condividi.js";
import AddNote from "./pages/AddNote.js";


import "./index.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/logged" element={<Logged/>} />
        <Route path="/signup" element={<SignUp/>} /> 
        <Route path="/Notelist" element={<NoteList/>} />
        <Route path="/Condividi" element={<Condividi/>} />
        <Route path="/AddNote/:id" element={<AddNote/>} />
      </Routes>
    </Router>
  );
}

export default App;
