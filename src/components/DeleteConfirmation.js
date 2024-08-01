import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmation = ({ show, handleClose, handleDelete }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Deletion</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Are you sure you want to delete this employee? This action cannot be undone.</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteConfirmation;
