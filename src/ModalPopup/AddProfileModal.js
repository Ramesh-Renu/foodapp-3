import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { CREATE_USER_PROFILE } from "../redux/query/UserProfileQuery";
import { profileSuccess, profileFailure } from "../redux/slicer/UserProfileSlicer";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddProfileModal = ({ show, onClose, userId }) => {
  const dispatch = useDispatch();
  const { loading: createLoading } = useSelector((state) => state.userProfile);

  // Create User Profile Mutation
  const [createUserProfile] = useMutation(CREATE_USER_PROFILE, {
    onCompleted: (data) => {
      if (data?.createUserProfile?.success) {
        dispatch(profileSuccess(data.createUserProfile));
        formik.resetForm();
        onClose();
      } else {
        dispatch(profileFailure(data.createUserProfile.message || 'Failed to create user profile'));
      }
    },
    onError: (error) => {
      dispatch(profileFailure(error.message));
    },
    refetchQueries: ['GET_USER_PROFILES'],
  });

  // validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First Name is required")
      .matches(/^[A-Za-z\s]+$/, "First Name must contain only alphabets"),
    lastName: Yup.string()
      .required("Last Name is required")
      .matches(/^[A-Za-z\s]+$/, "Last Name must contain only alphabets"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createUserProfile({
          variables: {
            userId,
            firstName: values.firstName,
            lastName: values.lastName,
          },
        });
      } catch (error) {
        console.error("Error creating profile:", error);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-dialog modal-add-profile" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Add Profile
            </h5>
            <button
              type="button"
              className="close"
              onClick={handleClose}
            >
              <IoCloseSharp size={20} />
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3 mt-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter first name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="text-danger">{formik.errors.firstName}</div>
                )}
              </div>
              <div className="mb-3 mt-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter last name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="text-danger">{formik.errors.lastName}</div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 mt-4"
                disabled={createLoading}
              >
                {createLoading ? "Saving..." : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProfileModal;
