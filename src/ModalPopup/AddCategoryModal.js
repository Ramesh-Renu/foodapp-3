import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createCategory } from "../redux/action/RestaurantAdmin/RestaurantAdminCategoryAction";

const validationSchema = Yup.object().shape({
  categoryName: Yup.string()
    .required("Category name is required"),

});

const AddCategoryModal = ({ show, onHide, refreshCategories }) => {
  const dispatch = useDispatch();

  const initialValues = {
    categoryName: ""
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(createCategory({ categoryName: values.categoryName }))
      .then(() => {
        refreshCategories();
        resetForm();
        onHide();
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form>
            <Modal.Body>
              <div className="form-group">
                <label htmlFor="categoryName">Category Name</label>
                <Field
                  type="text"
                  id="categoryName"
                  name="categoryName"
                  className={`form-control ${
                    touched.categoryName && errors.categoryName ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="categoryName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </Modal.Body>
            <Modal.Footer>              
              <Button 
                variant="primary" className="btn-admin-primary" 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add"}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddCategoryModal;