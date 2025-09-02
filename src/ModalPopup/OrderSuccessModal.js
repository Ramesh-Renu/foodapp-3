import React from "react";
import { Modal, Button } from "react-bootstrap";

const OrderSuccess = ({ showModal, handleClose }) => {
  return (
    <Modal show={showModal} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Order Successful</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Your order has been successfully placed!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderSuccess;
