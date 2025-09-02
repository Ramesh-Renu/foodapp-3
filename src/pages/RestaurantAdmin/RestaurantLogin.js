import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'; 
import { useDispatch, useSelector } from 'react-redux';
import User1 from "../../assets/images/restaurantUser_1.png";
import logo2 from "../../assets/images/logo2.svg";
import "../../assets/css/RestaurantLogin.css";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import { LOGIN_RESTAURANT_USER } from '../../redux/query/restaurantUserQuery';
import { restaurantUserLogin } from '../../redux/action/RestaurantAdmin/RestaurantAdminLoginUserAction';
import { showToast } from '../../redux/slicer/Toast';

const RestaurantLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); 

  const { loading, error, user} = useSelector((state) => state.restaurantUser);  

  const togglePasswordVisibility = () => setShowPassword(prevState => !prevState);

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
  });

  const handleSubmit = (values) => {
    dispatch(restaurantUserLogin(values))
      .then((response) => {
        const { success, data, message } = response.payload;
        if (success) {
          // alert(message);
          
          navigate(data.isSuperAdmin ? "/SADashboard" : "/dashboard");
        } else {
          alert(message || 'Login failed');
        }
      })
      .catch(() => {
        alert('An error occurred during login');
      });
  };


  return (
    <div className="restaurantlogic container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="row shadow-lg h-75">
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h4 className="mb-5 restaurant-heading text-center font-italic">"Welcome Back! Please log in to manage your restaurant."</h4>
          
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="mt-6">
                  <label htmlFor="username" className="form-label">Username</label>
                  <Field
                    type="text"
                    className="form-control rounded-3"
                    id="username"
                    name="username"
                    placeholder="Enter the Username"
                  />
                  <ErrorMessage name="username" component="div" className="text-danger mt-1" />
                </div>
                <div className="mt-6 position-relative">
                  <label htmlFor="password" className="form-label mt-3">Password</label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    className="form-control rounded-3"
                    id="password"
                    name="password"
                    placeholder="Enter your Password"
                  />
                  <span 
                    className="position-absolute end-0 translate-middle-y me-3"
                    onClick={togglePasswordVisibility} 
                    style={{ cursor: 'pointer' }}
                  >
                    {showPassword ? <FaRegEye size={20} style={{ marginBottom: "40px" }} /> : <FaRegEyeSlash size={20} style={{ marginBottom: "40px" }} />}
                  </span>
                  <ErrorMessage name="password" component="div" className="text-danger mt-1" />
                </div>
                {error && <div className="text-danger mt-2">Login failed: {error.message}</div>}
                <button 
                  type="submit" 
                  className="btn-submit mt-5"
                  // disabled={loading}
                >
                Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-md-6 p-0 restaurant-images restaurant-login-right">
          <img src={logo2} alt="user2" className="img-fluid user2-img" />
        </div>
      </div>
    </div>
  );
};

export default RestaurantLogin;
