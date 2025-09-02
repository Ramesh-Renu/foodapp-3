// import React, { useState, useEffect } from "react";
// import { Modal, Form, Button } from "react-bootstrap";
// import { CiSearch } from "react-icons/ci";
// import "../assets/css/AddSARestaurantModal.css";
// import { FETCH_CUISINE_TYPES } from "../redux/query/RestaurantAdmin/RestaurantAdmincuisineQuery";
// import Client from "../ApolloClient";
// import Select from "react-select";


// // import { FETCH_CUISINE_TYPES } from "../../graphql/queries";
// // import client from "../../apollo/client";

// const AddRestaurantModal = ({ show, handleClose, onSubmit  }) => {

//   // cuisine types
//    const [cuisineTypes, setCuisineTypes] = useState([]); 

//   const [stateSearch, setStateSearch] = useState('');
//   const [citySearch, setCitySearch] = useState('');
//   const [showStateDropdown, setShowStateDropdown] = useState(false);
//   const [showCityDropdown, setShowCityDropdown] = useState(false);
//   const [selectedState, setSelectedState] = useState('');
//   const [availableCities, setAvailableCities] = useState([]);
  
//   //
  


//   const indianStates = [
//     "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
//     "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
//     "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
//     "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
//     "West Bengal"
//   ];

//   const citiesByState = {
//     "Andhra Pradesh": [
//       "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Kakinada",
//       "Tirupati", "Rajahmundry", "Kadapa", "Anantapur", "Vizianagaram", "Eluru", "Ongole", "Nandyal"
//     ],
//     "Arunachal Pradesh": [
//       "Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro", "Along", "Bomdila", "Roing", "Tezu"
//     ],
//     "Assam": [
//       "Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur",
//       "Karimganj", "Hailakandi", "Diphu", "North Lakhimpur"
//     ],
//     "Bihar": [
//       "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif",
//       "Arrah", "Begusarai", "Katihar", "Munger", "Chhapra", "Danapur", "Saharsa"
//     ],
//     "Chhattisgarh": [
//       "Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Jagdalpur",
//       "Raigarh", "Ambikapur", "Mahasamund", "Dhamtari"
//     ],
//     "Goa": [
//       "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem",
//       "Cuncolim", "Valpoi", "Sanquelim"
//     ],
//     "Gujarat": [
//       "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar",
//       "Junagadh", "Gandhidham", "Anand", "Navsari", "Morbi", "Nadiad", "Surendranagar"
//     ],
//     "Haryana": [
//       "Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar",
//       "Karnal", "Sonipat", "Panchkula", "Bhiwani", "Sirsa", "Bahadurgarh"
//     ],
//     "Himachal Pradesh": [
//       "Shimla", "Mandi", "Solan", "Dharamshala", "Kullu", "Manali", "Baddi", "Nahan",
//       "Hamirpur", "Una", "Chamba", "Dalhousie", "Palampur"
//     ],
//     "Jharkhand": [
//       "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar", "Phusro",
//       "Giridih", "Ramgarh", "Medininagar", "Chirkunda", "Gumla"
//     ],
//     "Karnataka": [
//       "Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Davanagere",
//       "Bellary", "Bijapur", "Shimoga", "Tumkur", "Raichur", "Hassan", "Udupi"
//     ],
//     "Kerala": [
//       "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad",
//       "Alappuzha", "Kannur", "Kottayam", "Malappuram", "Kasaragod", "Pathanamthitta"
//     ],
//     "Madhya Pradesh": [
//       "Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna",
//       "Ratlam", "Rewa", "Murwara", "Singrauli", "Burhanpur", "Khandwa"
//     ],
//     "Maharashtra": [
//       "Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Kolhapur",
//       "Amravati", "Navi Mumbai", "Sangli", "Akola", "Chandrapur", "Dhule"
//     ],
//     "Manipur": [
//       "Imphal", "Thoubal", "Kakching", "Ukhrul", "Churachandpur", "Bishnupur", "Senapati",
//       "Chandel", "Moreh", "Jiribam"
//     ],
//     "Meghalaya": [
//       "Shillong", "Tura", "Nongstoin", "Williamnagar", "Jowai", "Baghmara", "Resubelpara",
//       "Mairang", "Nongpoh"
//     ],
//     "Mizoram": [
//       "Aizawl", "Lunglei", "Champhai", "Kolasib", "Serchhip", "Lawngtlai", "Saitual",
//       "Khawzawl", "Mamit"
//     ],
//     "Nagaland": [
//       "Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Mon", "Peren",
//       "Phek", "Kiphire"
//     ],
//     "Odisha": [
//       "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore",
//       "Bhadrak", "Baripada", "Jharsuguda", "Jeypore", "Barbil"
//     ],
//     "Punjab": [
//       "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot",
//       "Hoshiarpur", "Batala", "Moga", "Malerkotla", "Khanna", "Phagwara"
//     ],
//     "Rajasthan": [
//       "Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar",
//       "Sikar", "Sri Ganganagar", "Pali", "Kishangarh", "Bharatpur"
//     ],
//     "Sikkim": [
//       "Gangtok", "Namchi", "Gyalshing", "Mangan", "Rangpo", "Singtam", "Jorethang",
//       "Nayabazar", "Ravangla"
//     ],
//     "Tamil Nadu": [
//       "Chennai", "Coimbatore", "Madurai", "Salem", "Tirunelveli", "Tiruchirappalli",
//       "Vellore", "Erode", "Thoothukkudi", "Dindigul", "Thanjavur", "Tiruppur", "Karur",
//       "Namakkal", "Tiruvannamalai", "Pudukkottai", "Nagercoil", "Kanchipuram"
//     ],
//     "Telangana": [
//       "Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam",
//       "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet", "Miryalaguda"
//     ],
//     "Tripura": [
//       "Agartala", "Udaipur", "Dharmanagar", "Pratapgarh", "Belonia", "Kailasahar",
//       "Khowai", "Teliamura", "Mohanpur"
//     ],
//     "Uttar Pradesh": [
//       "Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj", "Meerut", "Bareilly",
//       "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad"
//     ],
//     "Uttarakhand": [
//       "Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh",
//       "Kathgodam", "Pithoragarh", "Ramnagar", "Mussoorie"
//     ],
//     "West Bengal": [
//       "Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman", "Malda",
//       "Baharampur", "Habra", "Kharagpur", "Shantipur", "Dankuni", "Dhulian", "Ranaghat"
//     ]
//   };


//   const [restaurantData, setRestaurantData] = useState({
//     restaurantName: "",
//     rating: "",
//     averageRating: "",
//     ratingCount: "",
//     branchAddress: "",
//     streetName: "",
//     houseNumber: "",
//     locality: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     phoneNumber: "",
//     latitude: "",
//     longitude: "",
//     branchName: "",
//     cuisineTypeIds: [],
//   });

//    // Fetch cuisine types
//    useEffect(() => {
//     const fetchCuisineTypes = async () => {
//       try {
//         const { data } = await Client.query({
//           query: FETCH_CUISINE_TYPES,
//         });
//         setCuisineTypes(data.cousineTypes || []);
//       } catch (error) {
//         console.error("Error fetching cuisine types:", error);
//       }
//     };

//     fetchCuisineTypes();
//   }, []);


//   const filteredStates = indianStates.filter(state =>
//     state.toLowerCase().includes(stateSearch.toLowerCase())
//   );

//   const filteredCities = availableCities.filter(city =>
//     city.toLowerCase().includes(citySearch.toLowerCase())
//   );

//   const handleStateSelect = (state) => {
//     setSelectedState(state);
//     setRestaurantData(prev => ({
//       ...prev,
//       state: state,
//       city: '' // Reset city when state changes
//     }));
//     setAvailableCities(citiesByState[state] || []);
//     setShowStateDropdown(false);
//     setStateSearch('');
//   };

//   const handleCitySelect = (city) => {
//     setRestaurantData(prev => ({
//       ...prev,
//       city: city
//     }));
//     setShowCityDropdown(false);
//     setCitySearch('');
//   };
  



//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setRestaurantData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(restaurantData);
//     handleClose();
//     setRestaurantData({
//       restaurantName: "",
//       rating: "",
//       averageRating: "",
//       ratingCount: "",
//       branchAddress: "",
//       streetName: "",
//       houseNumber: "",
//       locality: "",
//       city: "",
//       state: "",
//       postalCode: "",
//       phoneNumber: "",
//       latitude: "",
//       longitude: "",
//       branchName: "",
//       cuisineTypeIds: "",
//     });
//   };

//   const customStyles = {
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isFocused ? "#27500B" : "#fff",
//       color: state.isFocused ? "#fff" : "#000",
//       "&:hover": {
//         backgroundColor: "#27500B",
//       },
//     }),
//   };

//   return (
//     <section className="super-admin-restaurant-modal">
//       <Modal show={show} onHide={handleClose} dialogClassName="custom-modal-width">
//         <Modal.Header closeButton>
//           <Modal.Title>Add Restaurant</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <div className="row">
//               {/* Left Column */}
//               <div className="col-md-6">
//                 <Form.Group controlId="restaurantName">
//                   <Form.Label>Restaurant Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="restaurantName"
//                     value={restaurantData.restaurantName}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="rating">
//                   <Form.Label>Rating</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="rating"
//                     value={restaurantData.rating}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="averageRating">
//                   <Form.Label>Average Rating</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="averageRating"
//                     value={restaurantData.averageRating}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="ratingCount">
//                   <Form.Label>Rating Count</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="ratingCount"
//                     value={restaurantData.ratingCount}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="streetName">
//                   <Form.Label>Street Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="streetName"
//                     value={restaurantData.streetName}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="branchAddress">
//                   <Form.Label>Address</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="branchAddress"
//                     value={restaurantData.branchAddress}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="branchName">
//                   <Form.Label>Branch Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="branchName"
//                     value={restaurantData.branchName}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="cuisineTypeIds">
//                   <Form.Label>Cuisine Type</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="cuisineTypeIds"
//                     value={restaurantData.cuisineTypeIds}
//                     onChange={handleInputChange}
//                     required
                    
//                   >
//                     <option value="">Select Cuisine Type</option>
//                     {cuisineTypes.map((cuisine) => (
//                       <option key={cuisine.cuisineTypeId} value={cuisine.cuisineTypeId}>
//                         {cuisine.cuisineTypeId}
//                       </option>
//                     ))}
//                   </Form.Control>
//                 </Form.Group>
//               </div>

//               {/* Right Column */}
//               <div className="col-md-6">


              
//   <div className="input-block mb-3">
//     <label className="col-form-label">State</label>
//     <Select
//       options={indianStates.map((state) => ({ label: state, value: state }))}
//       placeholder="Search state..."
//       styles={customStyles}
//       value={selectedState ? { label: selectedState, value: selectedState } : null}
//       onChange={(selectedOption) => {
//         handleStateSelect(selectedOption.value);
//       }}
//       onInputChange={(inputValue) => {
//         setStateSearch(inputValue);
//         setShowStateDropdown(true);
//       }}
//       onFocus={() => setShowStateDropdown(true)}
//     />
//   </div>


//   <div className="input-block mb-3">
//     <label className="col-form-label">City</label>
//     <Select
//       options={availableCities.map((city) => ({ label: city, value: city }))}
//       placeholder="Search city..."
//       styles={customStyles}
//       value={restaurantData.city ? { label: restaurantData.city, value: restaurantData.city } : null}
//       onChange={(selectedOption) => {
//         handleCitySelect(selectedOption.value);
//       }}
//       onInputChange={(inputValue) => {
//         setCitySearch(inputValue);
//         setShowCityDropdown(true);
//       }}
//       onFocus={() => setShowCityDropdown(true)}
//       isDisabled={!selectedState}
//     />
//   </div>




//                 <Form.Group controlId="postalCode">
//                   <Form.Label>Postal Code</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="postalCode"
//                     value={restaurantData.postalCode}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="phoneNumber">
//                   <Form.Label>Phone Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="phoneNumber"
//                     value={restaurantData.phoneNumber}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="latitude">
//                   <Form.Label>Latitude</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="latitude"
//                     value={restaurantData.latitude}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="longitude">
//                   <Form.Label>Longitude</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="longitude"
//                     value={restaurantData.longitude}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="houseNumber">
//                   <Form.Label>House Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="houseNumber"
//                     value={restaurantData.houseNumber}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="locality">
//                   <Form.Label>Locality</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="locality"
//                     value={restaurantData.locality}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>
//               </div>
//             </div>

//             <Button variant="primary" type="submit" className="mt-3">
//               Submit
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </section>
//   );
// };

// export default AddRestaurantModal;


import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import "../assets/css/AddSARestaurantModal.css";
import { FETCH_CUISINE_TYPES } from "../redux/query/RestaurantAdmin/RestaurantAdmincuisineQuery";
import Client from "../ApolloClient";
import Select from "react-select";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  restaurantName: Yup.string()
    .required("Restaurant name is required"),
  
  rating: Yup.number()
    .required("Rating is required"),
  
  averageRating: Yup.number()
    .required("Average rating is required"),
  
  ratingCount: Yup.number()
    .required("Rating count is required"),
  
  address: Yup.string()
    .required("Address is required"),
  
  streetName: Yup.string()
    .required("Street name is required"),
  
  houseNumber: Yup.string()
    .required("House number is required")
    .max(20, "House number must not exceed 20 characters"),
  
  locality: Yup.string()
    .required("Locality is required"),
  
  city: Yup.string()
    .required("City is required"),
  
  state: Yup.string()
    .required("State is required"),
  
  postalCode: Yup.string()
    .required("Postal code is required")
    .matches(/^[0-9]{6}$/, "Postal code must be exactly 6 digits"),
  
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  
  latitude: Yup.number()
    .required("Latitude is required")
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  
  longitude: Yup.number()
    .required("Longitude is required")
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
  
  branchName: Yup.string()
    .required("Branch name is required"),
  
  cuisineTypeIds: Yup.array()
    .required("Cuisine type is required"),
});


const AddRestaurantModal = ({ show, handleClose, onSubmit }) => {
  const initialFormState = {
    restaurantName: "",
    rating: "",
    averageRating: "",
    ratingCount: "",
    branchAddress: "",
    streetName: "",
    houseNumber: "",
    locality: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: "",
    latitude: "",
    longitude: "",
    branchName: "",
    cuisineTypeIds: [],
  };

  const [cuisineTypes, setCuisineTypes] = useState([]);
  const [stateSearch, setStateSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [availableCities, setAvailableCities] = useState([]);
  const [restaurantData, setRestaurantData] = useState(initialFormState);

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
    "West Bengal"
  ];

  const citiesByState = {
    "Andhra Pradesh": [
      "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Kakinada",
      "Tirupati", "Rajahmundry", "Kadapa", "Anantapur", "Vizianagaram", "Eluru", "Ongole", "Nandyal"
    ],
    "Arunachal Pradesh": [
      "Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro", "Along", "Bomdila", "Roing", "Tezu"
    ],
    "Assam": [
      "Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur",
      "Karimganj", "Hailakandi", "Diphu", "North Lakhimpur"
    ],
    "Bihar": [
      "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif",
      "Arrah", "Begusarai", "Katihar", "Munger", "Chhapra", "Danapur", "Saharsa"
    ],
    "Chhattisgarh": [
      "Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Jagdalpur",
      "Raigarh", "Ambikapur", "Mahasamund", "Dhamtari"
    ],
    "Goa": [
      "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem",
      "Cuncolim", "Valpoi", "Sanquelim"
    ],
    "Gujarat": [
      "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar",
      "Junagadh", "Gandhidham", "Anand", "Navsari", "Morbi", "Nadiad", "Surendranagar"
    ],
    "Haryana": [
      "Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar",
      "Karnal", "Sonipat", "Panchkula", "Bhiwani", "Sirsa", "Bahadurgarh"
    ],
    "Himachal Pradesh": [
      "Shimla", "Mandi", "Solan", "Dharamshala", "Kullu", "Manali", "Baddi", "Nahan",
      "Hamirpur", "Una", "Chamba", "Dalhousie", "Palampur"
    ],
    "Jharkhand": [
      "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar", "Phusro",
      "Giridih", "Ramgarh", "Medininagar", "Chirkunda", "Gumla"
    ],
    "Karnataka": [
      "Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Davanagere",
      "Bellary", "Bijapur", "Shimoga", "Tumkur", "Raichur", "Hassan", "Udupi"
    ],
    "Kerala": [
      "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad",
      "Alappuzha", "Kannur", "Kottayam", "Malappuram", "Kasaragod", "Pathanamthitta"
    ],
    "Madhya Pradesh": [
      "Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna",
      "Ratlam", "Rewa", "Murwara", "Singrauli", "Burhanpur", "Khandwa"
    ],
    "Maharashtra": [
      "Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Kolhapur",
      "Amravati", "Navi Mumbai", "Sangli", "Akola", "Chandrapur", "Dhule"
    ],
    "Manipur": [
      "Imphal", "Thoubal", "Kakching", "Ukhrul", "Churachandpur", "Bishnupur", "Senapati",
      "Chandel", "Moreh", "Jiribam"
    ],
    "Meghalaya": [
      "Shillong", "Tura", "Nongstoin", "Williamnagar", "Jowai", "Baghmara", "Resubelpara",
      "Mairang", "Nongpoh"
    ],
    "Mizoram": [
      "Aizawl", "Lunglei", "Champhai", "Kolasib", "Serchhip", "Lawngtlai", "Saitual",
      "Khawzawl", "Mamit"
    ],
    "Nagaland": [
      "Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Mon", "Peren",
      "Phek", "Kiphire"
    ],
    "Odisha": [
      "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore",
      "Bhadrak", "Baripada", "Jharsuguda", "Jeypore", "Barbil"
    ],
    "Punjab": [
      "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot",
      "Hoshiarpur", "Batala", "Moga", "Malerkotla", "Khanna", "Phagwara"
    ],
    "Rajasthan": [
      "Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar",
      "Sikar", "Sri Ganganagar", "Pali", "Kishangarh", "Bharatpur"
    ],
    "Sikkim": [
      "Gangtok", "Namchi", "Gyalshing", "Mangan", "Rangpo", "Singtam", "Jorethang",
      "Nayabazar", "Ravangla"
    ],
    "Tamil Nadu": [
      "Chennai", "Coimbatore", "Madurai", "Salem", "Tirunelveli", "Tiruchirappalli",
      "Vellore", "Erode", "Thoothukkudi", "Dindigul", "Thanjavur", "Tiruppur", "Karur",
      "Namakkal", "Tiruvannamalai", "Pudukkottai", "Nagercoil", "Kanchipuram"
    ],
    "Telangana": [
      "Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam",
      "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet", "Miryalaguda"
    ],
    "Tripura": [
      "Agartala", "Udaipur", "Dharmanagar", "Pratapgarh", "Belonia", "Kailasahar",
      "Khowai", "Teliamura", "Mohanpur"
    ],
    "Uttar Pradesh": [
      "Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj", "Meerut", "Bareilly",
      "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad"
    ],
    "Uttarakhand": [
      "Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh",
      "Kathgodam", "Pithoragarh", "Ramnagar", "Mussoorie"
    ],
    "West Bengal": [
      "Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman", "Malda",
      "Baharampur", "Habra", "Kharagpur", "Shantipur", "Dankuni", "Dhulian", "Ranaghat"
    ]
  };

  useEffect(() => {
    const fetchCuisineTypes = async () => {
      try {
        const { data } = await Client.query({
          query: FETCH_CUISINE_TYPES,
        });
        setCuisineTypes(data.cousineTypes || []);
      } catch (error) {
        console.error("Error fetching cuisine types:", error);
      }
    };

    fetchCuisineTypes();
  }, []);

  const resetForm = () => {
    setRestaurantData(initialFormState);
    setSelectedState('');
    setStateSearch('');
    setCitySearch('');
    setAvailableCities([]);
    setShowStateDropdown(false);
    setShowCityDropdown(false);
  };

  const handleModalClose = () => {
    resetForm();
    handleClose();
  };

  const filteredStates = indianStates.filter(state =>
    state.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const filteredCities = availableCities.filter(city =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setRestaurantData(prev => ({
      ...prev,
      state: state,
      city: ''
    }));
    setAvailableCities(citiesByState[state] || []);
    setShowStateDropdown(false);
    setStateSearch('');
  };

  const handleCitySelect = (city) => {
    setRestaurantData(prev => ({
      ...prev,
      city: city
    }));
    setShowCityDropdown(false);
    setCitySearch('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(restaurantData);
    handleModalClose();
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#27500B" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#27500B",
      },
    }),
  };

  return (
    <section className="super-admin-restaurant-modal">
      <Modal show={show} onHide={handleModalClose} dialogClassName="custom-modal-width">
        <Modal.Header closeButton>
          <Modal.Title>Add Restaurant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Formik
          initialFormState={initialFormState}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm();
            handleClose();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
          <Form onSubmit={handleSubmit}>
            <div className="row">
              {/* Left Column */}
              <div className="col-md-6">
                <Form.Group controlId="restaurantName">
                  <Form.Label>Restaurant Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="restaurantName"
                    value={restaurantData.restaurantName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    isInvalid={touched.restaurantName && errors.restaurantName}
                  />
                   <Form.Control.Feedback type="invalid">
                      {errors.restaurantName}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="number"
                    name="rating"
                    value={restaurantData.rating}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    isInvalid={touched.rating && errors.rating}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.rating}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="averageRating">
                  <Form.Label>Average Rating</Form.Label>
                  <Form.Control
                    type="number"
                    name="averageRating"
                    value={restaurantData.averageRating}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    isInvalid={touched.averageRating && errors.averageRating}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.averageRating}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="ratingCount">
                  <Form.Label>Rating Count</Form.Label>
                  <Form.Control
                    type="number"
                    name="ratingCount"
                    value={restaurantData.ratingCount}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    isInvalid={touched.ratingCount && errors.ratingCount}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.ratingCount}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="streetName">
                  <Form.Label>Street Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="streetName"
                    value={restaurantData.streetName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    isInvalid={touched.streetName && errors.streetName}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.streetName}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="branchAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="branchAddress"
                    value={restaurantData.branchAddress}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    isInvalid={touched.address && errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.address}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="branchName">
                  <Form.Label>Branch Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="branchName"
                    value={restaurantData.branchName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    isInvalid={touched.branchName && errors.branchName}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.branchName}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="cuisineTypeIds">
                  <Form.Label>Cuisine Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="cuisineTypeIds"
                    value={restaurantData.cuisineTypeIds}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Cuisine Type</option>
                    {cuisineTypes.map((cuisine) => (
                      <option key={cuisine.cuisineTypeId} value={cuisine.cuisineTypeId}>
                        {cuisine.cuisineTypeId}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>

              {/* Right Column */}
              <div className="col-md-6">
                
                  <div className="input-block mb-3">
                    <label className="col-form-label">State</label>
                    <Select
                      options={indianStates.map((state) => ({ label: state, value: state }))}
                      placeholder="Search state..."
                      styles={customStyles}
                      value={selectedState ? { label: selectedState, value: selectedState } : null}
                      onChange={(selectedOption) => {
                        handleStateSelect(selectedOption.value);
                      }}
                      onInputChange={(inputValue) => {
                        setStateSearch(inputValue);
                        setShowStateDropdown(true);
                      }}
                      onFocus={() => setShowStateDropdown(true)}
                      isInvalid={touched.state && errors.state}
                    />
                    {touched.state && errors.state && (
                      <div className="invalid-feedback text-danger">
                        {errors.state}
                      </div>
                    )}
                  </div>
                

                  <div className="input-block mb-3">
                    <label className="col-form-label">City</label>
                    <Select
                      options={availableCities.map((city) => ({ label: city, value: city }))}
                      placeholder="Search city..."
                      styles={customStyles}
                      value={restaurantData.city ? { label: restaurantData.city, value: restaurantData.city } : null}
                      onChange={(selectedOption) => {
                        handleCitySelect(selectedOption.value);
                      }}
                      onInputChange={(inputValue) => {
                        setCitySearch(inputValue);
                        setShowCityDropdown(true);
                      }}
                      onFocus={() => setShowCityDropdown(true)}
                      isDisabled={!selectedState} // Disable if no state selected
                      isInvalid={touched.city && errors.city}
                    />
                    {touched.city && errors.city && (
                      <div className="invalid-feedback d-block">
                        {errors.city}
                      </div>
                    )}
                  </div>

                <Form.Group controlId="postalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="postalCode"
                    value={restaurantData.postalCode}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    isInvalid={touched.postalCode && errors.postalCode}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.postalCode}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="phoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={restaurantData.phoneNumber}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    isInvalid={touched.phoneNumber && errors.phoneNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.phoneNumber}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="latitude">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control
                    type="text"
                    name="latitude"
                    value={restaurantData.latitude}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    isInvalid={touched.latitude && errors.latitude}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.latitude}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="longitude">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control
                    type="text"
                    name="longitude"
                    value={restaurantData.longitude}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    isInvalid={touched.longitude && errors.longitude}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.longitude}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="houseNumber">
                  <Form.Label>House Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="houseNumber"
                    value={restaurantData.houseNumber}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    isInvalid={touched.houseNumber && errors.houseNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.houseNumber}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="locality">
                  <Form.Label>Locality</Form.Label>
                  <Form.Control
                    type="text"
                    name="locality"
                    value={restaurantData.locality}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    isInvalid={touched.locality && errors.locality}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.locality}
                    </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
          )}
        </Formik>

        </Modal.Body>
      </Modal>
    </section>
  );
};

export default AddRestaurantModal;