import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Card, Row, Col, Alert, Modal } from "react-bootstrap";
import { IoStar } from "react-icons/io5";
import { LuIndianRupee } from "react-icons/lu";
import "../assets/css/RestaurantMenuPage.css";
import Restaurantlistbanner from "../assets/images/Restaurantlistbanner.png";
import { FaSearch } from "react-icons/fa";
import { restaurantSearch } from "../redux/action/RestaurantSearchAction";
import { Form } from "react-bootstrap";
import { useCart } from "../hooks/useCart";
import CartPopup from "./CartPopup";
import Footer from "../components/Footer";
import { fetchCartByUserIdAction } from "../redux/action/CartAction";
import { showToast } from "../redux/slicer/Toast";
import { restaurantMenuPageAction } from "../redux/action/RestaurantMenuPageAction";
import no_img from "../../src/assets/images/no_img.png";
import LoginPage from "../pages/LoginPage";
import Header from "../components/Header";

const RestaurantMenuPage = () => {
  const { restaurantId } = useParams();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [
    cartData,
    { getAllCart, createCart, updateCart, deleteCart },
  ] = useCart();
  const [quantities, setQuantities] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { userId: userId } = useSelector((state) => state.auth);
  const { restaurantMenus, loading, error } = useSelector(
    (state) => state.restaurantMenu
  );
  const [cartItems, setCartItems] = useState(cart.cartItems || []);

  useEffect(() => {
    if (cart) {
      setCartItems(cart.cartItems);
    }
  }, [cart]);

  useEffect(() => {
    if (cartData === undefined || cartData.length === 0) {
      getAllCart(userId);
    }
  }, [cartData]);
  useEffect(() => {
    if (!showConfirmationModal) {
      console.log("Modal is now closed");
      getAllCart(userId); // Called after modal state is false
    }
  }, [showConfirmationModal]); // Hook triggers when showConfirmationModal changes

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(restaurantSearch({ searchText: searchTerm }));
    } else {
      alert("Please enter a restaurant name to search.");
    }
  };
  useEffect(() => {
    if (userId) {
      dispatch(fetchCartByUserIdAction(userId));
    }
  }, [dispatch, userId]);
  useEffect(() => {
    // Fetch restaurant menu
    if (restaurantId) {
      dispatch(
        restaurantMenuPageAction({ restaurantId: parseInt(restaurantId, 10) })
      );
    }
  }, [restaurantId, cartData]);
  
  useEffect(() => {
    // Fetch cart only if userId exists
    if (userId) {
      console.log("Fetching cart for user:", userId);
      getAllCart(userId);
    }
  }, [userId, getAllCart]);

  const addToCart = (menuItem) => {
    if (!userId) return setShowLoginModal(true);
    const newCart = {
      items: [
        {
          menuItemId: menuItem.menuId,
          quantity: 1,
          gstAmount: menuItem.gstAmount,
        },
      ],
      restaurantId: parseInt(restaurantId, 10),
      userId: parseInt(userId, 10),
    };

    if (!cart.cartId) {
      console.log("Creating a new cart...");
      createCart(newCart).then((res) => {
        if (res.payload.success) {
          dispatch(
            showToast({ message: res.payload.message, variant: "success" })
          );
          getAllCart(userId);
        } else {
          dispatch(
            showToast({ message: res.payload.message, variant: "danger" })
          );
        }
      });
    } else {
      if (
        cart.restaurantId &&
        cart.restaurantId !== parseInt(restaurantId, 10) &&
        cartItems?.length > 0
      ) {
        setConfirmationMessage(
          "You already have items from another restaurant in your cart. Would you like to clear the previous cart and add this item?"
        );
        setShowConfirmationModal(true);
      } else {
        // Update existing cart with the new item or increment quantity
        const updatedItems = cartItems.map((item) =>
          item.menuItemId === menuItem.menuId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        const itemExists = cartItems.some(
          (item) => item.menuItemId === menuItem.menuId
        );
        if (!itemExists) {
          updatedItems.push({
            menuItemId: menuItem.menuId,
            quantity: 1,
            gstAmount: menuItem.gstAmount,
          });
        }

        updateCart({ cartId: cart.cartId, items: updatedItems }).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            dispatch(
              showToast({
                message: `Quantity ${" Added"} Successfully`,
                variant: "success",
              })
            );
            getAllCart(userId);
          } else {
            dispatch(
              showToast({ message: res.payload.message, variant: "danger" })
            );
          }
        });
      }
    }
  };

  const deletecart = () => {
    deleteCart({ cartId: cart.cartId })
      .then((res) => {
        const deleteCartData = res?.payload;
        if (deleteCartData?.success) {
          dispatch(
            showToast({ message: deleteCartData.message, variant: "success" })
          );            
            const newCart = {
              items: [
                {
                  menuItemId: selectedMenu[0].menuId,
                  quantity: 1,
                  gstAmount: selectedMenu[0].gstAmount,
                },
              ],
              restaurantId: parseInt(restaurantId, 10),
              userId: parseInt(userId, 10),
            };
            createCart(newCart).then((res) => {
              if (res.payload.success) {
                dispatch(
                  showToast({ message: res.payload.message, variant: "success" })
                );
                getAllCart(userId);
              } else {
                dispatch(
                  showToast({ message: res.payload.message, variant: "danger" })
                );
              }
            });
            
        } else {
          dispatch(
            showToast({
              message:
                deleteCartData?.message ||
                "Cart and its items deleted successfully.",
              variant: "success",
            })
          );
        }
        setShowConfirmationModal(false); // Close the modal
      })
      .catch((error) => {
        console.error("Error deleting cart:", error);
        dispatch(
          showToast({
            message: "An error occurred while deleting the cart.",
            variant: "danger",
          })
        );
      });
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
              message: `Quantity ${
                increment ? "Added" : "Removed"
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!restaurantMenus || restaurantMenus.length === 0)
    return <p>No restaurant data available.</p>;

  return (
    <Fragment>
      <div className="main-rest-menu">
        <Header countItems={cartItems} />
        {/* Banner Section */}
        <section className="banner position-relative">
          <div className="container-fluid p-0">
            <div className="row">
              <img src={Restaurantlistbanner} alt="" />
            </div>
          </div>

          <div className="container p-0 position-relative">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 banner-col">
                <Card className="search-card mb-4 ">
                  <Card.Body>
                    <Card.Title className="text-right">
                      Skip the wait and pick up your food with ease!
                    </Card.Title>
                    <form
                      onSubmit={handleSearch}
                      className="search-form align-items-center"
                    >
                      <div className="search-input-container d-flex align-items-center me-1 mt-2">
                        <FaSearch className="search-icon" />
                        <Form.Control
                          type="text"
                          placeholder="Search your favorite Restaurants"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="restlistsearch me-1 fs-20"
                        />
                      </div>
                      <div className="buttonsearch ">
                        <Button
                          variant="primary"
                          style={{
                            height: "45px",
                            width: "278px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          type="submit"
                          className="searchbutton mt-2"
                        >
                          Search
                        </Button>
                      </div>
                    </form>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Restaurant Info */}
        {restaurantMenus && (
          <div className="container-main mt-20-custom d-flex justify-content-center align-items-center vh-50">
            <div className="d-flex align-items-center">
              <div className="restaurant-img">
                {
                  <img
                    src={restaurantMenus[0].imageUrl}
                    alt="Restaurant Menu"
                  />
                }
              </div>
              <div className="restaurant-details">
                <h4 className="restaurant-name">
                  {restaurantMenus[0].restaurantName || "Restaurant Name"}
                </h4>
                <p className="text-muted mb-1 restaurant-address fs-5 mb-3">
                  {restaurantMenus[0]?.branches?.[0]?.locality},{" "}
                  {restaurantMenus[0]?.branches?.[0]?.city}
                </p>
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center me-2">
                    <span className="text-green fw-bold me-2">
                      <IoStar size={25} />
                    </span>
                    <span className="fw-bold me-2">
                      {restaurantMenus[0].averageRating || "N/A"}
                    </span>
                    <span className="vr"></span>
                  </div>
                  <span className="text-muted">
                    <LuIndianRupee size={20} /> Approx price per person: ₹
                    {restaurantMenus[0].price || 300}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Menu Section */}
        <section className="recommended-food mt-4">
          <div className="container">
            <h2 className="mb-4">Recommended Menu</h2>
            <Row xs={1} sm={2} md={3} lg={2} className="g-3">
              {cartData &&
              restaurantMenus &&
              restaurantMenus[0].menus &&
              restaurantMenus[0].menus.length > 0 ? (
                restaurantMenus[0].menus.map((menu) => {
                  const quantity =
                    cartItems.find((item) => item.menuItemId === menu.menuId)
                      ?.quantity || 0; // Default to 0 if not found

                  return (
                    <Col key={menu.menuId}>
                      <Card className="h-100 border-1 shadow-lg">
                        <Row className="g-0">
                          <Col xs={4} className="d-flex align-items-center">
                            <Card.Img
                              src={menu.imageUrl || no_img} // Replace with actual menu image if available
                              alt={menu.name}
                              className="img-fluid rounded-start"
                            />
                          </Col>
                          <Col xs={8}>
                            <Card.Body className="d-flex flex-column h-100">
                              <Card.Title className="fs-20 fw-bold txt-cap">
                                {menu.name}
                              </Card.Title>
                              <Card.Text className="text-muted">
                                {menu.description}
                              </Card.Text>
                              <div className="mt-auto mb-2 d-flex align-items-center">
                                <span className="fw-bold fs-24 d-flex align-items-center">
                                  <IoStar
                                    size={20}
                                    className="text-success me-1"
                                  />{" "}
                                  {menu.averageRating}
                                </span>
                              </div>
                              <div className="mt-auto d-flex justify-content-between align-items-center">
                                <span className="fw-bold fs-24 d-flex align-items-center menu-price">
                                  <LuIndianRupee size={28} className="me-1" />{" "}
                                  {menu.price}
                                </span>
                                {quantity >= 1 ? ( // Show quantity change controls if quantity is more than 1
                                  <div className="qty-change">
                                    <Button
                                      onClick={() =>
                                        handleQuantityChange(menu.menuId, false)
                                      }
                                    >
                                      -
                                    </Button>
                                    <span>{quantity}</span>
                                    <Button
                                      onClick={() =>
                                        handleQuantityChange(menu.menuId, true)
                                      }
                                    >
                                      +
                                    </Button>
                                  </div>
                                ) : (
                                  <Button
                                    className="btn-add-cart"
                                    variant="primary"
                                    onClick={() => {
                                      addToCart(menu);
                                      setSelectedMenu((prev) => [
                                        ...prev,
                                        menu,
                                      ]);
                                    }}
                                  >
                                    ADD
                                  </Button>
                                )}
                              </div>
                            </Card.Body>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  );
                })
              ) : (
                <p>No menus available.</p>
              )}
            </Row>
          </div>
        </section>
        <Footer></Footer>

        {confirmationMessage && (
          <Modal
            show={showConfirmationModal}
            onHide={() => {
              setConfirmationMessage(null);
              setShowConfirmationModal(false);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>{confirmationMessage}</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setConfirmationMessage(null);
                  setShowConfirmationModal(false);
                }}
              >
                No
              </Button>
              <Button variant="danger" onClick={deletecart}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
      {cartItems && <CartPopup countItems={cartItems}></CartPopup>}
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
    </Fragment>
  );
};

export default RestaurantMenuPage;
