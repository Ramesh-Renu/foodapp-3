import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Formik } from "formik";
import * as Yup from "yup";
import "../assets/css/AddressModal.css";
import { MdMyLocation } from "react-icons/md";
import Select from "react-select";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal"
];
const AddressModal = ({
  show,
  onClose,
  address,
  onSubmit,
  isEditing,
}) => {
  if (!show) return null;

  const validationSchema = Yup.object().shape({
    addressType: Yup.string()
      .required("Address type is required")
      .matches(/^[A-Za-z\s]+$/, "Address Type must contain only alphabets"),

    locality: Yup.string()
      .required("Locality is required")
      .matches(/^[A-Za-z\s]+$/, "Locality must contain only alphabets"),

    houseNumber: Yup.string()
      .required("House number is required")
      .matches(/^\d+$/, "House number must contain only numbers"),

    streetName: Yup.string()
      .required("Street name is required")
      .matches(/^[A-Za-z\s]+$/, "Street Name must contain only alphabets"),

    city: Yup.string()
      .required("City is required")
      .matches(/^[A-Za-z\s]+$/, "City must contain only alphabets"),

    address: Yup.string()
      .required("Address is required")
      .matches(/^[A-Za-z\s]+$/, "Address must contain only alphabets"),

    state: Yup.string()
      .required("State is required"),
    postalCode: Yup.string()
      .required("Postal code is required")
      .matches(/^\d{6}$/, "Postal code must be exactly 6 digits and contain only numbers"),

    latitude: Yup.number()
      .required("Latitude is required")
      .min(-90, "Latitude must be between -90 and 90")
      .max(90, "Latitude must be between -90 and 90"),
    longitude: Yup.number()
      .required("Longitude is required")
      .min(-180, "Longitude must be between -180 and 180")
      .max(180, "Longitude must be between -180 and 180"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    onSubmit(values);
    setSubmitting(false);
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
    <section className="address_modal">
      <div className="address_modal-overlay">
        <div className="address_modal-dialog" role="document">
          <div className="address_modal-content modal-body">
            <div className="address_modal-header modal-header mb-4">
              <h5 className="address_modal-title font-secondary-bold">
                {isEditing ? "Edit Address" : "Add Address"}
              </h5>
              <button type="button" className="address_modal-close" onClick={onClose}>
                <IoCloseSharp size={25} />
              </button>
            </div>

            <div className="address_modal-location mt-1">
              <button>
                <MdMyLocation size={20} />
                <span className="font-secondary-bold">Use Current Location</span>
              </button>
            </div>


            <div className="address_modal-body">
              <Formik
                initialValues={address}
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
                  <form className="address_modal-form" onSubmit={handleSubmit}>
                    <div className="address_modal-form-group mt-4">
                      <label htmlFor="addressType">Address Type</label>
                      <input
                        type="text"
                        id="addressType"
                        placeholder="Enter Address type"
                        className={`address_modal-form-control ${errors.addressType && touched.addressType ? "is-invalid" : ""
                          }`}
                        value={values.addressType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.addressType && touched.addressType && (
                        <div className="invalid-feedback">{errors.addressType}</div>
                      )}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                      <div className="address_modal-form-group">
                        <label htmlFor="locality">Locality</label>
                        <input
                          type="text"
                          id="locality"
                          placeholder="Enter Locality"
                          className={`address_modal-form-control ${errors.locality && touched.locality ? "is-invalid" : ""
                            }`}
                          value={values.locality}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.locality && touched.locality && (
                          <div className="invalid-feedback">{errors.locality}</div>
                        )}
                      </div>

                      <div className="address_modal-form-group">
                        <label htmlFor="houseNumber">House Number</label>
                        <input
                          type="text"
                          id="houseNumber"
                          placeholder="Enter House Number"
                          className={`address_modal-form-control ${errors.houseNumber && touched.houseNumber ? "is-invalid" : ""
                            }`}
                          value={values.houseNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.houseNumber && touched.houseNumber && (
                          <div className="invalid-feedback">{errors.houseNumber}</div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                      <div className="address_modal-form-group">
                        <label htmlFor="streetName">Street Name</label>
                        <input
                          type="text"
                          id="streetName"
                          placeholder="Enter Street Name"
                          className={`address_modal-form-control ${errors.streetName && touched.streetName ? "is-invalid" : ""
                            }`}
                          value={values.streetName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.streetName && touched.streetName && (
                          <div className="invalid-feedback">{errors.streetName}</div>
                        )}
                      </div>

                      <div className="address_modal-form-group">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          id="city"
                          placeholder="Enter City"
                          className={`address_modal-form-control ${errors.city && touched.city ? "is-invalid" : ""
                            }`}
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.city && touched.city && (
                          <div className="invalid-feedback">{errors.city}</div>
                        )}
                      </div>
                    </div>

                    <div className="address_modal-form-group">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        id="address"
                        placeholder="Enter Address"
                        className={`address_modal-form-control ${errors.address && touched.address ? "is-invalid" : ""
                          }`}
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.address && touched.address && (
                        <div className="invalid-feedback">{errors.address}</div>
                      )}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                      <div className="address_modal-form-group">
                        <label htmlFor="state">State</label>
                        <Select id="state"
                          className={`address_modal-form-control ${errors.state && touched.state ? "is-invalid" : ""
                            }`}
                          options={indianStates.map((state) => ({ value: state, label: state }))}
                          value={values.state ? { value: values.state, label: values.state } : null}
                          onChange={(selectedOption) => handleChange({ target: { id: 'state', value: selectedOption.value } })}
                          onBlur={handleBlur}
                          styles={customStyles}
                        />
                        {errors.state && touched.state && (
                          <div className="invalid-feedback">{errors.state}</div>
                        )}
                      </div>

                      <div className="address_modal-form-group">
                        <label htmlFor="postalCode">Postal Code</label>
                        <input
                          id="postalCode"
                          className={`address_modal-form-control ${errors.postalCode && touched.postalCode ? "is-invalid" : ""
                            }`}
                          placeholder="Enter Postal Code"
                          value={values.postalCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.postalCode && touched.postalCode && (
                          <div className="invalid-feedback">{errors.postalCode}</div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                      <div className="address_modal-form-group">
                        <label htmlFor="latitude">Latitude</label>
                        <input
                          type="number"
                          id="latitude"
                          placeholder="Enter Latitude"
                          className={`address_modal-form-control ${errors.latitude && touched.latitude ? "is-invalid" : ""
                            }`}
                          value={values.latitude}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.latitude && touched.latitude && (
                          <div className="invalid-feedback">{errors.latitude}</div>
                        )}
                      </div>

                      <div className="address_modal-form-group">
                        <label htmlFor="longitude">Longitude</label>
                        <input
                          type="number"
                          id="longitude"
                          placeholder="Enter Longitude"
                          className={`address_modal-form-control ${errors.longitude && touched.longitude ? "is-invalid" : ""
                            }`}
                          value={values.longitude}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.longitude && touched.longitude && (
                          <div className="invalid-feedback">{errors.longitude}</div>
                        )}
                      </div>
                    </div>

                    <div className="address_modal-form-actions">
                      <button
                        type="submit"
                        className="address_modal-btn address_modal-btn-primary mt-4"
                        disabled={isSubmitting}
                      >
                        {isEditing ? "Update Address" : "Add Address"}
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddressModal;