//C:\ccs\Project\FoodApp Sprint\src\pages\Cart.js

import React, {  useEffect, useState } from "react";
import "../assets/css/Cart.css";
import { IoStar } from "react-icons/io5";
import Phonepe from "../assets/images/phonepe.png";
import Paytm from "../assets/images/paytm.png";
import Paypal from "../assets/images/paypal.png";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../redux/slicer/Toast";
import { useCart } from "../hooks/useCart";
import { useNavigate, useLocation } from "react-router-dom";

import { Button } from "react-bootstrap";
import { completePaymentAction, handlePaymentAction } from "../redux/action/PaymentAction";
import { createOrderAction } from "../redux/action/OrderAction";
import OrderSuccess from "../ModalPopup/OrderSuccessModal";
// import { setOrderId } from "../redux/slicer/OrderTrackingSlicer";


export const Cart = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [
    cartData,
    { getAllCart, createCart, updateCart, deleteCart },
  ] = useCart();
  const { cart } = useSelector((state) => state.cart);
  const [userId] = useState(localStorage.getItem("userId"));
  const [cartItems, setCartItems] = useState(cart.cartItems || []);
  
  useEffect(() => {
    if (cart) {
      setCartItems(cart.cartItems);
    }
  }, [cart]);
  
  const handlePayNow = async () => {
    const parseduserId = parseInt(userId, 10)
    try {
      // Step 1: Create Order
      const orderInput = {
        userId:parseduserId,
        cartId: cart.cartId,
        deliveryAddress: '123 Main St',
        paymentMethod: 'RAZORPAY',
        applicationType: 'WEB'
      };
      const order = await dispatch(createOrderAction(orderInput)).unwrap();
      // dispatch(setOrderId(order.orderId));
      // Step 2: Handle Payment via Razorpay
      const paymentData = await dispatch(
        handlePaymentAction({
          amount: order.totalAmount,
          orderId: order.orderId,
        })
      ).unwrap();
      
      
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Please check your implementation.");
        return;
      }
      
      
      const options = {
        key: "rzp_test_sqlgh4Ta7LYOqu", // Replace with your Razorpay Key
        amount: paymentData.amount * 100, // Convert to paisa (INR to subunit)
        currency: "INR",
        order_id: paymentData.razorpayOrderId,
        name: "Food App", // Change to your app/organization name
        description: "Payment for Order #" + order.orderId,
        handler: async (response) => {
          try {
            // Step 3: Complete Payment
            console.log(response.razorpay_order_id)
            console.log(response.razorpay_payment_id)
            await dispatch(
              completePaymentAction({
                razorpayOrderId: response.razorpay_order_id,                
                razorpayPaymentId: response.razorpay_payment_id,
              })
            ).unwrap();
            alert("Payment Successful!");
            setShowModal(true);
            setTimeout(() => {
              setShowModal(false); // Auto-close modal after 10 seconds
              navigate('/');
            }, 10000);
          } catch (error) {
            console.error("Error completing payment:", error);
            alert("Payment completion failed. Please try again.");
          }
        },
        prefill: {
          name: "Customer Name", // Replace with customer's name
          email: "customer@example.com", // Replace with customer's email
          contact: "1234567890", // Replace with customer's contact number
        },
        theme: {
          color: "#3399cc", // Customize the color to match your branding
        },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response) {
        console.error("Payment failed:", response);
        alert("Payment failed. Please try again.");
      });
      razorpay.open();
    } catch (error) {
      console.error("Payment Initialization Failed:", error);
      alert("Unable to initiate payment. Please try again later.");
    }
  };
  
  
  const handleQuantityChange = (menuItemId, increment) => {
    setCartItems((prevCartItems) => {
      const newCartItems = prevCartItems
        .map((item) =>
          item.menuItemId === menuItemId
            ? { ...item, quantity: item.quantity + (increment ? 1 : -1) }
            : item
        )
        .filter((item) => item.quantity > 0); // Remove items with quantity 0 from local state

      // Create updatedItems for API, including the item with quantity 0 for removal
      const updatedItems = prevCartItems.map((item) => ({
        menuItemId: item.menuItemId,
        quantity:
          item.menuItemId === menuItemId
            ? Math.max(item.quantity + (increment ? 1 : -1), 0)
            : item.quantity,
      }));

      // Call the API with the updated items, including items with quantity 0 to indicate removal
      updateCart({ cartId: cart.cartId, items: updatedItems }).then((res) => {
        console.log("showToast", res.meta.requestStatus);
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(
            showToast({
              message: `Quantity ${increment ? "Added" : "Removed"
                } Successfully`,
              variant: "success",
            })
          );
          getAllCart(userId); // Re-fetch cart to confirm changes
        } else {
          dispatch(showToast({ message: res.message, variant: "danger" }));
        }
      });

      return newCartItems; // Update local state with items filtered out if quantity is 0
    });
  };
  console.log("navId", cart);
  const closeModal = () => setShowModal(false);
  const goToRestaurant = () => {
    // navigate("/" + location.state.navName + "/" + location.state.navId);
    navigate('/RestaurantList')
  };
  return (
    <main className="my-cart">
      <section className="sec-cart">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-4">
              <img src={cart.imageUrl} alt={cart.restaurantName} className="view-cart-restaurant-img" />
            </div>
            <div className="col-8">
              <h4 className="fs-3">{cart.restaurantName}</h4>
              <p className="text-gray fw-bold">{cart.branch.locality}, {cart.branch.city}</p>
              <p className="text-gray d-flex align-items-center">
                <IoStar size={20} className="text-success me-1" />{cart.rating}</p>
            </div>
          </div>
        </div>
      </section>
      <div className="border-line mt-3 mb-3"></div>
      <section className="sec-cart-items">
        <div className="container">
          <div className="row d-flex align-items-center">
            {cartData &&
              cart?.cartItems?.map((item) => {
                const quantity =
                  cartItems.find(
                    (cartitem) => cartitem.menuItemId === item.menuItemId
                  )?.quantity || 0;
                console.log("quantity", quantity);
                return (
                  <div key={item.cartItemId} className="col-12 cart-menu-items">
                    <div className="cart-menu-content mt-1">
                      <h4>{item.menuItemName}</h4>
                      <p className="text-gray fs-6">
                        {item.menuDescription}
                      </p>
                      <h4 className="fs-2">₹{item.unitPrice}</h4>
                    </div>
                    <div className="cart-menu-img mt-2">
                      <img
                        src={item.imageUrl}
                        className="card-img-top rounded"
                        alt={item.menuItemName}
                      />
                      <div className="card-body p-2 mb-3">
                        <div className="quantity-control d-flex justify-content-between align-items-center">
                          <Button
                            variant="outline-secondary"
                            onClick={() =>
                              handleQuantityChange(item.menuItemId, false)
                            }
                          >
                            -
                          </Button>
                          <span className="item-quantity">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline-secondary"
                            onClick={() =>
                              handleQuantityChange(item.menuItemId, true)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bill">
                <h4 className="fs-4">Bill Details</h4>
              </div>
              <div className="items d-flex align-items-center justify-content-between mt-3">
                <p className="item text-gray">Item Total</p>
                <p className="cost fw-bold text-dark">₹{cart.itemTotal}</p>
              </div>
              <div className="items d-flex align-items-center justify-content-between mt-3">
                <p className="item text-gray">Tax & Charges</p>
                <p className="cost2 fw-bold text-dark">₹{cart.gstAmount}</p>
              </div>
              <div className="border-line1 mt-auto"></div>
              <div className="items d-flex align-items-center justify-content-between mt-3">
                <p className="item text-gray">Total Pay</p>
                <p className="cost4 fw-bold text-dark">₹{cart.finalAmount}</p>
              </div>
              <div className="d-flex justify-content-center mt-5">
                <button onClick={handlePayNow} className="btn btn-primary d-flex align-items-center justify-content-center position-relative px-4">
                  <span className="text-center pay-btn">Pay Now</span>
                  <div className="d-flex align-items-center ms-2">
                    <img src={Phonepe} alt="PhonePe" className="icon" />
                    <img src={Paytm} alt="Paytm" className="icon" />
                    <img src={Paypal} alt="PayPal" className="icon" />
                  </div>
                </button>
              </div>
              {/* <OrderTrackingModal orderId={order_id} userId={userId}/> */}
              <OrderSuccess showModal={showModal} handleClose={closeModal} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;