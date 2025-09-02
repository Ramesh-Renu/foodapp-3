import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { restaurantSearch } from "../redux/action/RestaurantSearchAction";

const useSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      dispatch(restaurantSearch({ searchText: searchTerm }));
      navigate(`/Restaurant-List?search=${encodeURIComponent(searchTerm)}`);
    } else {
      alert("Please enter a restaurant name to search.");
    }
  };

  return { handleSearch };
};

export default useSearch;
