import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../assets/css/MyAccounts.css";
import Axis from "../assets/images/axis.png";
import Rupay from "../assets/images/rupay.png";
import { FaRegCreditCard } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { fetchUserCards, deleteUserCard } from "../redux/slicer/DisplayCardSlicer";
import DeleteCardModal from "../ModalPopup/DeleteCardModal";

const ProfileCardTab = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);
  const { cards, loading, error } = useSelector((state) => state.card);
  const parsedUserId = userId ? parseInt(userId, 10) : null;

  const [showModal, setShowModal] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  useEffect(() => {
    if (parsedUserId) {
      dispatch(fetchUserCards(parsedUserId));
    }
  }, [parsedUserId, dispatch]);

  const handleDelete = (cardId) => {
    setCardToDelete(cardId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (cardToDelete) {
      try {
        await dispatch(deleteUserCard(cardToDelete)).unwrap();
        setShowModal(false);
      } catch (err) {
        console.error("Failed to delete card:", err);
      }
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setCardToDelete(null);
  };

  const formatCardNumber = (cardNumber) => {
    const lastFourDigits = cardNumber.slice(-4);
    const maskedDigits = cardNumber.slice(0, -4).replace(/\d/g, "x");
    const maskedWithSpaces = maskedDigits.replace(/(.{4})(?=.)/g, "$1 ");
    return maskedWithSpaces + " " + lastFourDigits;
  };

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div
      className="tab-panel fade accordion-item border-0"
      id="tab-2-panel"
      role="tabpanel"
      aria-labelledby="tab-2"
      tabIndex="0"
    >
      <h2 className="accordion-header d-lg-none" id="headingTwo">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <FaRegCreditCard className="me-2" /> Cards
        </button>
      </h2>
      <div
        id="collapseTwo"
        className="accordion-collapse collapse d-lg-block"
        aria-labelledby="headingTwo"
        data-bs-parent="#myTabContent"
      >
        <div className="accordion-body bg-white pt-0">
          <h4 className="tab-heading">Manage Saved Cards</h4>
          {cards.length === 0 ? (
            <p className="text-center py-5 font-secondary">No cards available.</p>
          ) : (
            cards.map((card) => (
              <div className="d-flex card-item" key={card.cardId}>
                <div className="d-grid">
                  <p><img src={Axis} alt="card" className="card-bank-img" /> {card.cardName || 'Card Name' }</p>
                  <p>{card.cardHolderName}</p>                
                  <p>{formatCardNumber(card.cardNumber)}<img src={Rupay} className="card-brand-img" alt="card" /></p>
                </div>
                <button onClick={() => handleDelete(card.cardId)}>
                  <RiDeleteBin6Line
                    size={24}/>
                  <p>Remove</p>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <DeleteCardModal
        showModal={showModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default ProfileCardTab;
