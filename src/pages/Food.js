import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/action/CategoryAction";
import "react-multi-carousel/lib/styles.css";
import useSearch from "../hooks/useSearch";
import "../assets/css/RestaurantMenuPage.css"
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import no_img from "../assets/images/no_img.png";

const Food = () => {
  
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { categories, loading, error } = useSelector((state) => state.categories);
  const { handleSearch } = useSearch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const goToRestaurantMenuPage = (categoryName) => {
    navigate(`/Categories/${categoryName}`);
  };

  if (error) return <p>Error: {error}</p>;


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
console.log('categories',categories);

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
                    onSubmit={handleSubmit}
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

      <section className=" sec-restaurant-search-category-food1 mt-6">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <h2 className="mb-5 title-3 text-gray">
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
                categories?.map((category) => (
                  <div key={category.categoryId} className="col-md-3 food-list">
                    <Card className="sectioncard mb-4 border-0 rounded"
                    onClick={() => goToRestaurantMenuPage(category.categoryName)}
                    style={{ cursor: "pointer" }}>
                      <Card.Img
                        src={category.imageUrl || no_img}
                        alt={`Category ${category.categoryName}` || "No Image"}
                        className="img-fluid rounded-lg"
                      />
                      <Card.Body>
                        <Card.Title>{category.categoryName}</Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              )}
            </div>
            {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-4 text-center">
              <Link
                to="/Varieties"
                className="bg-success text-light btn btn-primary"
                variant="secondary"
                style={{ width: "300px" }}
              >
                See All Varieties
              </Link>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Food;
