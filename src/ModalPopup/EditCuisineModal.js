import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { editCuisineType } from "../redux/action/RestaurantAdmin/RestaurantAdminCuisineAction";

const EditCuisineModal = ({ show, onClose, cuisine }) => {
  const dispatch = useDispatch();

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Cuisine name is required")
      .matches(/^[A-Za-z\s]+$/, "Cuisine Name must contain only alphabets")
      .trim(),

  });

  // Initial values
  const initialValues = {
    name: cuisine?.name || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(
        editCuisineType({
          cuisineTypeId: cuisine.cuisineTypeId,
          updatedCuisine: values,
        })
      ).unwrap(); // Await dispatch to ensure it completes
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to edit cuisine:", error);
    } finally {
      setSubmitting(false); // Stop loading state
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Cuisine Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize // Ensures form updates when `cuisine` changes
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
              <label htmlFor="cuisineName">Cuisine Name</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${
                    touched.name && errors.name ? "is-invalid" : ""
                  }`}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Cuisine Name"
                  required
                />
                {touched.name && errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <Button
                type="submit"
                variant="primary" className="btn-admin-primary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Cuisine"}
              </Button>
            </form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default EditCuisineModal;
