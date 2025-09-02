import React, { useState, useEffect } from "react";
import "../assets/css/ProfileAddressTab.css";
import { CiLocationOn } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUserAddressAction, updateUserAddressAction } from "../redux/action/ProfileAddressActions";
import AddressModal from "../ModalPopup/AddressModal";
import { fetchUserAddresses } from "../redux/slicer/ProfileAddressSlicer";
import { FaRegEdit } from "react-icons/fa";

const ProfileAddressTab = () => {
  const dispatch = useDispatch();
  const { addresses, status, error } = useSelector((state) => state.userAddresses);

  const [showModal, setShowModal] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    address: "",
    addressType: "",
    latitude: "",
    longitude: "",
    houseNumber: "",
    streetName: "",
    locality: "",
    city: "",
    state: "",
    postalCode: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(fetchUserAddresses(userId));
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Special handling for latitude and longitude
    if (id === 'latitude' || id === 'longitude') {
      // Only update if the value is empty or is a valid number
      if (value === '' || !isNaN(parseFloat(value))) {
        setNewAddress({
          ...newAddress,
          [id]: value,
        });
      }
    } else {
      setNewAddress({
        ...newAddress,
        [id]: value,
      });
    }
  };

  const handleEditAddress = (address) => {
    setEditAddress(address);
    setNewAddress({
      address: address.address,
      addressType: address.addressType,
      // Store latitude and longitude as numbers directly
      latitude: parseFloat(address.latitude),
      longitude: parseFloat(address.longitude),
      houseNumber: address.houseNumber,
      streetName: address.streetName,
      locality: address.locality,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
    });
    setShowModal(true);
  };

  const handleSubmit = async (values) => {
    const userId = localStorage.getItem("userId");

    // Validate latitude and longitude before submission
    // const latitude = parseFloat(values.latitude);
    // const longitude = parseFloat(values.longitude);

    // if (isNaN(latitude) || isNaN(longitude)) {
    //   alert("Please enter valid latitude and longitude values");
    //   return;
    // }

    if (editAddress) {
      await dispatch(updateUserAddressAction(editAddress.addressId, values, userId));
    } else {
      await dispatch(createUserAddressAction(userId, values));
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditAddress(null);
    setNewAddress({
      address: "",
      addressType: "",
      latitude: "",
      longitude: "",
      houseNumber: "",
      streetName: "",
      locality: "",
      city: "",
      state: "",
      postalCode: "",
    });
  };

  // Loading state
  if (status === 'loading') {
    return (
      <div className="tab-panel fade accordion-item border-0">
        <div className="accordion-body bg-white pt-0">
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (status === 'failed') {
    return (
      <div className="tab-panel fade accordion-item border-0">
        <div className="accordion-body bg-white pt-0">
          <div className="alert alert-danger" role="alert">
            Error loading addresses: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="tab-panel fade accordion-item border-0"
      id="tab-4-panel"
      role="tabpanel"
      aria-labelledby="tab-4"
      tabIndex="0"
    >
      <h2 className="accordion-header d-lg-none" id="headingThree">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseThree"
          aria-expanded="true"
          aria-controls="collapseThree"
        >
          <CiLocationOn className="me-2" /> Address
        </button>
      </h2>
      <div
        id="collapseThree"
        className="accordion-collapse collapse d-lg-block"
        aria-labelledby="headingThree"
        data-bs-parent="#myTabContent"
      >
        <div className="accordion-body bg-white pt-0">
          <h4 className="tab-heading">Manage Address</h4>
          <p className="text-gray-600 font-secondary">
            Add and manage your delivery addresses for quick access at checkout
          </p>

            <div className="row">
              {addresses && addresses.length === 0 ? (
                <p className="no-address-message text-center font-secondary">There is no address</p>
              ) : (
                addresses.map((address) => (
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                  <div
                    key={address.addressId}
                    className=" address-card rounded-lg bg-white"
                  >
                    <div className="font-secondary address-type font-bold text-lg mb-2">
                      {address.addressType}
                    </div>
                    <p className="font-secondary address-details text-gray-700">
                      <strong className="text-gray font-secondary">
                        {address.locality}
                      </strong>
                      <br />
                      {address.houseNumber}, {address.streetName}, {address.locality}, {address.city}, {address.state} - {address.postalCode}
                    </p>
                    <button
                      className="d-flex align-items-center font-secondary-bold edit-btn mt-2 flex items-center"
                      onClick={() => handleEditAddress(address)}
                      disabled={status === 'loading'}
                    >
                      Edit <FaRegEdit size={18} className="ms-2" />
                    </button>
                  </div>
                  </div>
                ))
              )}
            </div>

          <div className="">
            <Link
              to="#"
              onClick={() => setShowModal(true)}
              className="font-secondary-bold add-address-btn mb-4"
            >
              <FaPlus /> Add Address
            </Link>
          </div>
        </div>
      </div>

      <AddressModal
        show={showModal}
        onClose={handleCloseModal}
        address={newAddress}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        isEditing={!!editAddress}
        isLoading={status === 'loading'}
      />
    </div>
  );
};

export default ProfileAddressTab;