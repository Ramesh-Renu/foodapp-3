import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/RestaurantAdmin/Navbar";
import Sidebar from "../../components/RestaurantAdmin/Sidebar";
import { CiEdit, CiLocationOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { BsClock } from "react-icons/bs";
import { fetchRestaurantDetails } from "../../redux/action/RestaurantAdmin/RestaurantSettingAction";
import EditSettingModal from "../../ModalPopup/EditSettingModal";
 

const RestaurantSettings = () => {
  const dispatch = useDispatch();
  const { restaurant, loading, error } = useSelector((state) => state.restaurantsetting);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const restaurantId = parseInt(localStorage.getItem("restaurantId"), 10);

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchRestaurantDetails(restaurantId));
    }
  }, [dispatch, restaurantId]);

  // Handle modal visibility
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Loading and error handling
  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className="container-wrapper restaurant-dashboard restaurant-admin">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="row align-items-center mb-4">
                    <h2 className="fw-bold">Restaurant Details</h2>

                    {/* Restaurant Details Section */}
                    <div className="col-md-6 d-flex align-items-start mt-5">
                      <img
                        className="profile-image rounded-circle me-3"
                        src={restaurant?.imagedata || "default-image.jpg"}
                        alt={restaurant?.restaurantName || "Restaurant Image"}
                        width="100"
                        height="100"
                      />
                      <div>
                        <h4 className="fw-bold">{restaurant?.restaurantName || "No Name Available"}</h4>
                        <p className="text-muted mb-2">
                          <CiLocationOn size={24} className="me-1" />
                          {restaurant?.branches[0]?.houseNumber}, {restaurant?.branches[0]?.streetName}, {restaurant?.branches[0]?.locality}, {restaurant?.branches[0]?.city}, {restaurant?.branches[0]?.state} - {restaurant?.branches[0]?.postalCode}
                        </p>
                        <p className="text-muted">
                          <FiPhone size={24} className="me-1" />
                          {restaurant?.branches[0]?.phoneNumber || "No phone number available"}
                          |
                          <BsClock size={24} className="ms-3 me-1" />
                          {restaurant?.openingHours || "No operating hours available"}
                        </p>
                      </div>
                    </div>

                    {/* Edit Button Section */}
                    <div className="col-md-6 text-md-end mt-3">
                      <button className="btn btn-primary" onClick={openModal}>
                        <CiEdit className="me-2" />
                        Edit Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Restaurant Modal */}
      <EditSettingModal
        show={isModalOpen}
        onClose={closeModal}
        restaurant={restaurant}
        branch={restaurant?.branches[0]}
      />
    </main>
  );
};

export default RestaurantSettings;
