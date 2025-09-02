import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../redux/action/DisplayCartAction'; 

const DisplayCartItems = () => {
  const dispatch = useDispatch();
  const { cartItems = [], loading, error } = useSelector(state => state.cart);
  const userId = useSelector(state => state.user.userId); 

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(parseInt(userId))); 
    }
  }, [dispatch, userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Your Cart Items</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="row">
          {cartItems.map((item) => (
            <div key={item.cartItemId} className="col-md-6 mb-3">
              <div className="card">
                <img 
                  src={item.imageUrl} 
                  className="card-img-top" 
                  alt={item.menuItemName}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.menuItemName}</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="card-text mb-0">Quantity: {item.quantity}</p>
                    <p className="card-text mb-0">₹{item.unitPrice.toFixed(2)}</p>
                  </div>
                  <div className="mt-2">
                    <small className="text-muted">
                      GST: ₹{item.gstAmount.toFixed(2)} | Discount: ₹{item.discountAmount.toFixed(2)}
                    </small>
                  </div>
                  <div className="mt-2">
                    <strong>Total: ₹{item.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayCartItems;
