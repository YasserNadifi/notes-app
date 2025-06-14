import React from 'react'
import { useState , useEffect } from 'react'
import { AppContext } from '../App'
import { NoteItem } from './NoteItem'
import { getNotes } from '../services/NotesService';
import { Container, Row, Col, Button, Modal, Form, CloseButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const NoteList = () => {
  

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [keyword,setKeyword]=useState("");
  const [showLogoutModal,setShowLogoutModal] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesData = await getNotes();
        setNotes(notesData);
      } catch (err) {
        setError('Failed to load notes');
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleSearch = async (e)=>{
    try{
      const token = localStorage.getItem("jwt");
      const response = await axios.get(`http://localhost:8080/notes/search?keyword=${keyword}`,{
          headers:{
              Authorization : `Bearer ${token}`
          }
      })
      setNotes(response.data);
    } catch(err){
      console.log(err)
    }
  }

  if (loading) return <div>Loading notes...</div>;
  if (error) return <div>{error}</div>;

  const handleLogout=()=>{
    localStorage.removeItem("jwt");
    navigate("/login");
  }

  return (



<div style={{ backgroundColor: '#e9ecf0', minHeight: '100vh', width: '100%' }}>
      {/* Top Bar */}
      <div style={{ backgroundColor: '#b6c0cf', padding: '10px 20px' }}>
        <Container fluid>
          <Row className="align-items-center justify-content-between">
            <Col xs="auto">
              <Button variant="primary" size="sm" onClick={() => navigate("/create")}>
                Create note
              </Button>
            </Col>
            <Col xs={12} md={6}>
              <Form className="d-flex" onSubmit={
                (e)=>{
                  e.preventDefault();
                  handleSearch();
                }
              }>
                <Form.Control
                  type="text"
                  placeholder="Search notes..."
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <Button variant="light" size="sm" className="ms-2" type='submit'>
                  Search
                </Button>
              </Form>
            </Col>
            <Col xs="auto">
              <Button variant="danger" size="sm" onClick={() => setShowLogoutModal(!showLogoutModal)}>
                Log out
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content: Notes Grid */}
      <div style={{ padding: '20px' }}>
        {notes.length === 0 ? 
          <div>No notes found</div>
          :
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {notes.map(note => (<NoteItem key={note.id} note={note} />))}
          </div>
        }
      </div>

      {/* Logout Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header>
          <Modal.Title>Log out</Modal.Title>
          <CloseButton onClick={() => setShowLogoutModal(false)} />
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleLogout}>
            Log out
          </Button>
          <Button variant="outline-secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  )
}
