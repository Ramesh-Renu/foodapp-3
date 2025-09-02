import React, { useEffect } from "react";
import { FaCheckCircle, FaReceipt, FaShoppingBag, FaUtensils, FaWalking } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersTracking } from "../redux/action/OrderTrackingAction";
import "../assets/css/OrderTracking.css"

const OrderTrackingModal = ({ userId, orderId, onClose }) => {

  const steps = [
    { label: "Order Received", time: "11.00 am", icon: <FaReceipt />, step: 1 },
    { label: "Food is Preparing", time: "11.05 am", icon: <FaUtensils />, step: 2 },
    { label: "Food is Ready to Pickup", time: "11.15 am", icon: <FaShoppingBag />, step: 3 },
    { label: "Order was Picked", time: "11.15 am", icon: <FaWalking />, step: 4 },
  ];
  const currentStep = 4;
  const dispatch = useDispatch();

  // Fetch order tracking details from Redux state
  const { orders = [], loading, error } = useSelector((state) => state.ordertracking || {});


  useEffect(() => {
    // Parse userId and orderId as integers
    const parsedUserId = parseInt(userId, 10);
    const parsedOrderId = parseInt(orderId, 10);
    console.log("Parsed UserId:", parsedUserId, "Parsed OrderId:", parsedOrderId);

    if (!isNaN(parsedUserId) && !isNaN(parsedOrderId)) {
      dispatch(fetchOrdersTracking({ userId: parsedUserId, orderId: parsedOrderId }));
    }
  }, [dispatch, userId, orderId]);

  if (loading) {
    return (
      <div className="order-tracking-modal">
        <p className="text-center">Loading order tracking details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-tracking-modal">
        <p className="text-center text-danger">Error: {error}</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="order-tracking-modal">
        <p className="text-center">No orders found.</p>
      </div>
    );
  }

  // Parse orderId for comparison
  const parsedOrderId = parseInt(orderId, 10);
  const order = orders.find((order) => order.orderId === parsedOrderId);
  console.log("Order data:", order);

  if (!order) {
    return (
      <div className="order-tracking-modal">
        <p className="text-center">Order not found for ID: {orderId}</p>
      </div>
    );
  }

  return (
    <div className="order-tracking-modal">
      <h3 className="text-gray fs-6 text-center d-flex align-items-center justify-content-center">
        <MdOutlineShoppingBag className="text-gray me-2" size={20} /> Order Status
      </h3>
      <div className="border-line mt-3 mb-3"></div>
      <p className="text-m font-bold text-primary mt-2 d-flex align-items-center justify-content-center">
        <span className="text-primary">
          <FaCheckCircle />
        </span>{" "}
        Your Order Successfully Placed
      </p>
      <div className="border-line mt-3 mb-3"></div>
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col-4">
            <img
              src={order.orderDetails[0]?.imageUrl || "default-image-url.jpg"}
              alt={order.orderDetails[0]?.itemName || "Default Item"}
              className="view-cart-restaurant-img"
            />
          </div>
          <div className="col-8">
            <h4 className="fs-3">{order.orderDetails[0]?.itemName || "N/A"}</h4>
            <p className="text-gray fw-bold">
              {order.orderDetails[0]?.description || "No description available"}
            </p>
            <p className="text-gray d-flex align-items-center">
              <IoStar size={20} className="text-success me-1" />
              {order.orderDetails[0]?.averageRating || "N/A"}
            </p>
          </div>
        </div>
      </div>
      <div className="border-line mt-3 mb-3"></div>
      <div className="container mt-5">
      <div
        className="d-flex align-items-center position-relative"
        style={{
          backgroundColor: "#eefbee",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        {/* Timeline background line */}
        <div
          className="position-absolute"
          style={{
            top: "50%",
            left: "8%", // Adjust left margin
            right: "8%", // Adjust right margin
            height: "4px",
            backgroundColor: "#d3d3d3",
            zIndex: "0",
            transform: "translateY(-50%)",
          }}
        ></div>

        {/* Highlighted progress bar */}
        <div
          className="position-absolute"
          style={{
            top: "50%",
            left: "8%",
            width: `${(currentStep / steps.length) * 84}%`, // Match the adjusted margin
            height: "4px",
            backgroundColor: "#28a745",
            zIndex: "1",
            transform: "translateY(-50%)",
          }}
        ></div>

        {/* Steps */}
        {steps.map((step, index) => (
          <div
            key={index}
            className="text-center position-relative"
            style={{
              zIndex: "2",
              flex: "1",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Step icon */}
            <div
              className={`rounded-circle mb-2 ${
                currentStep >= step.step ? "bg-success text-white" : "bg-light text-muted"
              }`}
              style={{
                width: "50px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
              {step.icon}
            </div>

            {/* Line connector */}
            {index !== steps.length - 1 && (
              <div
                className="position-absolute"
                style={{
                  top: "50%",
                  right: "-50%",
                  width: "100%",
                  height: "4px",
                  backgroundColor: currentStep > step.step ? "#28a745" : "#d3d3d3",
                  zIndex: "-1",
                }}
              ></div>
            )}

            {/* Step label */}
            <div style={{ fontSize: "14px", fontWeight: "bold" }}>{step.label}</div>
            {/* Step time */}
            <div className="text-muted" style={{ fontSize: "12px" }}>
              {step.time}
            </div>
          </div>
        ))}
      </div>
    </div>
      <div className="order-details mt-4">
        <h5>Order Summary</h5>
        <ul>
          {order.orderDetails.map((detail, index) => (
            <li key={index}>
              {detail.itemName} - ₹{detail.price} x {detail.quantity}
            </li>
          ))}
        </ul>
        <p className="fw-bold">Total Amount: ₹{order.totalAmount}</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OrderTrackingModal;
