import Navbar from "../../components/SuperAdmin/Navbar";
import Sidebar from "../../components/SuperAdmin/Sidebar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Spinner, Alert, Button } from "react-bootstrap";
import {
  createRestaurant,
  restaurantSearch,
  updateRestaurant,
} from "../../redux/action/SuperAdmin/SARestaurantAction";
import AddSarestaurantModal from "../../ModalPopup/AddSarestaurantModal";
import EditRestaurantModal from "../../ModalPopup/EditSarestaurantModal";

const SARestaurant = () => {
  const dispatch = useDispatch();
  const { restaurantsar, loading, error } = useSelector((state) => state.restaurantsar);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); 
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    dispatch(restaurantSearch({ searchText: "" }));
  }, [dispatch]);

  const handleAddRestaurant = (data) => {
    const updatedData = {
      ...data,
      rating: parseFloat(data.rating),
      averageRating: parseFloat(data.averageRating),
      ratingCount: parseInt(data.ratingCount, 10),
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
      cuisineTypeIds: Array.isArray(data.cuisineTypeIds)
        ? data.cuisineTypeIds.map((id) => parseInt(id, 10))
        : [parseInt(data.cuisineTypeIds, 10)],
    };
    dispatch(createRestaurant(updatedData));
    setShowModal(false);
  };

  const handleEditRestaurant = (data) => {
    const updatedData = {
      ...data,
      restaurantId: selectedRestaurant.restaurantId,
      branchId: selectedRestaurant.branches?.[0]?.branchId,
    };
    dispatch(updateRestaurant(updatedData));
    setShowModal(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedRestaurant(null);
  };

  const handleEditClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setModalType("edit");
    setShowModal(true);
  };

  const handleAddClick = () => {
    setModalType("add");
    setShowModal(true);
  };

  return (
    <main className="container-wrapper restaurant-dashboard">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <h2 className="title-1">Restaurant Details</h2>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                  <Button variant="primary" onClick={handleAddClick}>
                    Add Restaurant
                  </Button>
                </div>
                {loading && <Spinner animation="border" />}
                {error && (
                  <Alert variant="danger">
                    {error.message || "Failed to fetch restaurant data."}
                  </Alert>
                )}
                {!loading && !error && restaurantsar.length > 0 && (
                  <Table striped bordered hover responsive>
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Average Rating</th>
                        <th>Rating</th>
                        <th>Ratings Count</th>
                        <th>Image</th>
                        <th>Updated At</th>
                        <th>Branches</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {restaurantsar.map((restaurant, index) => (
                        <tr key={restaurant.restaurantId}>
                          <td>{index + 1}</td>
                          <td>{restaurant.restaurantName}</td>
                          <td>{restaurant.averageRating}</td>
                          <td>{restaurant.rating}</td>
                          <td>{restaurant.ratingsCount}</td>
                          <td>
                            <img
                              src={restaurant.imageUrl || restaurant.imagedata}
                              alt="Restaurant"
                              style={{ width: "50px", height: "50px" }}
                            />
                          </td>
                          <td>{new Date(restaurant.updatedAt).toLocaleString()}</td>
                          <td>
                            {restaurant.branches.map((branch, idx) => (
                              <div key={idx}>
                                <strong>Locality:</strong> {branch.locality} <br />
                                <strong>Address:</strong> {branch.address}
                              </div>
                            ))}
                          </td>
                          <td>
                            <Button
                              variant="warning"
                              onClick={() => handleEditClick(restaurant)}
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Restaurant Modal */}
      <AddSarestaurantModal
        show={showModal && modalType === "add"}
        handleClose={handleModalClose}
        onSubmit={handleAddRestaurant}
      />

      {/* Edit Restaurant Modal */}
      <EditRestaurantModal
        show={showModal && modalType === "edit"}
        handleClose={handleModalClose}
        onSubmit={handleEditRestaurant}
        restaurantData={selectedRestaurant}
      />
    </main>
  );
};

export default SARestaurant;
