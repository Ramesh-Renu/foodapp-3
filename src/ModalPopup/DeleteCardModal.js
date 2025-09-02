import React from "react";

const DeleteCardModal = ({ showModal, onConfirm, onCancel }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-dialog card-delete-modal" role="document">
        <div className="modal-content rounded-4">
          <div className="modal-header">
            <h5 className="modal-title fs-4 mt-2 fw-bold">Delete Card</h5>
          </div>
          <div className="modal-body mt-2 fs-5">
            <p>Are you sure you want to delete this card?</p>
          </div>
          <div className="modal-footer mt-4">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCardModal;
