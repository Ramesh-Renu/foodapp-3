import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { CiLocationOn } from "react-icons/ci";
import { FaCircleCheck } from 'react-icons/fa6';
import "../assets/css/OrderDetailsModal.css"

const OrderDetailsModal = ({ order, onClose }) => {
  // Calculate bill details
  const calculateBillDetails = (orderDetails) => {
    const itemTotal = orderDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gstRate = 0; // 5% GST
    const gstAmount = (itemTotal) * gstRate;

    return {
      itemTotal: itemTotal.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      totalAmount: (itemTotal + gstAmount).toFixed(2)
    };
  };

  return (
    <section className="viewpastorder_details">
      <div className="modal-overlay">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <p className='view-order-title'>
                <button type="button" className="close" onClick={onClose}><IoCloseSharp size={20} />
                </button>
                Order
                <span> #{order.orderId}</span>
              </p>
              <div className='restaurant-title'><CiLocationOn size={24} />
                <img src={order.restaurant.imageUrl} alt="food" className="rounded-circle me-2" />
                <h4 className="restaurant-name">{order.restaurant.restaurantName}<span className="restaurant-location">{order.restaurant.branch.locality}, {order.restaurant.branch.city}</span></h4></div>
              <div>

                <p className="font-secondary fs-4 mt-4 order-time">
                  Picked on {new Date(order.actualDeliveryTime).toLocaleTimeString()}{" "}
                  <FaCircleCheck className="ms-2 bg-green text-primary" />
                </p>

                <hr />

                {/* Order Details Content */}
                <div className="order-details mt-4">

                  <div className='order-items'>
                  {order.orderDetails.map((item, index) => (
                    <div key={item.orderDetailId} className="item-name d-flex justify-content-between mb-2">
                      <span className="text-gray"><span className='past-order-item-count'>{index + 1} Item</span> {item.menu.itemName} x {item.quantity}</span>
                      <span>₹ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  </div>


                  {/* Calculate bill details */}
                  {(() => {
                    const billDetails = calculateBillDetails(order.orderDetails);
                    return (
                      <>
                        {/* Item Total */}
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-gray">Item Total</span>
                          <span>₹ {billDetails.itemTotal}</span>
                        </div>

                        {/* GST Amount */}
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-gray">GST Amount</span>
                          <span>₹ 0</span>
                        </div>


                        <div className="align-items-center d-flex order-details-total justify-content-between mt-3 pt-3">
                          <strong className='font-secondary text-gray fs-6'>Paid Via {order.paymentMethod}</strong>
                          <strong className='font-secondary-bold text-dark fs-5'>Bill Amount</strong>
                          <strong className='font-secondary-bold text-dark fs-5'>₹ {billDetails.totalAmount}</strong>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetailsModal;
