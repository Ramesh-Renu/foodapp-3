import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoNotificationsOutline } from "react-icons/io5";
import "../../assets/css/Admin/Navbar.css";
import profile from "../../assets/images/contact-2.jpg";
import logo from "../../assets/images/logo.svg";
import { fetchRestaurantUsers } from "../../redux/action/SuperAdmin/SARestaurantUserAction";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const [restaurantUserName, setRestaurantUserName] = useState("");

  useEffect(() => {
    const restaurantUserId = localStorage.getItem("restaurantUserId");

    if (restaurantUserId) {
      if (!users.length) {
        // Fetch users if not already fetched
        dispatch(fetchRestaurantUsers());
      } else {
        // Find the user by ID
        const user = users.find(
          (user) => user.restaurantUserId === parseInt(restaurantUserId)
        );
        if (user) {
          setRestaurantUserName(user.username);
        }
      }
    }
  }, [dispatch, users]);

  useEffect(() => {
    // Update restaurantUserName if users array changes
    const restaurantUserId = localStorage.getItem("restaurantUserId");
    if (restaurantUserId && users.length) {
      const user = users.find(
        (user) => user.restaurantUserId === parseInt(restaurantUserId)
      );
      if (user) {
        setRestaurantUserName(user.username);
      }
    }
  }, [users]);

  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-left navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a className="navbar-brand brand-logo mr-5" href="">
          <img src={logo} alt="logo" />
        </a>
        <a className="navbar-brand brand-logo-mini" href="">
          <img src="images/small-logo.png" alt="logo" />
        </a>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
        <div>
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-toggle="minimize"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-menu"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
        <ul className="top-navbar-area navbar-nav navbar-nav-right d-flex align-items-center">
          <li className="nav-item">
            <a className="nav-link bg-link" href="a">
              <i className="fa fa-envelope text-primary" aria-hidden="true"></i>
            </a>
          </li>
          <li className="nav-item me-3 ms-3">
            <a className="nav-link bg-link count-indicator" href="a">
              <IoNotificationsOutline className="text-dark fs-4" />
              <span className="count"></span>
            </a>
          </li>
          <li className="nav-item nav-profile" >
            <Link className="nav-link" to="/RestaurantSetting" data-toggle="dropdown">
              <img src={profile} alt="profile" />
              <h6 className="me-2 ms-2 mb-0 text-dark">
                {restaurantUserName || "Loading..."}
              </h6>
              <i className="fa fa-angle-down text-dark" aria-hidden="true"></i>
            </Link>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-xl-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span className="ti-layout-grid2"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
