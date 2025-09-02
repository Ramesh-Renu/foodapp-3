import Navbar from "../../components/SuperAdmin/Navbar";
import Sidebar from "../../components/SuperAdmin/Sidebar";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurantUsers,
  createRestaurantUser,
  updateRestaurantUser,
  fetchRestaurants,
} from "../../redux/action/SuperAdmin/SARestaurantUserAction";
import { clearMessages } from "../../redux/slicer/SuperAdmin/SARestaurantUserSlicer";
import AddSARModal from "../../ModalPopup/AddSARModal";

const SARestaurantUser = () => {
  const dispatch = useDispatch();
  const { users, loading, error, successMessage, restaurants } = useSelector(
    (state) => state.users
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchRestaurantUsers());
    dispatch(fetchRestaurants());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage || error) {
      setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
    }
  }, [successMessage, error, dispatch]);

  const handleAddUser = (user) => {
    const formattedUser = {
      ...user,
      restaurantId: parseInt(user.restaurantId, 10), 
    };
    dispatch(createRestaurantUser(formattedUser));
    setShowAddModal(false);
  };

  const handleEditUser = (user) => {
    const formattedUser = {
      ...user,
      restaurantUserId: user.restaurantUserId, 
      restaurantId: parseInt(user.restaurantId, 10), 
    };
    dispatch(updateRestaurantUser(formattedUser));
    setShowEditModal(false);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
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
                  <h2 className="title-1">Restaurant User</h2>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  {loading && <p>Loading...</p>}
                  {error && <div className="alert alert-danger">{error}</div>}
                  {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                  )}

                  <button
                    className="btn btn-primary mb-3"
                    onClick={() => setShowAddModal(true)}
                  >
                    Add User
                  </button>

                  <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Restaurant ID</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.restaurantUserId}>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.restaurantId}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => handleEditClick(user)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {showAddModal && (
                    <AddSARModal
                      title="Add User"
                      onClose={() => setShowAddModal(false)}
                      onSave={handleAddUser}
                      restaurants={restaurants}
                    />
                  )}
                  {showEditModal && selectedUser && (
                    <AddSARModal
                      title="Edit User"
                      onClose={() => setShowEditModal(false)}
                      onSave={handleEditUser}
                      restaurants={restaurants}
                      user={selectedUser}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SARestaurantUser;
