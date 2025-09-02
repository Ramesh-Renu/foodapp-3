import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Modal, Button, Card, Row, Col, Pagination } from "react-bootstrap";
import {
  createMenu,
  fetchMenus,
  getCategory,
  getRestaurantBranches,
  removeMenu,
  updateMenu,
} from "../../redux/action/RestaurantAdmin/RestaurantAdminMenuAction";
import MenuModal from "../../ModalPopup/AddMenuModal";
import "../../assets/css/Admin/Menu.css";
import { FaRegEdit } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { MdEventAvailable } from "react-icons/md";
import Navbar from "../../components/SuperAdmin/Navbar";
import Sidebar from "../../components/SuperAdmin/Sidebar";
import { fetchRestaurants } from "../../redux/action/SuperAdmin/SARestaurantUserAction";

const SARestaurantMenus = () => {
  const dispatch = useDispatch();
  const { menus, categories, loading, error, branches } = useSelector(
    (state) => state.menus
  );
  const { users, successMessage, restaurants } = useSelector(
    (state) => state.users
  );

  // const restaurantId = parseInt(localStorage.getItem("restaurantId"), 10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  useEffect(() => {
    if (selectedRestaurantId) {
      dispatch(getCategory());
      dispatch(fetchMenus(selectedRestaurantId));
      dispatch(getRestaurantBranches(selectedRestaurantId));
    } 
  }, [dispatch, selectedRestaurantId]);

  const handleAddMenu = (newMenuData) => {
    if (selectedRestaurantId) {
      const menuDataWithRestaurantId = {
        ...newMenuData,
        selectedRestaurantId,
      };
      dispatch(createMenu(menuDataWithRestaurantId));
      setShowAddModal(false);
    } else {
      alert("Please ensure you have a valid Restaurant ID.");
    }
  };

  const handleEditMenu = (updatedMenuData) => {
    if (selectedRestaurantId && updatedMenuData.menuId) {
      const menuDataWithRestaurantId = {
        ...updatedMenuData,
        selectedRestaurantId,
      };
      dispatch(updateMenu(menuDataWithRestaurantId));
      setShowEditModal(false);
    } else {
      alert("Invalid restaurant or menu ID.");
    }
  };

  const handleDeleteMenu = (menuId) => {
    if (menuId) {
      dispatch(removeMenu(menuId));
    } else {
      console.warn("Menu ID is invalid or not found.");
    }
  };

  const StatusIcon = ({ isTrue }) => (
    <span className={`badge ${isTrue ? "bg-success" : "bg-danger"}`}>
      {isTrue ? "Available" : "Unavailable"}
    </span>
  );

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#27500B" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#27500B",
      },
    }),
  };

  // Calculate the menus to display for the current page
  const indexOfLastMenu = currentPage * itemsPerPage;
  const indexOfFirstMenu = indexOfLastMenu - itemsPerPage;
  const currentMenus = menus.slice(indexOfFirstMenu, indexOfLastMenu);

  const totalPages = Math.ceil(menus.length / itemsPerPage);

  return (
    <main className="container-wrapper restaurant-dashboard restaurant-admin">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <h2 className="title-1 font-secondary-bold">Food Menu</h2>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <Button
                    variant="primary"
                    onClick={() => setShowAddModal(true)}
                    className="btn-add"
                  >
                    Add New Menu +
                  </Button>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Restaurant</label>
                <Select
                  classNamePrefix="select"
                  name="restaurantId"
                  value={
                    restaurants
                      .map(({ restaurantId, restaurantName }) => ({
                        value: restaurantId,
                        label: restaurantName,
                      }))
                      .find(
                        (option) => option.value === selectedRestaurantId
                      ) || null
                  }
                  onChange={(selectedOption) => {
                    setSelectedRestaurantId(selectedOption?.value || ""); // Update local state
                  }}
                  options={restaurants.map(
                    ({ restaurantId, restaurantName }) => ({
                      value: restaurantId,
                      label: restaurantName,
                    })
                  )}
                  styles={customStyles}
                  placeholder="Select Restaurant"
                  isClearable
                />
              </div>

              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  {error && <div className="alert alert-danger">{error}</div>}
                  {!selectedRestaurantId ? (
                    <div className="alert  text-center">
                      Please select a restaurant to view its menus.
                    </div>
                  ) : currentMenus.length === 0 ? (
                    <div className="alert  text-center">
                      No menus available for the selected restaurant.
                    </div>
                  ) : (
                    <>
                      {/* Display menus */}
                      <Row className="mt-4">
                        {currentMenus.map((menu) => (
                          <Col md={4} lg={3} key={menu.menuId} className="mb-4">
                            <Card className="admin-menu-card">
                              <Card.Body>
                                <img
                                  className="admin-menu-list-img"
                                  src={menu.imageUrl}
                                  alt={menu.itemName}
                                />
                                <Card.Title>{menu.itemName}</Card.Title>
                                <Card.Text>{menu.description}</Card.Text>
                                <Card.Text className="admin-menu-price">
                                  ₹{menu.price}
                                </Card.Text>
                                <div className="d-flex align-items-center">
                                  <Button
                                    className="btn-menu-edit"
                                    onClick={() => {
                                      setCurrentMenu(menu);
                                      setShowEditModal(true);
                                    }}
                                  >
                                    Edit{" "}
                                    <FaRegEdit size={18} className="ms-2" />
                                  </Button>
                                </div>
                                {menu.isAvailable ? (
                                  <button className="admin-menu-stock out-of-stock">
                                    Out of Stock <ImBlocked />
                                  </button>
                                ) : (
                                  <button className="admin-menu-stock in-stock">
                                    In Stock <MdEventAvailable />
                                  </button>
                                )}
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>

                      {/* Pagination Controls */}
                      <Pagination>
                        {[...Array(totalPages)].map((_, index) => (
                          <Pagination.Item
                            key={index}
                            active={index + 1 === currentPage}
                            onClick={() => setCurrentPage(index + 1)}
                          >
                            {index + 1}
                          </Pagination.Item>
                        ))}
                      </Pagination>
                    </>
                  )}

                  {/* Modals */}
                  <MenuModal
                    show={showAddModal}
                    onHide={() => setShowAddModal(false)}
                    onSave={handleAddMenu}
                    categories={categories}
                  />

                  {currentMenu && (
                    <MenuModal
                      show={showEditModal}
                      onHide={() => setShowEditModal(false)}
                      onSave={handleEditMenu}
                      categories={categories}
                      initialData={currentMenu}
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

export default SARestaurantMenus;
