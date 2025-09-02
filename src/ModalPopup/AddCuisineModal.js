import React from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { addCuisineType } from "../redux/action/RestaurantAdmin/RestaurantAdminCuisineAction";

const AddCuisineModal = ({ show, onClose }) => {
  const dispatch = useDispatch();

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Cuisine name is required")
      .matches(/^[A-Za-z\s]+$/, "Cuisine Name must contain only alphabets")
      .trim(),

  });

  // Initial values
  const initialValues = { name: "" };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await dispatch(addCuisineType(values)).unwrap(); 
      resetForm(); 
      onClose(); 
    } catch (error) {
      console.error("Failed to add cuisine:", error);
    } finally {
      setSubmitting(false); 
      
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Cuisine Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
                />
                {touched.name && errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <Button
                type="submit" variant="primary"
                className="btn-admin-primary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Cuisine"}
              </Button>
            </form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddCuisineModal;
