import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/css/Login.css";
import Login from "../assets/images/login.png";
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/css/Otp.css";
import { RiBallPenFill } from "react-icons/ri";
import { VERIFY_OTP } from '../redux/query/LoginOtpQuery';


const OTPModal = ({ show, onHide }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const navigate = useNavigate();
    const location = useLocation();
    const phoneNumber = location.state?.phoneNumber;
    const dispatch = useDispatch();
    const [verifyOtp, { loading }] = useMutation(VERIFY_OTP);
  
    const handleOtpChange = (index, value) => {
      if (value.match(/^[0-9]$/)) {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
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
      console.log('Entered OTP:', otpCode);
  
      try {
        const { data } = await verifyOtp({
          variables: { otpCode, phoneNumber }
        });
  
        if (data?.verifyWebOtp?.success) {
          navigate('/MyAccount');
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
      }
    };
    const handleClose = () => {
        onHide();
      };
    return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
      <div className="row shadow-lg w-100" style={{ maxWidth: "850px" }}>
        <div className="col-md-6 d-flex flex-column justify-content-center" style={{ marginTop: "-60px" }}>
          <h2 className="mb-4 text-sign">Sign in</h2>
          <div>
            <p className="number fs-4" style={{ marginLeft: "63px" }}>
              {phoneNumber && phoneNumber.length >= 10 
                ? `+91 ${phoneNumber.slice(0, 2)}xxxxx${phoneNumber.slice(-3)}`
                : '+91 xxxxxxxxxx'}
            </p>
            <span
              className="edit-option"
              style={{ position: "absolute", marginTop: "-32px", marginLeft: "273px", color: "#1300F0" }}
            >
              Edit <RiBallPenFill />
            </span>
          </div>

          <div className="d-flex justify-content-center align-items-center mb-3">
            <label className="fs-4">OTP</label>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  className="form-control text-center mx-2 fs-6"
                  style={{ width: "49px" }}
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  required
                />
              ))}
            </div>
            <button type="submit" className="btn btn-submit mb-2 mt-4" style={{ cursor: "pointer !important" }} disabled={loading}>
              {loading ? 'Verifying...' : 'Confirmation'}
            </button>
          </form>
        </div>

        <div className="col-md-6 p-0">
          <img src={Login} alt="Login" className="img-fluid" />
        </div>
      </div>6
      </Modal.Body>
    </Modal>
  );
};

export default OTPModal;
