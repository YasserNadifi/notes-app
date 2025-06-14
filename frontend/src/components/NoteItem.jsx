import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

export const NoteItem = ({note}) => {
    const navigate=useNavigate();
    const previewText = note.content.length > 100 
    ? `${note.content.substring(0, 100)}...` 
    : note.content;

    const handleClick= ()=>{
        navigate(`/notes/${note.id}`);
    }

  return (
    <Card className='note-card' style={{ width: '19rem', margin: '10px', height:'140px' }} onClick={handleClick}>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text style={{ 
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: 3 // number of lines to show
        }}>
        {note.content}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
