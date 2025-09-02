import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import '../assets/css/Dashboard.css'
//C:\ccs\Project\FoodApp Sprint\src\pages\Dashboard.js
const Dashboard = () => {
    return (
        <main className='container-wrapper restaurant-dashboard'>
            <Navbar />
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <h2 className="title-1">s</h2>
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
