import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_PROFILE } from "../redux/query/UpdateUserProfileQuery";
import { updateProfileStart, updateProfileSuccess, updateProfileError, resetProfileState } from "../redux/slicer/UpdateUserProfileSlicer";
import { setUserData } from "../redux/slicer/LoginOtpSlicer";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditProfileModal = ({ show, onClose, userData, userId }) => {
  const dispatch = useDispatch();
  const { loading: updateLoading, error: updateError } = useSelector((state) => state.profile);

  // Update Profile Mutation
  const [updateProfile] = useMutation(UPDATE_USER_PROFILE, {
    onCompleted: (data) => {
      if (data?.updateUser?.success && data?.updateUserProfile?.success) {
        const updatedUserData = {
          ...userData,
          email: data.updateUser.data.email,
          phoneNumber: data.updateUser.data.phoneNumber,
          userProfiles: [
            {
              ...userData.userProfiles[0],
              firstName: data.updateUserProfile.data.firstName,
              lastName: data.updateUserProfile.data.lastName,
            },
          ],
        };
        dispatch(updateProfileSuccess(updatedUserData));
        dispatch(setUserData(updatedUserData));
        onClose();
      }
    },
    onError: (error) => {
      dispatch(updateProfileError(error.message));
    },
  });

  useEffect(() => {
    if (userData?.userProfiles?.length > 0) {
      formik.setValues({
        firstName: userData.userProfiles[0].firstName || "",
        lastName: userData.userProfiles[0].lastName || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
      });
    }
  }, [userData]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
      .required("First Name is required")
      .matches(/^[A-Za-z\s]+$/, "First Name must contain only alphabets"),
    lastName: Yup.string()
      .required("Last Name is required")
      .matches(/^[A-Za-z\s]+$/, "Last Name must contain only alphabets"),
      email: Yup.string().email("Invalid email format").required("Email is required"),
      phoneNumber: Yup.string().required("Phone Number is required"),
    }),
    onSubmit: async (values) => {
      dispatch(updateProfileStart());
      try {
        await updateProfile({
          variables: {
            userId: userId,
            email: values.email,
            phoneNumber: values.phoneNumber,
            firstName: values.firstName,
            lastName: values.lastName,
            profileId: userData.userProfiles?.[0]?.userProfileId,
          },
        });
      } catch (error) {
        console.error("Update Profile Error:", error);
        dispatch(updateProfileError(error.message));
      }
    },
  });

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-dialog modal-add-profile" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" >
              Edit Profile
            </h5>
            <button
              type="button"
              className="close"
              onClick={onClose}
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
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-danger">{formik.errors.firstName}</div>
                ) : null}
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
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-danger">{formik.errors.lastName}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  placeholder="Enter your phone number"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className="text-danger">{formik.errors.phoneNumber}</div>
                ) : null}
              </div>
              {updateError && (
                <div className="alert alert-danger" role="alert">
                  {updateError}
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary w-100 mt-4"
                disabled={updateLoading}
              >
                {updateLoading ? "Saving..." : "Update"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
