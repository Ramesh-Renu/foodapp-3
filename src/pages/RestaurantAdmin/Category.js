import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Spinner } from "react-bootstrap";
import { deleteCategory, fetchCategories } from "../../redux/action/RestaurantAdmin/RestaurantAdminCategoryAction";
import AddCategoryModal from "../../ModalPopup/AddCategoryModal";
import EditCategoryModal from "../../ModalPopup/EditCategoryModal";
import Navbar from "../../components/RestaurantAdmin/Navbar";
import Sidebar from "../../components/RestaurantAdmin/Sidebar";
import "../../assets/css/Admin/Style.css"
import { FaRegEdit } from "react-icons/fa";
const RestaurantCategory = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = () => setShowAddModal(true);
  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setShowEditModal(true);
  };

  // const handleDeleteCategory = (category) => {
  //   setCurrentCategory(category);
  //   setShowDeleteModal(true);
  // };

  const confirmDeleteCategory = () => {
    dispatch(deleteCategory(currentCategory.categoryId)).then(() => dispatch(fetchCategories()));
    setShowDeleteModal(false);
  };

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
                  <h2 className="title-1 font-secondary-bold">Menus Category</h2>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <Button
                    variant="primary"
                    onClick={handleAddCategory}
                    className="btn-add"
                  >
                    Add Category +
                  </Button>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12">
                  {loading ? (
                    <div className="text-center my-4">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : error ? (
                    <p className="text-danger">Error: {error}</p>
                  ) : (
                    <ul className="admin-menu-category">
                      {categories.map((category) => (
                        <li
                          key={category.categoryId}
                          className=""
                        >
                          {category.categoryName}
                          <div>
                          <Button
                                className="btn-admin-edit"
                                onClick={() => handleEditCategory(category)}
                              >
                                Edit <FaRegEdit size={18} className="ms-2" />
                              </Button>
                            
                            {/* <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDeleteCategory(category)}
                            >
                              <i className="bi bi-trash"></i> Delete
                            </Button> */}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  {/* Add Category Modal */}
                  <AddCategoryModal
                    show={showAddModal}
                    onHide={() => setShowAddModal(false)}
                    refreshCategories={() => dispatch(fetchCategories())}
                  />

                  {/* Edit Category Modal */}
                  <EditCategoryModal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    category={currentCategory}
                    refreshCategories={() => dispatch(fetchCategories())}
                  />

                  {/* Delete Confirmation Modal */}
                  <Modal
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Delete Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>Are you sure you want to delete the category "{currentCategory?.categoryName}"?</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => setShowDeleteModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button variant="danger" onClick={confirmDeleteCategory}>
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RestaurantCategory;
