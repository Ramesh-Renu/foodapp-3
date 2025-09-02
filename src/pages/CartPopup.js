//C:\ccs\Project\FoodApp Sprint\src\pages\CartPopup.js

import { MdOutlineShoppingBag } from "react-icons/md";
import "../assets/css/CartPopup.css";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import Cart from "./Cart";

const CartPopup = ({ countItems }) => {
  const [show, setShow] = useState(false); // Manage modal visibility

  const menuItemCount = countItems ? countItems.length : 0;

  if (menuItemCount === 0) return null; // Hide when no items

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="cart-popup">
      <span className="popup-text">
        {menuItemCount} Item{menuItemCount > 1 ? "s" : ""} Added
      </span>
      <button className="view-cart-btn" onClick={handleShow}>
        View Cart
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-right-slide" // Custom class for styling
        centered 
      >
        <Modal.Header closeButton className="d-block">
          <Modal.Title>

            <h3 className="text-gray fs-6 text-center d-flex align-item-center justify-content-center"><MdOutlineShoppingBag className="text-gray me-2" size={20} /> My Cart</h3>
          </Modal.Title>

          <div className="border-line"></div>
        </Modal.Header>
        <Modal.Body>
          <Cart></Cart>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CartPopup;
