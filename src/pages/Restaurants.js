import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { restaurantSearch } from "../redux/action/RestaurantSearchAction";
import { IoIosStar } from "react-icons/io";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import no_img from "../assets/images/no_img.png";

const Restaurants = () => {
  //const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { restaurant, loading, error } = useSelector(
    (state) => state.restaurantSearch
  );
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [getRestaurant, setGetRestaurant] = useState([]);
  const [searchTerm, setSearchTerm] = useState(query.get("search") || "");

  const fetchRestaurants = async (getCategoryName) => {
    try {
      // Dispatch the thunk and handle the result
      const response = await dispatch(
        restaurantSearch({ searchText: getCategoryName })
      ).unwrap();
      console.log("response", response);
      if (response) {
        setGetRestaurant(response);
      } else {
        setGetRestaurant([]);
      }
    } catch (error) {
      console.error("Error in API calls:", error);
    }
  };

  useEffect(() => {
    fetchRestaurants(searchTerm);
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchRestaurants(searchTerm);
    } else {
      alert("Please enter a restaurant name to search.");
    }
  };

  const goToRestaurantMenuPage = (id) => {
    navigate(`/Restaurant/${id}`);
  };
console.log('getRestaurant',getRestaurant);

  return (
    <div className="main-restlist">
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
                  <Form
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
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-restsection">
        <div className="container">
          <h2 className="mb-4 title-2 text-gray">
            <b>Restaurants in </b>
            <span className="text-trans">{searchTerm}</span>
          </h2>
          {loading ? (
            <p>Loading restaurants...</p>
          ) : error ? (
            <p className="text-danger">Error: {error}</p>
          ) : getRestaurant.length > 0 ? (
            <div className="row">
              {getRestaurant.map((restaurantItem) => (
                <div
                  key={restaurantItem.restaurantId}
                  className="col-lg-4 col-md-6 col-sm-12 mb-4"
                >
                  <Card
                    className="sectioncard border-0 shadow-sm"
                    onClick={() =>
                      goToRestaurantMenuPage(restaurantItem.restaurantId)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <Card.Img
                      variant="top"
                      src={restaurantItem.imageUrl || no_img}
                      alt={restaurantItem.restaurantName || "No Image"}
                      className="img-fluid"
                    />
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="m-0">{restaurantItem.restaurantName}</h6>
                        <div className="rate d-flex align-items-center">
                          <IoIosStar className="text-warning" />
                          <span className="ms-1">
                            {restaurantItem.averageRating}
                          </span>
                        </div>
                      </div>
                      <p className="text-muted small">
                        {restaurantItem.branches?.[0]?.locality
                          ? restaurantItem.branches?.[0]?.locality + ", "
                          : " "}
                        {restaurantItem.branches?.[0]?.city ||
                          "Address not available"}
                      </p>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted text-center">
              No restaurants found in this category.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Restaurants;
