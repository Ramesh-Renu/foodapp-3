import { AiOutlineInbox } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
    };
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
            <li className="nav-item active">
                    <Link className="nav-link" to="/SADashboard">
                        <LuLayoutDashboard className="text-dark fs-4" />
                        <span className="menu-title text-dark ms-2">Dashboard</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/SARestaurant">
                        <AiOutlineInbox className="text-dark fs-4" />
                        <span className="menu-title text-dark  ms-2">Restaurant</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/SARestaurantUser">
                        <AiOutlineInbox className="text-dark fs-4" />
                        <span className="menu-title text-dark  ms-2">RestaurantUser</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/SARestaurantMenus">
                        <AiOutlineInbox className="text-dark fs-4"  />
                        <span className="menu-title text-dark ms-2">Restaurant Menus</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout} to="/RestaurantLogin">
                        <AiOutlineInbox className="text-dark fs-4"  />
                        <span className="menu-title text-dark ms-2">Logout</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
