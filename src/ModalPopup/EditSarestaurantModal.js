// import React, { useEffect, useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { FETCH_CUISINE_TYPES } from "../redux/query/RestaurantAdmin/RestaurantAdmincuisineQuery";
// import Client from "../ApolloClient";
// import Select from "react-select";


// const EditRestaurantModal = ({ show, handleClose, onSubmit, restaurantData, }) => {

//   //
//   const [cuisineTypes, setCuisineTypes] = useState([]); 


//   const [stateSearch, setStateSearch] = useState('');
//   const [citySearch, setCitySearch] = useState('');
//   const [showStateDropdown, setShowStateDropdown] = useState(false);
//   const [showCityDropdown, setShowCityDropdown] = useState(false);
//   const [selectedState, setSelectedState] = useState('');
//   const [availableCities, setAvailableCities] = useState([]);


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

//   const [formData, setFormData] = useState({
//     restaurantName: "",
//     rating: "",
//     averagerating: "",
//     ratingsCount: "",
//     latitude: "",
//     longitude: "",
//     branchName: "",
//     branchAddress: "",
//     streetName: "",
//     houseNumber: "",
//     locality: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     phoneNumber: "",
//     cuisineTypeIds: "",
//   });

//   // Fetch cuisine types
//   useEffect(() => {
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
//     setFormData(prev => ({
//       ...prev,
//       state: state,
//       city: '' // Reset city when state changes
//     }));
//     setAvailableCities(citiesByState[state] || []);
//     setShowStateDropdown(false);
//     setStateSearch('');
//   };

//   const handleCitySelect = (city) => {
//     setFormData(prev => ({
//       ...prev,
//       city: city
//     }));
//     setShowCityDropdown(false);
//     setCitySearch('');
//   };


//   useEffect(() => {
//     if (restaurantData) {
//       const branch = restaurantData.branches?.[0] || {};
//       setFormData({
//         restaurantName: restaurantData.restaurantName || "",
//         rating: restaurantData.rating || "",
//         averagerating: restaurantData.averagerating || "",
//         ratingsCount: restaurantData.ratingsCount || "",
//         latitude: branch.latitude || "",
//         longitude: branch.longitude || "",
//         branchName: branch.branchName || "",
//         branchAddress: branch.address || "",
//         streetName: branch.streetName || "",
//         houseNumber: branch.houseNumber || "",
//         locality: branch.locality || "",
//         city: branch.city || "",
//         state: branch.state || "",
//         postalCode: branch.postalCode || "",
//         phoneNumber: branch.phoneNumber || "",
//         cuisineTypeIds: restaurantData.cuisineTypeId?.join(", ") || "",
//       });
//     }
//   }, [restaurantData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const updatedData = {
//       ...formData,
//       averagerating: formData.averagerating
//         ? parseFloat(formData.averagerating)
//         : 0,
//       ratingsCount: formData.ratingsCount
//         ? parseInt(formData.ratingsCount, 10)
//         : 0,
//       cuisineTypeIds: (formData.cuisineTypeIds || "")
//         .split(",")
//         .map((id) => parseInt(id.trim(), 10)),
//       branches: [
//         {
//           branchName: formData.branchName,
//           branchAddress: formData.branchAddress,
//           streetName: formData.streetName,
//           houseNumber: formData.houseNumber,
//           locality: formData.locality,
//           city: formData.city,
//           state: formData.state,
//           postalCode: formData.postalCode,
//           phoneNumber: formData.phoneNumber,
//           latitude: parseFloat(formData.latitude),
//           longitude: parseFloat(formData.longitude),
//         },
//       ],
//     };

//     await onSubmit(updatedData);
//     handleClose();
//   };

//   if (!restaurantData) {
//     return null;
//   }

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
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Edit Restaurant</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <div className="row">
//             {/* Left Column */}
//             <div className="col-md-6">
//               <Form.Group controlId="restaurantName">
//                 <Form.Label>Restaurant Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="restaurantName"
//                   value={formData.restaurantName}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group controlId="rating">
//                 <Form.Label>Rating</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="rating"
//                   value={formData.rating}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group controlId="averagerating">
//                 <Form.Label>Average Rating</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="averagerating"
//                   value={formData.averagerating || ""}
//                   onChange={handleChange}
//                   step="0.1"
//                 />
//               </Form.Group>

//               <Form.Group controlId="ratingsCount">
//                 <Form.Label>Rating Count</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="ratingsCount"
//                   value={formData.ratingsCount || ""}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               <Form.Group controlId="streetName">
//                 <Form.Label>Street Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="streetName"
//                   value={formData.streetName}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group controlId="branchAddress">
//                 <Form.Label>Address</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="branchAddress"
//                   value={formData.branchAddress}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               {/* Branch Details */}
//               <Form.Group controlId="branchName">
//                 <Form.Label>Branch Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="branchName"
//                   value={formData.branchName}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>


//               <Form.Group controlId="cuisineTypeIds">
//                   <Form.Label>Cuisine Type</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="cuisineTypeIds"
//                     value={formData.cuisineTypeIds}
//                     onChange={handleChange}
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

//             </div>

//             {/* Right Column */}
//             <div className="col-md-6">


//             <div className="input-block mb-3">
//   <label className="col-form-label">State</label>
//   <Select
//     options={indianStates.map((state) => ({ label: state, value: state }))}
//     placeholder="Search state..."
//     styles={customStyles}
//     value={stateSearch ? { label: stateSearch, value: stateSearch } : selectedState ? { label: selectedState, value: selectedState } : null}
//     onChange={(selectedOption) => handleStateSelect(selectedOption.value)}
//     onInputChange={(inputValue) => {
//       setStateSearch(inputValue);
//       setShowStateDropdown(true);
//     }}
//     onFocus={() => setShowStateDropdown(true)}
//   />
// </div>




// <div className="input-block mb-3">
//   <label className="col-form-label">City</label>
//   <Select
//     options={filteredCities.map((city) => ({ label: city, value: city }))}
//     placeholder="Search city..."
//     styles={customStyles}
//     value={citySearch ? { label: citySearch, value: citySearch } : formData.city ? { label: formData.city, value: formData.city } : null}
//     onChange={(selectedOption) => handleCitySelect(selectedOption.value)}
//     onInputChange={(inputValue) => {
//       setCitySearch(inputValue);
//       setShowCityDropdown(true);
//     }}
//     onFocus={() => setShowCityDropdown(true)}
//     // isDisabled={!selectedState} 
//   />
// </div>


//               <Form.Group controlId="postalCode">
//                 <Form.Label>Postal Code</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="postalCode"
//                   value={formData.postalCode}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group controlId="phoneNumber">
//                 <Form.Label>Phone Number</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group controlId="latitude">
//                 <Form.Label>Latitude</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="latitude"
//                   value={formData.latitude}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group controlId="longitude">
//                 <Form.Label>Longitude</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="longitude"
//                   value={formData.longitude}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group controlId="houseNumber">
//                 <Form.Label>House Number</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="houseNumber"
//                   value={formData.houseNumber}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group controlId="locality">
//                 <Form.Label>Locality</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="locality"
//                   value={formData.locality}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//             </div>
//           </div>

//           <Button variant="primary" type="submit">
//             Save Changes
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default EditRestaurantModal;

import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FETCH_CUISINE_TYPES } from "../redux/query/RestaurantAdmin/RestaurantAdmincuisineQuery";
import Client from "../ApolloClient";
import Select from "react-select";

const EditRestaurantModal = ({ show, handleClose, onSubmit, restaurantData }) => {
  const [cuisineTypes, setCuisineTypes] = useState([]);
  const [stateSearch, setStateSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [availableCities, setAvailableCities] = useState([]);

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


  const [formData, setFormData] = useState({
    restaurantName: "",
    rating: "",
    averagerating: "",
    ratingsCount: "",
    latitude: "",
    longitude: "",
    branchName: "",
    branchAddress: "",
    streetName: "",
    houseNumber: "",
    locality: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: "",
    cuisineTypeIds: "",
  });

  // Fetch cuisine types
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

  // Initialize form data and state/city when restaurantData changes
  useEffect(() => {
    if (restaurantData) {
      const branch = restaurantData.branches?.[0] || {};
      const stateValue = branch.state || "";
      
      setFormData({
        restaurantName: restaurantData.restaurantName || "",
        rating: restaurantData.rating || "",
        averagerating: restaurantData.averagerating || "",
        ratingsCount: restaurantData.ratingsCount || "",
        latitude: branch.latitude || "",
        longitude: branch.longitude || "",
        branchName: branch.branchName || "",
        branchAddress: branch.address || "",
        streetName: branch.streetName || "",
        houseNumber: branch.houseNumber || "",
        locality: branch.locality || "",
        city: branch.city || "",
        state: stateValue,
        postalCode: branch.postalCode || "",
        phoneNumber: branch.phoneNumber || "",
        cuisineTypeIds: restaurantData.cuisineTypeId?.join(", ") || "",
      });

      // Set selected state and available cities
      setSelectedState(stateValue);
      setAvailableCities(citiesByState[stateValue] || []);
    }
  }, [restaurantData]);

  const filteredStates = indianStates.filter(state =>
    state.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const filteredCities = availableCities.filter(city =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setFormData(prev => ({
      ...prev,
      state: state,
      city: '' // Reset city when state changes
    }));
    setAvailableCities(citiesByState[state] || []);
    setShowStateDropdown(false);
    setStateSearch('');
  };

  const handleCitySelect = (city) => {
    setFormData(prev => ({
      ...prev,
      city: city
    }));
    setShowCityDropdown(false);
    setCitySearch('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      averagerating: formData.averagerating
        ? parseFloat(formData.averagerating)
        : 0,
      ratingsCount: formData.ratingsCount
        ? parseInt(formData.ratingsCount, 10)
        : 0,
      cuisineTypeIds: (formData.cuisineTypeIds || "")
        .split(",")
        .map((id) => parseInt(id.trim(), 10)),
      branches: [
        {
          branchName: formData.branchName,
          branchAddress: formData.branchAddress,
          streetName: formData.streetName,
          houseNumber: formData.houseNumber,
          locality: formData.locality,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          phoneNumber: formData.phoneNumber,
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
        },
      ],
    };

    await onSubmit(updatedData);
    handleClose();
  };

  if (!restaurantData) {
    return null;
  }

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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Restaurant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="row">
            {/* Left Column */}
            <div className="col-md-6">
              <Form.Group controlId="restaurantName">
                <Form.Label>Restaurant Name</Form.Label>
                <Form.Control
                  type="text"
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="averagerating">
                <Form.Label>Average Rating</Form.Label>
                <Form.Control
                  type="number"
                  name="averagerating"
                  value={formData.averagerating || ""}
                  onChange={handleChange}
                  step="0.1"
                />
              </Form.Group>

              <Form.Group controlId="ratingsCount">
                <Form.Label>Rating Count</Form.Label>
                <Form.Control
                  type="number"
                  name="ratingsCount"
                  value={formData.ratingsCount || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="streetName">
                <Form.Label>Street Name</Form.Label>
                <Form.Control
                  type="text"
                  name="streetName"
                  value={formData.streetName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="branchAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="branchAddress"
                  value={formData.branchAddress}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="branchName">
                <Form.Label>Branch Name</Form.Label>
                <Form.Control
                  type="text"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="cuisineTypeIds">
                <Form.Label>Cuisine Type</Form.Label>
                <Form.Control
                  as="select"
                  name="cuisineTypeIds"
                  value={formData.cuisineTypeIds}
                  onChange={handleChange}
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
                  onChange={(selectedOption) => handleStateSelect(selectedOption.value)}
                  onInputChange={(inputValue) => {
                    setStateSearch(inputValue);
                    setShowStateDropdown(true);
                  }}
                  onFocus={() => setShowStateDropdown(true)}
                />
              </div>

              <div className="input-block mb-3">
                <label className="col-form-label">City</label>
                <Select
                  options={availableCities.map((city) => ({ label: city, value: city }))}
                  placeholder="Search city..."
                  styles={customStyles}
                  value={formData.city ? { label: formData.city, value: formData.city } : null}
                  onChange={(selectedOption) => handleCitySelect(selectedOption.value)}
                  onInputChange={(inputValue) => {
                    setCitySearch(inputValue);
                    setShowCityDropdown(true);
                  }}
                  onFocus={() => setShowCityDropdown(true)}
                  isDisabled={!selectedState}
                />
              </div>

              <Form.Group controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="latitude">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="longitude">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="text"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="houseNumber">
                <Form.Label>House Number</Form.Label>
                <Form.Control
                  type="text"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="locality">
                <Form.Label>Locality</Form.Label>
                <Form.Control
                  type="text"
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditRestaurantModal;