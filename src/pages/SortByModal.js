import React, { useState } from "react";
import { Dropdown, Button } from "react-bootstrap";
import { FaAngleDown } from "react-icons/fa";
import "../assets/css/SortByModal.css"; 

const SortByModal = () => {
  const [selectedOption, setSelectedOption] = useState("Relevance (Default)");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <Dropdown>
      {/* Dropdown Button */}
      <Dropdown.Toggle
        variant="outline-secondary"
        className="me-2 btn-rounded"
        id="dropdown-custom-components"
      >
        <FaAngleDown size={20} /> Sort By
      </Dropdown.Toggle>

      {/* Dropdown Menu */}
      <Dropdown.Menu className="dropdown-menu-custom" align="end">
        <div>
          {/* Radio Buttons */}
          <div className="form-check">
            <label className="form-check-label fw-bold fs-6">Relevance (Default)</label>
            <input
              className="form-check-input"
              type="radio"
              name="sortOption"
              value="Relevance (Default)"
              checked={selectedOption === "Relevance (Default)"}
              onChange={() => handleOptionChange("Relevance (Default)")}
            />
          </div>

          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="radio"
              name="sortOption"
              value="Rating"
              checked={selectedOption === "Rating"}
              onChange={() => handleOptionChange("Rating")}
            />
            <label className="form-check me-1">Rating</label>
          </div>

          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="radio"
              name="sortOption"
              value="Preparing Time"
              checked={selectedOption === "Preparing Time"}
              onChange={() => handleOptionChange("Preparing Time")}
            />
            <label className="form-check me-1">Preparing Time</label>
          </div>

          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="radio"
              name="sortOption"
              value="Cost: Low to High"
              checked={selectedOption === "Cost: Low to High"}
              onChange={() => handleOptionChange("Cost: Low to High")}
            />
            <label className="form-check me-1">Cost: Low to High</label>
          </div>

          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="radio"
              name="sortOption"
              value="Cost: High to Low"
              checked={selectedOption === "Cost: High to Low"}
              onChange={() => handleOptionChange("Cost: High to Low")}
            />
            <label className="form-check me-1">Cost: High to Low</label>
          </div>

          {/* Apply Button */}
          <Button className="btn-apply mt-3">
            Apply
          </Button>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortByModal;
