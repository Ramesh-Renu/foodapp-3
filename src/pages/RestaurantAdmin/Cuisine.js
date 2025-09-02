import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/RestaurantAdmin/Navbar";
import Sidebar from "../../components/RestaurantAdmin/Sidebar";
import React, { useState, useEffect } from 'react';
import { Table, Button } from "react-bootstrap";
import { fetchCuisineTypes, deleteCuisineType } from '../../redux/action/RestaurantAdmin/RestaurantAdminCuisineAction';
import AddCuisineModal from '../../ModalPopup/AddCuisineModal';
import EditCuisineModal from '../../ModalPopup/EditCuisineModal';
import DeleteCuisineModal from '../../ModalPopup/DeleteCuisineModal'; // Import the delete modal
import { FaRegEdit } from "react-icons/fa";

const RestaurantCuisine = () => {
  const dispatch = useDispatch();
  const { cuisineTypes, loading, error } = useSelector((state) => state.cuisines);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(fetchCuisineTypes());
  }, [dispatch]);

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleEdit = (cuisine) => {
    setSelectedCuisine(cuisine);
    setShowEditModal(true);
  };

  const handleDelete = (cuisine) => {
    setSelectedCuisine(cuisine);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteCuisineType(selectedCuisine.cuisineTypeId)).unwrap();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Failed to delete cuisine:', error);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-danger text-center">Error: {error}</p>;

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
                  <h2 className="title-1 font-secondary-bold">Cuisine Types</h2>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <Button
                    variant="primary"
                    onClick={handleAdd}
                    className="btn-add"
                  >
                    Add Cuisine +
                  </Button>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <ul className="admin-menu-category">
                {cuisineTypes.map((cuisine) => (
                       <li key={cuisine.cuisineTypeId}>
                          {cuisine.name}
                          <div>
                          <Button
                                className="btn-admin-edit"
                                onClick={() => handleEdit(cuisine)}
                              >
                                Edit <FaRegEdit size={18} className="ms-2" />
                              </Button>
                            
                            {/* <Button
          variant="danger"
          size="sm"
          onClick={() => handleDelete(cuisine)}
        >
          Delete
        </Button> */}
                          </div>
                        </li>
                      ))}
                    </ul>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      <AddCuisineModal show={showAddModal} onClose={() => setShowAddModal(false)} />
      {selectedCuisine && (
        <EditCuisineModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          cuisine={selectedCuisine}
        />
      )}
      {selectedCuisine && (
        <DeleteCuisineModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={confirmDelete}
          cuisine={selectedCuisine}
        />
      )}
    </main>
  );
};

export default RestaurantCuisine;
