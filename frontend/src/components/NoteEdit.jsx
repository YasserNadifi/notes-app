import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Spinner, Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export const NoteEdit = () => {

    const { noteId } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchNote = async () => {
        try {
          const token = localStorage.getItem('jwt');
          const response = await axios.get(`http://localhost:8080/notes/${noteId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setNote(response.data);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to load note');
        } finally {
          setLoading(false);
        }
      };
  
      fetchNote();
    }, [noteId]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setNote(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setSaving(true);
      try {
        const token = localStorage.getItem('jwt');
        await axios.put(`http://localhost:8080/notes/${noteId}`, note, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        navigate(`/notes/${noteId}`); 
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to save note');
      } finally {
        setSaving(false);
      }
    };
  
    const handleBack = () => {
        navigate(`/notes/${noteId}`); 
    };
  
    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      );
    }
  
    if (error) {
      return (
        <Container className="mt-5">
          <Alert variant="danger">
            {error}
            <div className="mt-3">
              <Button variant="secondary" onClick={handleBack}>
                Go Back
              </Button>
            </div>
          </Alert>
        </Container>
      );
    }
  
    if (!note) {
      return (
        <Container className="mt-5">
          <Alert variant="warning">
            Note not found
            <div className="mt-3">
              <Button variant="secondary" onClick={handleBack}>
                Go Back
              </Button>
            </div>
          </Alert>
        </Container>
      );
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
  <div className="bg-white p-4 rounded shadow-sm" style={{
      width: '100%',
      maxWidth: '1000px', // Better for larger screens
      display: 'flex',
      flexDirection: 'column',
      flex: 1, // Takes available vertical space
      minHeight: 'min-content' // Ensures minimum height
  }}>
    <div className="mb-2">
      <Button 
        variant="outline-secondary" 
        onClick={handleBack}
        className="mb-3"
      >
        ← Back to Note
      </Button>
    </div>
    
    <Form 
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
    >
      <Form.Group className="mb-4">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={note.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group 
        className="mb-4" 
        style={{ display: 'flex',flex: 1,  flexDirection: 'column' }}
      >
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          name="content"
          value={note.content}
          onChange={handleChange}
          required
          style={{ 
            flex: 1,
            whiteSpace: 'pre-wrap',
            resize: 'none',
            minHeight: '200px'
          }}
        />
      </Form.Group>

      <div className="mt-4 d-flex gap-2 mt-auto">
        <Button 
          variant="primary" 
          type="submit"
          disabled={saving}
        >
          {saving ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Saving...
            </>
          ) : 'Save Changes'}
        </Button>
        
        <Button 
          variant="outline-danger"
          onClick={handleBack}
        >
          Cancel
        </Button>
      </div>
    </Form>
  </div>
</div>
    );

}
