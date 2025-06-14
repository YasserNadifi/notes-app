import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Spinner, Alert } from 'react-bootstrap';


import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ConfirmationModal } from './ConfirmationModal';

export const NoteDetail = () => {

  const { noteId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handleBack = () => {
    navigate("/notes"); // Go back to previous page
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem('jwt');
      await axios.delete(`http://localhost:8080/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/notes'); // Redirect to notes list after deletion
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete note');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
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
        ← Back to Notes
      </Button>
      <h1 className=" mb-2">{note.title}</h1>
    </div>

    <div 
      className="bg-light p-4 rounded" 
      style={{ 
        flex: 1, 
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        minHeight: '200px' // Ensures a similar minimum height as the textarea in the edit form
      }}
    >
      {note.content}
    </div>

    <div className="mt-4 d-flex gap-2">
      <Button 
        variant="primary" 
        onClick={() => navigate(`/notes/${noteId}/edit`)}
      >
        Edit Note
      </Button>

      <Button 
        variant="danger" 
        onClick={() => setShowDeleteModal(true)}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Deleting...
          </>
        ) : 'Delete Note'}
      </Button>
    </div>

    {error && (
      <div className="alert alert-danger mt-3">
        {error}
      </div>
    )}

    <ConfirmationModal
      show={showDeleteModal}
      onHide={() => setShowDeleteModal(false)}
      onConfirm={handleDelete}
      title="Delete Note"
      message="Are you sure you want to delete this note"
    />
  </div>
</div>

  )
}
