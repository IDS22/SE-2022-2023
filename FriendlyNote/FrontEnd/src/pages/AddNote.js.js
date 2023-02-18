import React, {useState, useEffect} from 'react'
import Textarea from "../reusables/TextArea";
import Input from "../reusables/Input";
import MDEditor from "@uiw/react-md-editor";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const NoteForm = (props) => {
    const { id } = useParams();
    const [nota, setNota] = useState('');
    const [activeNote, setActiveNote] = useState({content: '' });
    const { formSubmit, title: noteTitle, body: noteBody } = props
    const [ note, setNote ] = useState({
        title: noteTitle ? noteTitle : '',
        body: noteBody ? noteBody : '',
        formErrors: {}
    })
    const errors = {}
    const runValidations = () => {
        // title
        if(note.title.trim().length === 0) {
            errors.title = "Title can't be blank"
        }
    }

    useEffect(() => {
        setActiveNote({ ...nota, content:nota });
    }, [nota]);
        

    const handleSubmit =async (e) => {
        e.preventDefault()
        var {title, content} = document.forms[0];
        runValidations()

        const responsde  =  await axios.post("http://localhost:8080/note/"+ id, {title: title.value, content: note.body} )
    }

    const handleChange = (e) => {
        if(e.target.name === 'title') {
            setNote({...note, title: e.target.value})
        } else if(e.target.name === 'body') {
            setNote({...note, body: e.target.value})
        }
    }

    const renderForm = (
        <div >
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-sm-6">
                        <Input
                        type="text"
                        className="form-control"
                        value={note.title}
                        handleChange={handleChange}
                        name="title"
                        placeholder="Title"
                    />
                    { note.formErrors.title && <div className="form-text">{note.formErrors.title}</div> }
                    </div>
                </div>
                
                <div className="row mb-3">
                    <div className="col-sm-6">
                    <MDEditor
                        className="form-control"
                        value={note.body}
                        name="content"
                        placeholder="Body"
                        onChange={(value) => setNote({...note, body: value})}
                    />
                    </div>
                </div>
                
                <Input
                    type="submit"
                    className="btn btn-success my-3"
                    value="Save"
                />
            </form>
        </div>
    );

    return (
        <div>
            {renderForm}
        </div>
    )

}

export default NoteForm