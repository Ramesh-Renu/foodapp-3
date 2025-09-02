import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { updateRestaurantAndBranch } from "../redux/action/RestaurantAdmin/RestaurantSettingAction";

const EditSettingModal = ({ show, onClose, restaurant, branch }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.restaurantsetting);

  // Validation schema
  const validationSchema = Yup.object({
    houseNumber: Yup.string()
      .required("House number is required"),
  
    streetName: Yup.string()
      .required("Street name is required")
      .matches(/^[A-Za-z\s]+$/, "Street Name must contain only alphabets"),
  
    locality: Yup.string()
      .required("Locality is required")
      .matches(/^[A-Za-z\s]+$/, "Locality must contain only alphabets"),
  
    city: Yup.string()
      .required("City is required")
      .matches(/^[A-Za-z\s]+$/, "City must contain only alphabets"),
  
    state: Yup.string()
      .required("State is required")
      .matches(/^[A-Za-z\s]+$/, "State must contain only alphabets"),
  
    postalCode: Yup.string()
      .required("Postal code is required")
      .matches(/^\d{6}$/, "Postal code must be 6 digits"),
  
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be 10 digits"),
  });
  

  // Initial values
  const initialValues = {
    houseNumber: branch?.houseNumber || "",
    streetName: branch?.streetName || "",
    locality: branch?.locality || "",
    city: branch?.city || "",
    state: branch?.state || "",
    postalCode: branch?.postalCode || "",
    phoneNumber: branch?.phoneNumber || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(
        updateRestaurantAndBranch({
          restaurantId: restaurant.restaurantId,
          branchId: branch.branchId,
          ...values,
        })
      );
      onClose();
    } catch (error) {
      console.error("Failed to update:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    show && (
      <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Restaurant Details</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
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
                  <form onSubmit={handleSubmit}>
                    {[
                      "houseNumber",
                      "streetName",
                      "locality",
                      "city",
                      "state",
                      "postalCode",
                      "phoneNumber",
                    ].map((field) => (
                      <div className="mb-3" key={field}>
                        <label
                          htmlFor={field}
                          className="form-label text-capitalize"
                        >
                          {field.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            touched[field] && errors[field] ? "is-invalid" : ""
                          }`}
                          id={field}
                          name={field}
                          value={values[field]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched[field] && errors[field] && (
                          <div className="invalid-feedback">{errors[field]}</div>
                        )}
                      </div>
                    ))}
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting || loading}
                      >
                        {isSubmitting || loading ? "Updating..." : "Update"}
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EditSettingModal;
