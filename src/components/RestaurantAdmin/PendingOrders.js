import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import "../../assets/css/Admin/Order.css";
import {
  fetchOrdersByRestaurantId,
  updateOrderTrackStatus,
} from "../../redux/action/RestaurantAdmin/RestaurantAdminOrderAction";

const PendingOrders = () => {
  const dispatch = useDispatch();
  const {
    orders = [],
    status,
    error,
  } = useSelector((state) => state.orders || {});
  const [showMenuDetails, setShowMenuDetails] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState([]);
  const [localOrders, setLocalOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderTotalAmt, setSelectedOrderTotalAmt] = useState(null);

  const restaurantId = localStorage.getItem("restaurantId");

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchOrdersByRestaurantId(Number(restaurantId)));
    }
  }, [dispatch, restaurantId]);

  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  useEffect(() => {
    // Sort orders in descending order based on orderDate
    const sortedOrders = [...localOrders].sort((a, b) => {
      const orderDateA = new Date(a.orderDate);
      const orderDateB = new Date(b.orderDate);
      return orderDateB - orderDateA;
    });
    setLocalOrders(sortedOrders);
  }, [localOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    const statusMap = {
      Pending: "PENDING",
      Preparing: "PREPARING",
      Ready: "READY_FOR_PICKUP",
      Picked: "OUT_FOR_DELIVERY",
      Confirmed: "CONFIRMED",
      Canceled: "CANCELED",
      Failed: "FAILED",
    };

    const updatedStatus = statusMap[newStatus];
    if (!updatedStatus) return;

    // Optimistic UI update
    setLocalOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId
          ? { ...order, orderStatus: updatedStatus }
          : order
      )
    );

    try {
      await dispatch(
        updateOrderTrackStatus({ orderId, status: updatedStatus })
      );
    } catch (error) {
      console.error("Failed to update status:", error);

      // Revert status if API fails
      setLocalOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId
            ? {
                ...order,
                orderStatus: orders.find((o) => o.orderId === orderId)
                  .orderStatus,
              }
            : order
        )
      );
    }
  };

  const handleMenuDetailsClick = (orderId, orderDetails, totalAmount) => {
    setSelectedOrderId(orderId);
    setSelectedOrderTotalAmt(totalAmount);  // Ensure total amount is set
    setSelectedOrderDetails(orderDetails);
    setShowMenuDetails(true);
  };

  const handleClose = () => setShowMenuDetails(false);

  const formatOrderTime = (orderDate) => {
    const date = new Date(orderDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  if (status === "loading") {
    return <div className="text-center">Loading...</div>;
  }

  if (status === "failed") {
    return (
      <div className="text-center text-danger">
        Error: {error || "Something went wrong. Please try again."}
      </div>
    );
  }

  const getBackgroundColor = (status) => {
    switch (status) {
      case "Pending":
        return "#ffeb3b";
      case "Preparing":
        return "#2196f3";
      case "Ready":
        return "#4caf50";
      case "Picked":
        return "#ff9800";
      case "Confirmed":
        return "#673ab7";
      case "Canceled":
        return "#f44336";
      case "Failed":
        return "#9e9e9e";
      default:
        return "#fff"; // Default background color
    }
  };

  const getTextColor = (status) => {
    switch (status) {
      case "Pending":
        return "#000";
      case "Preparing":
      case "Ready":
      case "Picked":
      case "Confirmed":
      case "Canceled":
      case "Failed":
        return "#fff";
      default:
        return "#000";
    }
  };

  return (
    <div className="main-order">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 p-0">
              {localOrders.length > 0 ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Phone</th>
                      <th>Total Amount</th>
                      <th>Order Time</th>                      
                      <th>Actions</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {localOrders.map((order) => (
                      <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        <td>{order.phoneNumber}</td>
                        <td>₹{order.totalAmount}</td>
                        <td>{formatOrderTime(order.orderDate)}</td>
                        <td>
                          <Button
                            variant="primary" className="admin-view-order-details"
                            onClick={() =>
                              handleMenuDetailsClick(
                                order.orderId,
                                order.orderDetails,
                                order.totalAmount
                              )
                            }
                          >
                            View Menu Details
                          </Button>
                        </td>
                        <td>
                          <select
                            className="form-select status-dropdown"
                            value={order.orderStatus || ""}
                            onChange={(e) =>
                              handleStatusChange(order.orderId, e.target.value)
                            }
                            style={{
                              backgroundColor: getBackgroundColor(
                                order.orderStatus
                              ),
                              color: getTextColor(order.orderStatus),
                            }}
                          >
                            <option value="" disabled>
                              Select Status
                            </option>
                            <option
                              value="Pending"
                              style={{
                                backgroundColor: "#ffeb3b",
                                color: "#000",
                              }}
                            >
                              Pending
                            </option>
                            <option
                              value="Preparing"
                              style={{
                                backgroundColor: "#2196f3",
                                color: "#fff",
                              }}
                            >
                              Preparing
                            </option>
                            <option
                              value="Ready"
                              style={{
                                backgroundColor: "#4caf50",
                                color: "#fff",
                              }}
                            >
                              Ready
                            </option>
                            <option
                              value="Picked"
                              style={{
                                backgroundColor: "#ff9800",
                                color: "#fff",
                              }}
                            >
                              Picked
                            </option>
                            <option
                              value="Confirmed"
                              style={{
                                backgroundColor: "#673ab7",
                                color: "#fff",
                              }}
                            >
                              Confirmed
                            </option>
                            <option
                              value="Canceled"
                              style={{
                                backgroundColor: "#f44336",
                                color: "#fff",
                              }}
                            >
                              Canceled
                            </option>
                            <option
                              value="Failed"
                              style={{
                                backgroundColor: "#9e9e9e",
                                color: "#fff",
                              }}
                            >
                              Failed
                            </option>
                          </select>
                        </td>                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center">No orders available.</div>
              )}
            </div>
          </div>
        </div>

        {/* Modal for Menu Details */}
        <Modal show={showMenuDetails} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Menu Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="pb-3">
              <strong className="font-secondary">
                Order ID : {selectedOrderId}
              </strong>
            </div>

            {selectedOrderDetails.length > 0 ? (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="font-secondary">#</th>
                    <th className="font-secondary">Item Name</th>
                    <th className="font-secondary">Item Qty</th>
                    <th className="font-secondary">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrderDetails.map((item, index) => (
                    <tr key={index}>
                      <td className="font-secondary">{index + 1}</td>
                      <td className="font-secondary">{item.itemName}</td>
                      <td className="font-secondary">{item.quantity}</td>
                      <td className="font-secondary">₹{item.price}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="3">
                      <strong className="font-secondary">Total</strong>
                    </td>
                    <td>
                      <strong className="font-secondary">
                        ₹{selectedOrderTotalAmt}
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>No details available.</p>
            )}
          </Modal.Body>
        </Modal>
      </section>
    </div>
  );
};

export default PendingOrders;