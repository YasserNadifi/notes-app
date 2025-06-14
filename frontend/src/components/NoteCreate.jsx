import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const NoteCreate = () => {
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const navigate=useNavigate();

    const handleCancel=()=>{
        navigate("/notes");
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const note={
            title:title,
            content:content
        }
        try{
            const token = localStorage.getItem("jwt");
            const response = await axios.post("http://localhost:8080/notes",note,{
                headers:{
                    Authorization : `Bearer ${token}`
                }
            })
            console.log(response    )
            console.log(response.data)
            const createdNoteId=response.data.id;
            navigate(`/notes/${createdNoteId}`);
        } catch(err) {
            console.log(err);
            // maybe add a Modal to explain error to user
        }
    }

return (


<div
  style={{
    backgroundColor: '#e9ecf0',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '50px',
    boxSizing: 'border-box'
  }}
>
  <div
    className="bg-white p-4 rounded shadow-sm"
    style={{
      width: '100%',
      maxWidth: '1000px', // Better for larger screens
      display: 'flex',
      flexDirection: 'column',
      flex: 1, // Takes available vertical space
      minHeight: 'min-content' // Ensures minimum height
    }}
  >
    <h1 className="text-center mb-4">Create Note</h1>
    <Form style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Form.Group className="mb-3" controlId="titleInput">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group 
        className="mb-4" 
        controlId="contentInput"
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Write your note..."
          style={{ 
            flex: 1,
            height: '100%',
            resize: 'none',
            minHeight: '200px' // Minimum height fallback
          }}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      <div className="d-flex justify-content-between mt-auto">
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
        <Button variant="outline-secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  </div>
</div>


);
}
