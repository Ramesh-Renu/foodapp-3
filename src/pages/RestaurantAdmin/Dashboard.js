import Navbar from "../../components/RestaurantAdmin/Navbar";
import Sidebar from "../../components/RestaurantAdmin/Sidebar";
import '../../assets/css/Admin/Dashboard.css'
const Dashboard = () => {
    return (
        <main className='container-wrapper restaurant-dashboard restaurant-admin'>
            <Navbar />
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <h2 className="title-1">Dashboard</h2>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
