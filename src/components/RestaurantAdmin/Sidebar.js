import { AiOutlineInbox } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { IoFastFoodOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineCategory, MdOutlineSettings } from "react-icons/md";
import { RiFileList2Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li className={`nav-item ${isActive("/Dashboard") ? "active" : ""}`}>
                    <Link className="nav-link" to="/Dashboard">
                        <LuLayoutDashboard className="text-dark fs-4" />
                        <span className="menu-title text-dark ms-2">Dashboard</span>
                    </Link>
                </li>
                <li className={`nav-item ${isActive("/RestaurantOrder") ? "active" : ""}`}>
                    <Link className="nav-link" to="/RestaurantOrder">
                        <AiOutlineInbox className="text-dark fs-4" />
                        <span className="menu-title text-dark ms-2">Order</span>
                    </Link>
                </li>
                
                <li className={`nav-item ${isActive("/RestaurantMenu") ? "active" : ""}`}>
                    <Link className="nav-link" to="/RestaurantMenu">
                        <RiFileList2Line  className="text-dark fs-4" />
                        <span className="menu-title text-dark ms-2">Menus</span>
                    </Link>
                </li>
                <li className={`nav-item ${isActive("/RestaurantCategory") ? "active" : ""}`}>
                    <Link className="nav-link" to="/RestaurantCategory">
                        <MdOutlineCategory  className="text-dark fs-4" />
                        <span className="menu-title text-dark ms-2">Category</span>
                    </Link>
                </li>
                <li className={`nav-item ${isActive("/RestaurantCuisine") ? "active" : ""}`}>
                    <Link className="nav-link" to="/RestaurantCuisine">
                        <IoFastFoodOutline  className="text-dark fs-4" />
                        <span className="menu-title text-dark ms-2">Cuisine</span>
                    </Link>
                </li>
                <li className={`nav-item ${isActive("/RestaurantSetting") ? "active" : ""}`}>
                    <Link className="nav-link" to="/RestaurantSetting">
                        <MdOutlineSettings  className="text-dark fs-4" />
                        <span className="menu-title text-dark ms-2">Settings</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout} to="/RestaurantLogin">
                        <IoMdLogOut  className="text-dark fs-4" />
                        <span className="menu-title text-dark ms-2">Logout</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
