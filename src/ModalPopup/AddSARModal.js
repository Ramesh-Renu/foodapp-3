import React, { useEffect } from "react";
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .matches(/^[A-Za-z\s]+$/, "Username must contain only alphabets"),

  email: Yup.string()
  .required("Email is required")
  .email("Invalid email address"),
  
  password: Yup.string()
    .when("isNewUser", {
      is: true,
      then: () => Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
  restaurantId: Yup.string()
    .required("Please select a restaurant"),
});

const AddSARModal = ({ title, onClose, onSave, user, restaurants }) => {
  const initialValues = {
    username: user?.username || "",
    email: user?.email || "",
    restaurantId: user?.restaurantId || "",
    password: "",
    isActive: user?.isActive || true,
    isNewUser: !user,
  };

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

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              const dataToSend = {
                ...values,
                ...(user && { restaurantUserId: user.restaurantUserId }),
              };
              onSave(dataToSend);
              setSubmitting(false);
            }}
          >
            {({ values, errors, touched, handleChange, setFieldValue, isSubmitting }) => (
              <Form>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <Field
                      type="text"
                      className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
                      name="username"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <Field
                      type="email"
                      className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                      name="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {!user && (
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <Field
                        type="password"
                        className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                        name="password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Restaurant</label>
                    <Select
                      className={`basic-single ${errors.restaurantId && touched.restaurantId ? 'is-invalid' : ''}`}
                      classNamePrefix="select"
                      name="restaurantId"
                      value={
                        restaurants
                          .map((restaurant) => ({
                            value: restaurant.restaurantId,
                            label: restaurant.restaurantName,
                          }))
                          .find((option) => option.value === values.restaurantId) || null
                      }
                      onChange={(selectedOption) => {
                        setFieldValue(
                          "restaurantId",
                          selectedOption ? selectedOption.value : ""
                        );
                      }}
                      options={restaurants.map((restaurant) => ({
                        value: restaurant.restaurantId,
                        label: restaurant.restaurantName,
                      }))}
                      styles={customStyles}
                      placeholder="Select Restaurant"
                      isClearable
                    />
                    <ErrorMessage
                      name="restaurantId"
                      component="div"
                      className="invalid-feedback d-block"
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddSARModal;