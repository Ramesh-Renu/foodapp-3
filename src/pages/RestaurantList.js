import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import "../assets/css/RestaurantList.css";
import { getCategories } from "../redux/action/CategoryAction";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import arrow from "../assets/images/arrow.png";
import no_img from "../assets/images/no_img.png";
import { restaurantSearch } from "../redux/action/RestaurantSearchAction";
import Header from "../components/Header";

const RestaurantList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [restaurantId, setRestaurantId] = useState("");
  const { restaurant, error } = useSelector((state) => state.restaurantSearch);
  const [searchTerm, setSearchTerm] = useState("");
  const { categories, loading } = useSelector((state) => state.categories);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(restaurantSearch({ searchText: searchTerm }));
    } else {
      alert("Please enter a restaurant name to search.");
    }
  };

  useEffect(() => {
    dispatch(restaurantSearch({ searchText: "" }));
    dispatch(getCategories());
  }, [dispatch]);


  const CustomLeftArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="custom-arrow left-arrow"
      disabled={currentIndex === 0}
      style={{
        position: "absolute",
        left: "30px",
        top: "55%",
        background: currentIndex === 0 ? "url('../images/arrow.png')" : "unset",
        cursor: currentIndex === 0 ? "not-allowed" : "pointer",
        zIndex: 1,
        transform: "rotate(180deg)",
      }}
    >
      <img src={arrow} alt="Arrow" className="arrow-image" />
    </button>
  );

  const CustomRightArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="custom-arrow right-arrow"
      disabled={currentIndex === restaurant.length - 3}
      style={{
        position: "absolute",
        right: "30px",
        top: "55%",
        background:
          currentIndex === restaurant.length - 3
            ? "url('../images/arrow.png')"
            : "unset",
        cursor:
          currentIndex === restaurant.length - 3 ? "not-allowed" : "pointer",
        zIndex: 1,
      }}
    >
      <img src={arrow} alt="Arrow" className="arrow-image" />
    </button>
  );
  if (error) return <p>Error: {error}</p>;
  const goToRestaurantMenuPage = (id) => {
    setRestaurantId(id);
    navigate(`/Restaurant/${id}`);
  };
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="main-restlist">
      {/* Search Section */}
      <Header />
      <section className="sec-banner banner mt-0">
        <div className="container p-0 position-relative">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 banner-col">
              <Card className="search-card mb-4">
                <Card.Body>
                  <Card.Title className="text-right">
                    Skip the wait and pick up your food with ease!
                  </Card.Title>
                  <form
                    onSubmit={handleSearch}
                    className="search-form d-flex align-items-center"
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
                    <div className="buttonsearch">
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

      {/* Restaurants Section */}
      <section className="sec-restsection">
        <div className="container">
          <h2 className="mb-4 title-2 text-gray">
            Top <span className="text-dark">Restaurants</span> in{" "}
            <span className="text-dark">Chennai</span>
          </h2>
          {restaurant && restaurant.length > 0 ? (
            <Carousel
              responsive={responsive}
              infinite={false}
              afterChange={(previousSlide, { currentSlide }) =>
                setCurrentIndex(currentSlide)
              }
              arrows
              customLeftArrow={<CustomLeftArrow />}
              customRightArrow={<CustomRightArrow />}
              autoPlay
              autoPlaySpeed={3000}
            >
              {restaurant.map((restaurantItem, index) => (
                <div
                  key={restaurantItem.restaurantId}
                  className="p-4"
                  style={{
                    transform:
                      currentIndex === index ? "scale(1.05)" : "scale(1)",
                    transition: "transform 0.3s",
                  }}
                >
                  <Card
                    className="sectioncard mb-4 border-0"
                    onClick={() =>
                      goToRestaurantMenuPage(restaurantItem.restaurantId)
                    }
                  >
                    <div className="card-img">
                      <Card.Img
                        src={restaurantItem.imageUrl || no_img}
                        alt={restaurantItem.restaurantName || "No Image"}
                        className="img-fluid"
                      />
                      <div className="rate">
                        <IoIosStar />
                        <span>{restaurantItem.averageRating}</span>
                      </div>
                    </div>
                    <h6>{restaurantItem.restaurantName}</h6>
                    <p>
                      {restaurantItem.branches?.[0]?.locality
                        ? restaurantItem.branches?.[0]?.locality + ", "
                        : " "}
                      {restaurantItem.branches?.[0]?.city ||
                        "Address not available"}
                    </p>
                  </Card>
                </div>
              ))}
            </Carousel>
          ) : (
            <p>No restaurants found</p>
          )}
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-4 text-center">
          <Link
            to="/Restaurant-List"
            className="bg-success text-light btn btn-primary"
            variant="secondary"
            style={{ width: "300px" }}
          >
            See All Restaurants
          </Link>
        </div>
      </section>
      <section className="pt-5 sec-restaurant-search-category">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <h2 className="mb-5 title-2 text-gray">
                There's <span className="text-dark">Something</span> for{" "}
                <span className="text-dark">You</span>
              </h2>
            </div>
            <div className="row">
              {loading ? (
                <div className="col-12 text-center">
                  <p>Loading categories...</p>
                </div>
              ) : error ? (
                <div className="col-12 text-center">
                  <p>Error loading categories: {error}</p>
                </div>
              ) : (
                categories.slice(0, 8).map((category) => (
                  <div key={category.categoryId} className="col-md-3">
                    <Card className="sectioncards mb-4 border-0">
                      <Card.Img
                        src={category.imageUrl || no_img}
                        alt={`Category ${category.categoryName}` || "No Image"}
                        className="img-fluid"
                      />
                      <Card.Body>
                        <Card.Title>{category.categoryName}</Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              )}
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-4 text-center">
              <Link
                to="/Varieties"
                className="bg-success text-light btn btn-primary"
                variant="secondary"
                style={{ width: "300px" }}
              >
                See All Varieties
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RestaurantList;
