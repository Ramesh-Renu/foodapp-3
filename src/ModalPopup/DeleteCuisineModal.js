// DeleteCuisineModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteCuisineModal = ({ show, onClose, onDelete, cuisine }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Cuisine</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete the cuisine type <strong>{cuisine.name}</strong>?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCuisineModal;
