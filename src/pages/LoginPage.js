import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/css/Login.css";
import Login from "../assets/images/login.png";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { REGISTER_USER } from '../redux/query/LoginOtpQuery';
import { setUserData, setUserId } from '../redux/slicer/LoginOtpSlicer';
import Otp from '../pages/Otp';
import india from '../assets/images/india.png';
import { FaChevronDown } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useFormik } from 'formik';
import * as yup from 'yup';

const LoginPage = ({closeModal}) => {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { loading }] = useMutation(REGISTER_USER);

  const validationSchema = yup.object({
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .matches(/^[6-9]\d{9}$/, 'Enter a valid phone number'),
  });

  const formik = useFormik({
    initialValues: { phoneNumber: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await registerUser({ variables: { phoneNumber: values.phoneNumber } });
        if (data?.registerUser?.success) {
          const userId = data.registerUser.data.user.userId;
          dispatch(setUserId(userId));
          dispatch(setUserData(data.registerUser.data.user));
          setShowOtpModal(true);
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    },
  });

  const handleCloseOtpModal = () => {
    setShowOtpModal(false);
    formik.resetForm();
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); 
    formik.setFieldValue('phoneNumber', value);
  };

  return (
    <div className="container d-flex align-items-center justify-content-center main-login">
      <div className="row shadow-lg w-100">
        {!showOtpModal ? (
          <>
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <h2 className="mb-4 text-sign">Sign in</h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label fw-bold">Phone Number</label>
                  <div className="input-group">
                    <div className="country-code d-flex align-item-center justify-content-center">
                      <img src={india} alt="India" />
                      <span>+91</span>
                      <FaChevronDown />
                    </div>
                    <input
                      type="tel"
                      className="form-control fs-6 rounded-3"
                      id="phoneNumber"
                      placeholder="Enter Phone Number"
                      value={formik.values.phoneNumber}
                      onChange={handlePhoneNumberChange} 
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <div className="text-danger fw-bold">{formik.errors.phoneNumber}</div>
                  ) : null}
                </div>
                <div className='text-center p-2 login-btn-div'>
                  <button type="submit" className="btn btn-submit mb-2 mt-2" disabled={loading}>
                    {loading ? 'Sending OTP...' : 'Get OTP'}
                  </button>
                </div>
              </form>

              <button className="btn btn-outline-secondary mt-4" style={{ display: 'none' }}>
                <FcGoogle size={30} />
                Continue with Google
              </button>
            </div>
            <div className="col-md-6 p-0">
              <img src={Login} alt="Food" className="img-fluid" />
              <IoMdClose className="btn-model-close" onClick={closeModal} />
            </div>
          </>
        ) : (
          <Otp className="login-modal" phoneNumber={formik.values.phoneNumber} closeModal={handleCloseOtpModal} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
