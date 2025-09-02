import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/css/Otp.css";
import Login from "../assets/images/login.png";
import { RiBallPenFill } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { VERIFY_OTP } from '../redux/query/LoginOtpQuery';
import { setUserData } from '../redux/slicer/LoginOtpSlicer';
import { IoMdClose } from 'react-icons/io';
import * as yup from 'yup';

const Otp = ({ phoneNumber, closeModal }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verifyOtp, { loading }] = useMutation(VERIFY_OTP);

  // Validation schema
  const otpSchema = yup.object().shape({
    otpCode: yup
      .string()
      .required('Please enter the OTP')
      .length(6, 'OTP must be exactly 6 digits')
      .matches(/^\d+$/, 'OTP must only contain numbers')
  });

  const handleOtpChange = (index, value) => {
    if (value.match(/^[0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError(''); // Clear error message on input
      if (index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace') {
      const newOtp = [...otp];
      if (otp[index] !== '') {
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
  
    try {
      await otpSchema.validate({ otpCode });
      setError(''); // Clear error if validation passes
  
      const { data } = await verifyOtp({
        variables: { otpCode, phoneNumber },
      });
  
      if (data?.verifyWebOtp?.success) {
        closeModal(); // Close the modal
        navigate('/MyAccount');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        setError(error.message); // Validation error from Yup
      } else {
        console.error('Error verifying OTP:', error);
        setError('Something went wrong. Please try again.');
      }
    }
  };
  

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center main-otp" style={{ height: "auto" }}>
      <div className="row w-100">
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h2 className="mb-4 text-sign">Sign in</h2>
          <div>
            <p className="number fs-4 text-gray masked-ph">
              {phoneNumber && phoneNumber.length >= 10
                ? `+91 xxxxx xx${phoneNumber.slice(-3)}`
                : '+91 xxxxx xxxxx'}

              <span
                className="edit-option"
                onClick={closeModal}
              >
                Edit <RiBallPenFill />
              </span>
            </p>
          </div>

          <div className="d-flex justify-content-center align-items-center mb-3">
            <label className="fs-4 ff-secondary-bold">OTP</label>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  className="form-control text-center mx-2 fs-6 border-5"
                  style={{ width: "49px" }}
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  
                />
              ))}
            </div>
            {error && (
              <p className="text-danger fw-bold text-center mt-2">{error}</p>
            )}
            <div className="text-center p-2 login-btn-div border-0">
              <button type="submit" className="btn btn-submit mb-2 mt-4" style={{ cursor: "pointer" }} disabled={loading}>
                {loading ? 'Verifying...' : 'Confirmation'}
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-6 p-0">
          <img src={Login} alt="Login" className="img-fluid" />
          <IoMdClose className="btn-model-close" />
        </div>
      </div>
    </div>
  );
};

export default Otp;