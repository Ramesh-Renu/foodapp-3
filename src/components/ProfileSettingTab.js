import React from "react";
import "../assets/css/MyAccounts.css";
import { LuSettings } from "react-icons/lu";


const ProfileSettingTab = () => {
  return (
    <div
      className=" tab-panel fade accordion-item border-0"
      id="tab-3-panel"
      role="tabpanel"
      aria-labelledby="tab-3"
      tabindex="0"
    >
      <h2 className="accordion-header d-lg-none" id="headingThree">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseThree"
          aria-expanded="true"
          aria-controls="collapseThree"
        >
          <LuSettings className="me-2" /> Settings
        </button>
      </h2>
      <div
        id="collapseThree"
        className="accordion-collapse collapse  d-lg-block"
        aria-labelledby="headingThree"
        data-bs-parent="#myTabContent"
      >
        <div className="accordion-body bg-white pt-0">
          <h4 className="tab-heading">Notification Preference</h4>
          <p className="mt-3 font-secondary text-gray fs-5">
            Order related SMS cannot be disabled as they are critical to provide
            service
          </p>

          <h4 className="mt-4 align-items d-flex font-secondary-bold">Recommendations & Reminders <label className="switch ms-2">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label></h4>

          

          <p className="mt-4 font-secondary text-gray fs-5">
            Keep this on to receive offer recommendations & timely reminders
            based on your interests
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingTab;
