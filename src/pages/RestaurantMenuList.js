import React, { useState } from "react";
import RestaurntMenuImage from "../assets/images/banner_1.png";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { MdOutlineShoppingBag } from "react-icons/md";
import "../assets/css/RestaurantMenuList.css";
import {Button, Container, Row, Col, Card, Badge, Form,} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { FaStar, FaClock } from "react-icons/fa";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { LuIndianRupee } from "react-icons/lu";
import Hyderabadi_Biryani from "../assets/images/food_4.png";
import Paneer_Makhani from "../assets/images/food_5.png";
import Butter_Chicken from "../assets/images/food_6.png";
import Tandoori_Chicken from "../assets/images/food_3.png";
import Veg_Manchurian from "../assets/images/food_2.png";
import Dhal_Makhani from "../assets/images/food_1.png";
import { BiSolidOffer } from "react-icons/bi";
import SortByModal from "./SortByModal";


const RestaurantMenuList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  //

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  // Sample restaurant data
  const restaurants = [
    { id: 1, name: "SS Hyderabad Biryani", location: "Kodambakkam, Chennai", image: Hyderabadi_Biryani, rating: 4.3, deliveryTime: "20-25 Mins", pricePerPerson: "₹300 for one", discount: "60% OFF UPTO ₹80" },
    { id: 2, name: "Faruuzi Multicuisine", location: "Medavakkam, Chennai", image: Paneer_Makhani, rating: 4.2, deliveryTime: "25-30 Mins", pricePerPerson: "₹350 for one", discount: "60% OFF UPTO ₹120" },
    { id: 3, name: "Ambur Star Briyani", location: "Sholinganallur, Chennai", image: Butter_Chicken, rating: 4.8, deliveryTime: "10-20 Mins", pricePerPerson: "₹250 for one" },
    { id: 4, name: "Sukkubhai Biryani", location: "Perambur, Chennai", image: Tandoori_Chicken, rating: 4.1, deliveryTime: "15-20 Mins", pricePerPerson: "₹200 for one" },
    { id: 5, name: "Yaa Mohaideen Biryani", location: "Medavakkam, Chennai", image: Veg_Manchurian, rating: 3.9, deliveryTime: "25-30 Mins", pricePerPerson: "₹200 for one" },
    { id: 6, name: "Dindigul Thalappakatti", location: "Siruseri, Chennai", image: Dhal_Makhani, rating: 4.7, deliveryTime: "25-30 Mins", pricePerPerson: "₹200 for one" }
  ];

  return (
    <div className="main-rest-menu-list">
      {/* Banner Section */}
      <section className="banner position-relative">
        <img
          src={RestaurntMenuImage}
          alt="Banner"
          className="img-fluid w-100"
          style={{ height: "550px", objectFit: "cover" }}
        />

        {/* Header Section */}
        <header className="header position-absolute top-0 w-100">
          <nav className="navbar navbar-expand-lg container py-3">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="Logo" width="120" />
            </Link>
            <h6 className="heading6 text-white">PickUp Your Food!</h6>

            <div className="d-flex ms-auto">
              <Link
                to="/cart"
                className="btn bg-success text-white d-flex align-items-center justify-content-center me-2"
              >
                <i className="fas fa-shopping-cart"></i>
                <BiSolidOffer size={25} className="me-2" />
                Offers
              </Link>

              <Link
                to="/cart"
                className="btn bg-success text-white d-flex align-items-center justify-content-center"
              >
                <i className="fas fa-shopping-cart"></i>
                <MdOutlineShoppingBag size={25} className="me-2" />
                Cart
              </Link>
            </div>
          </nav>
        </header>

        {/* Search Card Section */}
        <Card className="search-card mb-4">
          <Card.Body>
            <Card.Title className="text-center ">
              Skip the wait and pick up your food with ease!
            </Card.Title>
            <form
              onSubmit={handleSearch}
              className="search-form d-flex align-items-center "
            >
              <div className="search-input-container d-flex align-items-center me-1 mt-2">
                <FaSearch className="search-icon " />
                <Form.Control
                  type="text"
                  placeholder="Search your favorite Foods..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="me-1 fs-20 "
                />
              </div>
            </form>

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
          </Card.Body>
        </Card>
      </section>

      <section>
        <div className="container">
          <div className="row mt-20-custom mb-5">
            <div className="col ml-4-custom d-flex">
              <button className="btn btn-outline-secondary me-2 btn-rounded" >
                <TbAdjustmentsHorizontal size={20} /> Filter
              </button>
              {/* <button className="btn btn-outline-secondary me-2 btn-rounded">
                <FaAngleDown size={20} /> Sort By
              </button> */}
              <SortByModal />
              <button className="btn btn-outline-secondary me-2 btn-rounded">
                Veg Only
              </button>
              <button className="btn btn-outline-secondary me-2 btn-rounded">
                Less than 30 min
              </button>
              <button className="btn btn-outline-secondary btn-rounded">
                <LuIndianRupee size={20} /> 200 - 300
              </button>
            </div>
          </div>
        </div>
      </section>

      <Container className="menu-list mt-4">
        <Row>
          {restaurants.map((restaurant) => (
            <Col key={restaurant.id} xs={12} md={6} lg={4}>
              <Card className="mb-4 card-no-outline">
                <Card.Img
                  variant="top"
                  src={restaurant.image}
                  alt={restaurant.name}
                />
                <Card.ImgOverlay className="d-flex align-items-start justify-content-between">
                  <Badge className="p-2">
                    {restaurant.discount}
                  </Badge>
                </Card.ImgOverlay>
                <Card.Body className="card-body-custom">
                  <Card.Title>{restaurant.name}</Card.Title>
                  <Card.Text>{restaurant.location}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <FaStar className="text-green me-1" />
                      <span>{restaurant.rating}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaClock className="text-green me-1" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <span>{restaurant.pricePerPerson}</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default RestaurantMenuList;
