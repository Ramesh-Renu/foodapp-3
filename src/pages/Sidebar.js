import React from "react";
import { CiGrid42 } from "react-icons/ci";
import { LuShoppingBag, LuMenuSquare } from "react-icons/lu";
import { BsFileBarGraphFill } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa6";
import { MdSettings } from "react-icons/md";

const Sidebar = () => {
    return (
        <div className="col-md-2 shadow-lg vh-100" style={{ marginLeft: "-20px" }}>
            <div className="d-flex flex-column h-100 py-3" style={{ marginLeft: "19px" }}>
                {/* Sidebar Menu */}
                <div className="d-flex align-items-center p-3 text-muted rounded-3">
                    <CiGrid42 size={25} />
                    <span className="m-lg-2">Overview</span>
                </div>
                <div className="d-flex align-items-center p-3 text-muted">
                    <LuShoppingBag size={25} />
                    <span className="m-lg-2">Orders</span>
                </div>
                <div className="d-flex align-items-center p-3 text-muted">
                    <LuMenuSquare size={25} />
                    <span className="m-lg-2">Menu</span>
                </div>
                <div className="d-flex align-items-center p-3 text-muted">
                    <BsFileBarGraphFill size={25} />
                    <span className="m-lg-2">Sales</span>
                </div>
                <div className="d-flex align-items-center p-3 text-muted">
                    <FaRegCommentDots size={25} />
                    <span className="m-lg-2">Feedback</span>
                </div>
                <div className="d-flex align-items-center p-3 text-muted">
                    <MdSettings size={25} />
                    <span className="m-lg-2">Settings</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
