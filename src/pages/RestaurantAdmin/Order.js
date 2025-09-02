import Navbar from "../../components/RestaurantAdmin/Navbar";
import Sidebar from "../../components/RestaurantAdmin/Sidebar";
import { Tab, Tabs } from "react-bootstrap";
import '../../assets/css/Admin/Order.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PendingOrders from "../../components/RestaurantAdmin/PendingOrders";

const RestaurantOrderManagement = () => {
    return (
        <main className='container-wrapper restaurant-order restaurant-admin'>
            <Navbar />
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <h2 className="title-1">Order Management</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Tabs defaultActiveKey="pending" id="order-management-tabs" className="mb-3">
                                        <Tab eventKey="pending" title="Pending">
                                            <PendingOrders />
                                        </Tab>
                                        <Tab eventKey="preparing" title="Preparing">
                                            <p>Content for Preparing Tab.</p>
                                        </Tab>
                                        <Tab eventKey="completed" title="Completed">
                                            <p>Content for Completed Tab.</p>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default RestaurantOrderManagement;
