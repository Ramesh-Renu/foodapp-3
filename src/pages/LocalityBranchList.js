import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { restaurantSearch } from "../redux/action/RestaurantSearchAction";
import { Card, Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import "../assets/css/RestaurantList.css";
import { fetchRestaurantsByLocality } from "../redux/action/LocalityBranchListAction";
import Header from "../components/Header";
import no_img from "../assets/images/no_img.png"

const LocalityRestaurants = () => {
  const { locality } = useParams();
  const dispatch = useDispatch();
  const { restaurants, status, error } = useSelector(
    (state) => state.localityrestaurants
  );
  const { restaurant } = useSelector((state) => state.restaurantSearch);
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [searchTerm, setSearchTerm] = useState(query.get("search") || "");

  useEffect(() => {
    if (locality) {
      dispatch(fetchRestaurantsByLocality({ locality }));
    }
  }, [locality, dispatch]);

  useEffect(() => {
    dispatch(restaurantSearch({ searchText: "" }));
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(restaurantSearch({ searchText: searchTerm }));
    } else {
      alert("Please enter a restaurant name to search.");
    }
  };

  const goToRestaurantMenuPage = (id) => {
    navigate(`/Restaurant/${id}`);
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

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
            <span className="text-trans">{locality}</span>
          </h2>
          <div className="row">
            {restaurants.map((restaurantItem) => (
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
                    {restaurantItem.branches?.[0]?.locality ? restaurantItem.branches?.[0]?.locality+", " :" "}
                      {restaurantItem.branches?.[0]?.city ||
                        "Address not available"}
                    </p>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalityRestaurants;