

import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { updateCategory } from "../redux/action/RestaurantAdmin/RestaurantAdminCategoryAction";

const EditCategoryModal = ({ show, onHide, category, refreshCategories }) => {
  const dispatch = useDispatch();

  // Initial values for the form
  const initialValues = {
    categoryName: category?.categoryName || "",
  };

  // Validation schema for the form
  const validationSchema = Yup.object({
    categoryName: Yup.string()
      .required("Category name is required"),

  });

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    const { categoryName } = values;
    dispatch(updateCategory({ categoryId: category.categoryId, categoryName }))
      .then(() => {
        refreshCategories();
        onHide();
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize 
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
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="categoryName">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  name="categoryName"
                  value={values.categoryName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.categoryName && !!errors.categoryName}
                  placeholder="Enter category name"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.categoryName}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" className="btn-admin-primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default EditCategoryModal;
