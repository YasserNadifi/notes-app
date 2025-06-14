import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert,Button,Container } from 'react-bootstrap';

export const ErrorPage = () => {
    const navigate=useNavigate();
  return (
    <Container className="mt-5">
    <Alert variant="danger">
      this page doesn't exist
      <div className="mt-3">
        <Button variant="secondary" onClick={()=>navigate(-1)}>
          Go back
        </Button>
      </div>
    </Alert>
  </Container>

  )
}
