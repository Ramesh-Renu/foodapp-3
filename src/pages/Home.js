import React, { useEffect, useState, useRef } from "react";
import "../assets/css/Home.css";
import { IoSearchSharp } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import prebookfood from "../assets/images/prebookfood.svg";
import { fetchNearbyRestaurants } from "../redux/action/HomePageRestaurantAction";
import { fetchLocalities } from "../redux/action/HomeBranchCountAction";
import { fetchTopOrderedMenus } from "../redux/action/HomePageTopOrderMenuActions";
import { restaurantSearch } from "../redux/action/RestaurantSearchAction";
import { getCategories } from "../redux/action/CategoryAction";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import useSearch from "../hooks/useSearch";
import "../assets/css/DropInput.css";

const Home = () => {
  const dispatch = useDispatch();

  const [location, setLocation] = useState("Chennai");
  const [isResultVisible, setIsResultVisible] = useState(false);

  // for Input Search result
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);
  const resultBoxRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { categories } = useSelector((state) => state.categories);
  const { restaurants, loading, error } = useSelector(
    (state) => state.restaurants
  );
  const {
    localities,
    loading: locationLoading,
    error: locationError,
  } = useSelector((state) => state.location);
  const { topMenus = [], status } = useSelector((state) => state.menu);
  const [searchTerm, setSearchTerm] = useState("");
  const { handleSearch } = useSearch();
console.log('categories',categories);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  // Fetch categories
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Fetch nearby restaurants
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(
            fetchNearbyRestaurants({ latitude, longitude, radiusKm: 500.0 })
          );
        },
        (error) => {
          console.error("Error fetching location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [dispatch]);

  // Fetch Localities
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          fetch("https://geolocation-db.com/json/")
            .then((response) => response.json())
            .then((data) => {
              const city = data.city || "Chennai";
              setLocation(city);
              dispatch(fetchLocalities(city));
            })
            .catch((error) => {
              console.error("Error fetching location:", error);
              setLocation("Chennai");
              dispatch(fetchLocalities("Chennai"));
            });
        },
        () => {
          setLocation("Chennai");
          dispatch(fetchLocalities("Chennai"));
        }
      );
    } else {
      setLocation("Chennai");
      dispatch(fetchLocalities("Chennai"));
    }
  }, [dispatch]);

  const localityCounts = localities.reduce((acc, branch) => {
    if (acc[branch.locality]) {
      acc[branch.locality] += 1;
    } else {
      acc[branch.locality] = 1;
    }
    return acc;
  }, {});

  const uniqueLocalities = Object.keys(localityCounts).map((locality) => ({
    locality,
    count: localityCounts[locality],
  }));

  // Fetch top ordered menus
  useEffect(() => {
    if (status === "idly") {
      dispatch(fetchTopOrderedMenus());
    }
  }, [status, dispatch]);

  // Render categories
  const renderCategories = () =>
    categories?.length > 0 ? (
      categories.slice(0, 8).map((category) => (
        <div
          key={category.categoryId}
          className="col-xl-3 col-lg-4 col-md-6 col-sm-12 p-3"
        >
          <Link
            to={`/Categories/${category.categoryName}`}
            className="category-link"
          >
            <div className="category-card p-3 rounded">
              <img
                src={category.imageUrl || category.imagedata}
                alt={category.categoryName}
                className="category-image img-fluid rounded-lg"
              />
              <h3 className="mt-3 text-dark">{category.categoryName}</h3>
            </div>
          </Link>
        </div>
      ))
    ) : (
      <p className="col-12 text-muted">No categories available.</p>
    );

  // Render localities
  const renderLocalities = () =>
    uniqueLocalities.map((branch, index) => (
      <div key={index} className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
        <Link
          to="/RestaurantList"
          className="card p-2 position-relative m-1 mb-4"
        >
          <h4 className="text-left text-dark mt-2 m-1">{branch.locality}</h4>
          <p className="text-left text-gray m-2">{branch.count} Places</p>
          <MdKeyboardArrowRight />
        </Link>
      </div>
    ));

  // Render nearby restaurants
  const renderRestaurants = () =>
    restaurants.slice(0, 3).map((restaurant) => (
      <Link
        to={`/Restaurant/${restaurant.restaurantId}`}
        key={restaurant.restaurantId}
        className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4"
      >
        <div className="restaurant-item border">
          <img
            src={restaurant.restaurant.imageUrl || prebookfood}
            alt={restaurant.restaurant.imagename}
            className="img-fluid"
          />
          <div className="restaurant-item-content">
            <div className="d-flex align-items-center mt-2">
              <IoIosStar className="text-warning me-2" />
              <span className="rating">
                {restaurant.restaurant.rating} (
                {restaurant.restaurant.ratingsCount} Reviews)
              </span>
            </div>
            <h5>{restaurant.restaurant.name}</h5>
          </div>
        </div>
      </Link>
    ));

  // Food list for search Input
  let FoodsList = [
    "Idly",
    "Dosa",
    "Pongal",
    "Poori",
    "Chappathi",
    "Veg Rice",
    "Panneer Masala",
    "Parotta",
    "Biriyani",
    "Chicken Fried Rice",
    "Mexican Special",
    "Chicken 65",
    "Chinese Schezwan",
    "Special Combo",
  ];

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    const results = FoodsList.filter((food) =>
      food.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(results);

    setIsResultVisible(results.length > 0);
  };

  // Close result box when clicking outside
  const handleClickOutside = (event) => {
    if (
      resultBoxRef.current &&
      !resultBoxRef.current.contains(event.target) &&
      searchInputRef.current &&
      !searchInputRef.current.contains(event.target)
    ) {
      setIsResultVisible(false);
    }
  };

  // Attach event listener to handle clicks outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Search result bar key function

  const handleKeyDown = (event) => {
    if (!isResultVisible || searchResults.length === 0) return;

    const itemHeight = 40; // Adjust to match your result item height

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prevIndex) => {
        const nextIndex = Math.min(prevIndex + 1, searchResults.length - 1);
        if (resultBoxRef.current) {
          resultBoxRef.current.scrollTo({
            top: nextIndex * itemHeight,
            behavior: "smooth",
          });
        }
        return nextIndex;
      });
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prevIndex) => {
        const nextIndex = Math.max(prevIndex - 1, 0);
        if (resultBoxRef.current) {
          resultBoxRef.current.scrollTo({
            top: nextIndex * itemHeight,
            behavior: "smooth",
          });
        }
        return nextIndex;
      });
    } else if (event.key === "Enter" && selectedIndex >= 0) {
      setSearchTerm(searchResults[selectedIndex]);
      setIsResultVisible(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <main className="home">
      <Header></Header>
      {/* Banner Section */}
      <section className="sec-banner">
        <div className="container">
          <div className="row d-flex align-items-center vh-100">
            <div className="col-xl-12">
              <div className="p-5">
                <h1 className="text-white">
                  <strong className="d-block">
                    Your <span className="text-primary">Food </span>
                  </strong>
                  <strong className="d-block">
                    is <span className="text-primary">Ready!</span>
                  </strong>
                </h1>
                <h6 className="text-white mt-4">
                  Just pick it up and enjoy your dinner
                </h6>
              </div>
              <form
                className="d-flex position-relative"
                onSubmit={handleSubmit}
              >
                <IoSearchSharp className="search-icon fs-4 text-white" />

                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search your favorite food ........"
                  id="drop-input"
                  className="fs-5 form-control ps-5 w-25"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                />

                {isResultVisible && searchResults.length > 0 && (
                  <div ref={resultBoxRef} className="result-box">
                    <ul>
                      {searchResults.map((result, index) => (
                        <li
                          key={index}
                          className={index === selectedIndex ? "active" : ""} // Highlight selected result
                          onClick={() => {
                            setSearchTerm(result);
                            setIsResultVisible(false);
                            setSelectedIndex(-1);
                          }}
                        >
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <button className="btn-primary d-flex align-items-center text-white fs-5">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Best Food Section */}
      <section className="sec-best-food p-5">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 text-center">
              <h2 className="title-1 p-5 text-gray">
                Order our best food options
              </h2>
              <div className="row d-flex justify-content-between">
                {renderCategories()}
              </div>
            </div>

            <div className="offset-xl-1 offset-lg-1 col-xl-10 col-lg-10 col-md-12 col-sm-12 text-center">
              <Link className="btn btn-primary mt-4" to="/Food">
                View All {'>>>>'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="sec-qoute">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 text-center">
              <h2>
                Save your time, don't wait in line, Your food is ready, just
                dine!
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Localities Section */}
      <section className="sec-localities p-5">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 text-center">
              <h2 className="title-2 p-5 text-gray">
                Popular Localities around{" "}
                <span className="text-dark">{location}</span>
              </h2>
            </div>
            <div className="offset-xl-1 offset-lg-1 col-xl-10 col-lg-10 col-md-12 col-sm-12">
              <div className="row">
                {locationLoading ? (
                  <div>Loading...</div>
                ) : locationError ? (
                  <div>Error loading localities</div>
                ) : (
                  uniqueLocalities.map((branch, index) => (
                    <div
                      key={index}
                      className="col-xl-4 col-lg-4 col-md-4 col-sm-12"
                    >
                      <Link
                        to={`/restaurants/${encodeURIComponent(
                          branch.locality
                        )}`}
                        className="card p-2 position-relative m-1 mb-4"
                      >
                        <h4 className="text-left text-dark mt-2 m-1">
                          {branch.locality}
                        </h4>
                        <p className="text-left text-gray m-2">
                          {branch.count} Places
                        </p>
                        <MdKeyboardArrowRight />
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-booking Section */}
      <section className="sec-pre-booking py-5">
        <div className="container">
          <div className="row">
            <div className="offset-xl-1 offset-lg-1 col-xl-10 col-lg-10 col-md-12 col-sm-12">
              <div className="row d-flex align-items-center justify-content-end">
                <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 text-right">
                  <div className="card w-100 p-5">
                    <div className="card-img text-center p-4">
                      <img src={prebookfood} alt="Pre - Book Your Food!" />
                    </div>
                    <div className="card-content">
                      <h4 className="text-center text-dark mt-2 mb-4 m-1 fs-4">
                        Pre - Book Your Food!
                      </h4>
                      <p className="text-left">
                        Save valuable time by avoiding long waits at
                        restaurants. Instead of spending time in queues or
                        waiting for your order to be prepared, plan ahead and
                        have your meal ready when you arrive.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


{/* Nearby Restaurants Section */}
<section className="sec-nearby-restaurants p-5">
        <div className="container">
          <h2 className="text-center mb-5">Nearby Restaurants <span className="text-dark"> {location}</span></h2>
          <div className="row">
            {loading && <p>Loading restaurants...</p>}
            {error && <p>Error loading restaurants: {error}</p>}
            {restaurants.slice(0, 3).map((restaurant) => (
              <Link 
                to={`/Restaurant/${restaurant.restaurantId}`}
                key={restaurant.restaurantId}
                className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4"
              >
                <div className="restaurant-item border">
                  <img
                    src={restaurant.restaurant.imageUrl || prebookfood}
                    alt={restaurant.restaurant.imagename}
                    className="img-fluid"
                  />
                  <div className="resturant-item-content">
                    <div className="d-flex align-items-center mt-2">
                      <IoIosStar className="text-warning me-2" />
                      <span className="rating">
                        {restaurant.restaurant.rating} ( {restaurant.restaurant.ratingsCount} Reviews)
                      </span>
                    </div>
                    <h5 className="mt-3 mb-3">{restaurant.restaurant.restaurantName}</h5>
                    <p>{restaurant.locality}, {restaurant.city}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          </div>
        
      </section>

     



      <Footer />
    </main>
  );
};

export default Home;