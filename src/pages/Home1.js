//C:\ccs\Project\FoodApp Sprint\src\pages\Home1.js

import React, { useEffect, useState } from "react";
import "../assets/css/Home.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocalities } from "../redux/action/HomeBranchCountAction";

const Home1 = () => {
  const dispatch = useDispatch();
  const { restaurants, loading, error } = useSelector(
    (state) => state.restaurants
  );
  const { localities, loading: locationLoading, error: locationError } = useSelector(
    (state) => state.location
  );
  
  /* Branch Count Start */
  const [location, setLocation] = useState("Chennai");
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
  /* Branch Count End */
  

  return (
    <main className="home">
      <section className="sec-localities p-5">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 text-center">
              <h2 className="title-2 p-5 text-gray">
                Popular Localities in around 
                <span className="text-dark"> {location}</span>
              </h2>
            </div>
            <div className="offset-xl-1 offset-lg-1 col-col-xl-10 col-lg-10 col-md-12 col-sm-12">
              <div className="row">
              {loading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div>Error loading localities</div>
                ) : (
                  uniqueLocalities.map((branch, index) => (
                <div key={index} className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <a href={`/Restaurant/${branch.locality.replace(/ /g, "")}`} className="card p-2 position-relative m-1 mb-4">
                    <h4 className="text-left text-dark mt-2 m-1">{branch.locality}</h4>
                    <p className="text-left text-gray m-2">{branch.count} Places</p>
                    <MdKeyboardArrowRight />
                  </a>
                </div>
                ))
              )}
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home1;