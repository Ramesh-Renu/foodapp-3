import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../assets/css/PastOrderTab.css";
import { Link } from 'react-router-dom';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { FaCircleCheck } from 'react-icons/fa6';
import { fetchPastOrders } from '../redux/slicer/PastOrderSlicer';
import OrderDetailsModal from '../ModalPopup/ViewPastOrderDetailModal';

const PastOrderTab = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.pastOrders);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      dispatch(fetchPastOrders(parseInt(userId, 10))); // Pass userId to the thunk
    } else {
      console.error('User ID not found in localStorage');
    }
  }, [dispatch]);

  const handleShowModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      className="border-0 tab-panel fade show active accordion-item"
      id="tab-1-panel"
      role="tabpanel"
      aria-labelledby="tab-1"
      tabIndex="0"
    >
      {/* Mobile Header */}
      <h2 className="accordion-header d-lg-none" id="headingOne">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          <MdOutlineShoppingBag className="me-2" /> Orders
        </button>
      </h2>

      {/* Tab Content */}
      <div
        id="collapseOne"
        className="accordion-collapse collapse show d-lg-block"
        aria-labelledby="headingOne"
        data-bs-parent="#myTabContent"
      >
        <div className="accordion-body pt-0">
          <h4 className="tab-heading">Past Orders</h4>
          {orders.length === 0 ? (
            <p className="text-center py-5 font-secondary">No past orders available.</p>
          ) : (
            orders.map((order) => (
              <div key={order.orderId} className="past-order-row row">
                {/* Order Details Left Column */}
                <div className="p-0 col-xl-7 col-lg-7 col-md-12 col-sm-12">
                  <div className="past-order d-flex">
                    <img
                      src={order.restaurant.imageUrl}
                      alt="food"
                      className="past-order-img"
                    />
                    <div className="past-order-details">
                      <h5>{order.restaurant.restaurantName}</h5>
                      <h6>{order.restaurant.branch.locality}, {order.restaurant.branch.city}</h6>
                      <p>Order #{order.orderId}</p>
                      <p>{new Date(order.orderDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Order Actions Right Column */}
                <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 text-end">
                  <div className="past-order-cta">
                    <p className="pick-time d-flex align-items-center text-gray font-secondary">
                    Picked on{order.actualDeliveryTime}
                      <FaCircleCheck className="ms-2 bg-green text-primary" />
                    </p>
                    <Link
                      to="#"
                      onClick={() => handleShowModal(order)}
                      className="link-view text-primary-light d-block font-secondary p-2 px-2"
                    >
                      View Details
                    </Link>
                    <Link
                      to="#"
                      className="font-secondary btn p-2 px-4 btn-primary"
                    >
                      Reorder
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Render Modal */}
      {showModal && selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PastOrderTab;
