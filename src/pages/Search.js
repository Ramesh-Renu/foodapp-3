import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { restaurantSearch } from "../redux/action/RestaurantSearchAction";
import { useNavigate } from "react-router-dom";
import useSearch from "../hooks/useSearch";


const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { handleSearch } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div className="main-restlist">
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
                    onSubmit={handleSubmit}
                    className="search-form d-flex align-items-center"
                  >
                    <div className="search-input-container d-flex align-items-center me-1 mt-2">
                      <FaSearch className="search-icon" />
                      <Form.Control
                        type="text"
                        placeholder="Search your favorite Restaurants"
                        value={searchTerm}
                        onChange={(e) => {
                          console.log("Input value:", e.target.value); 
                          setSearchTerm(e.target.value)}}
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
    </div>
  );
};

export default Search;
