import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../assets/css/Header.css";
import logo from "../assets/images/logo.svg";
import { Modal } from "react-bootstrap";
import LoginPage from "../pages/LoginPage";
import { clearUser } from "../redux/slicer/LoginOtpSlicer";
import OrderTrackingModal from "../ModalPopup/OrderTrackingModal";
import { fetchOrdersTracking } from "../redux/action/OrderTrackingAction";
import homeIcon from "../assets/images/home-icon-green.svg";
import profileicon from "../assets/images/profile-icon-green.svg";
import foodIcon from "../assets/images/food-icon-green.svg";
import restaurantIcon from "../assets/images/restaurant-icon-green.svg";

export const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showOrdersDropdown, setShowOrdersDropdown] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showOrderTracking, setShowOrderTracking] = useState(false);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  const { orders } = useSelector((state) => state.ordertracking || {});
  const { userData, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && userId) {
      dispatch(fetchOrdersTracking({ userId: parseInt(userId, 10) }));
    }
  }, [isAuthenticated, userId, dispatch]);

  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  const handleOrdersHover = () => {
    setShowOrdersDropdown(true);
  };

  const handleOrdersLeave = () => {
    setShowOrdersDropdown(false);
  };

  const handleOrderClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowOrderTracking(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    dispatch({ type: "LOGOUT" });
    dispatch(clearUser());
    navigate("/");
  };

  const firstName =
    userData?.userProfiles?.length > 0
      ? userData.userProfiles[0].firstName || "Profile"
      : "Profile";

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: (
        <img
          src={homeIcon}
          alt="Home navigation icon"
          className="header-nav-icons"
        />
      ),
    },
    {
      name: "Food",
      path: "/Food",
      icon: (
        <img
          src={foodIcon}
          alt="Home navigation icon"
          className="header-nav-icons"
        />
      ),
    },
    {
      name: "Restaurants",
      path: "/Restaurants",
      icon: (
        <img
          src={restaurantIcon}
          alt="Home navigation icon"
          className="header-nav-icons"
        />
      ),
    },
    { name: "Cart", path: "#" },
  ];

  return (
    <header className="header py-2">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>

          {/* Hamburger Icon */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-expanded={!isNavbarCollapsed ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Menu */}
          <div
            className={`collapse navbar-collapse ${
              isNavbarCollapsed ? "" : "show"
            }`}
          >
            <ul className="navbar-nav ms-auto d-flex align-items-center">
              {navItems.map((item) => (
                <li className="nav-item font-primary-medium" key={item.name}>
                  <Link
                    to={item.path}
                    className={`nav-link ${
                      location.pathname === item.path ||
                      (location.pathname === "/Restaurant-List" && item.name === "Restaurants")
                        ? "active"
                        : ""
                    }`}
                  >
                    {item.icon} {item.name}
                  </Link>
                </li>
              ))}
              {isAuthenticated && (
                <li
                  className="font-primary-medium nav-item position-relative"
                  onMouseEnter={handleOrdersHover}
                  onMouseLeave={handleOrdersLeave}
                >
                  <span className="nav-link font-primary-medium">
                    Order Status
                  </span>
                  {showOrdersDropdown && (
                    <div
                      className="dropdown-menu show position-absolute"
                      style={{
                        top: "100%",
                        left: "0",
                        zIndex: 1000,
                        minWidth: "200px",
                        backgroundColor: "white",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                      }}
                    >
                      {orders.length > 0 ? (
                        orders.map((order) => (
                          <button
                            key={order.orderId}
                            className="dropdown-item"
                            onClick={() => handleOrderClick(order.orderId)}
                          >
                            Order #{order.orderId} - ₹{order.totalAmount}
                          </button>
                        ))
                      ) : (
                        <span className="no-order">No Order for now</span>
                      )}
                    </div>
                  )}
                </li>
              )}
              {isAuthenticated ? (
                <li className="font-primary-medium nav-item position-relative">
                  <div
                    onMouseEnter={() => setShowProfileModal(true)}
                    onMouseLeave={() => setShowProfileModal(false)}
                  >
                    <Link
                      to="/MyAccount"
                      className={`nav-link d-flex align-items-center nav-header-profile ${
                        location.pathname === "/MyAccount" ? "active" : ""
                      }`}
                    >
                      <img
                        src={profileicon}
                        alt="Home navigation icon"
                        className="header-nav-icons"
                      />
                      <span className="font-primary-medium">{firstName}</span>
                    </Link>
                    <div
                      className="position-absolute top-100"
                      style={{
                        display: showProfileModal ? "block" : "none",
                        minWidth: "200px",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        zIndex: 1000,
                      }}
                    >
                      <div className="p-2">
                        <Link
                          to="/MyAccount"
                          className="font-primary-medium d-block text-decoration-none p-2 text-dark rounded hover-primary"
                        >
                          <i className="fas fa-user me-2"></i>
                          Profile
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-100 text-start border-0 bg-transparent p-2 text-dark rounded hover-primary"
                        >
                          <i className="fas fa-sign-out-alt me-2"></i>
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li className="nav-item">
                  <a className="btn" onClick={() => setShowLoginModal(true)}>
                    Sign In
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <Modal
        className="login-modal"
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        centered
        size="lg"
      >
        <Modal.Body className="p-0">
          <LoginPage closeModal={() => setShowLoginModal(false)} />
        </Modal.Body>
      </Modal>

      {/* Order Tracking Modal */}
      <Modal
        className="OrderTrackingModal"
        show={showOrderTracking}
        onHide={() => setShowOrderTracking(false)}
        centered
        size="lg"
      >
        <Modal.Body className="p-0">
          {showOrderTracking && (
            <OrderTrackingModal
              userId={userId}
              orderId={selectedOrderId}
              onClose={() => setShowOrderTracking(false)}
            />
          )}
        </Modal.Body>
      </Modal>
    </header>
  );
};

export default Header;
