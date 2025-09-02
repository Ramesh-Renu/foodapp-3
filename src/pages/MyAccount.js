import React, { useState } from "react";
import "../assets/css/MyAccounts.css";
import profile_placeholder from "../assets/images/profile_placeholder.png";

import { MdEmail, MdOutlineShoppingBag } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_USER_DETAILS } from "../redux/query/LoginOtpQuery";
import { setUserData, setError } from "../redux/slicer/LoginOtpSlicer";

import ProfilePastOrderTab from "../components/ProfilePastOrderTab";
import ProfileSettingTab from "../components/ProfileSettingTab";
import AddProfileModal from "../ModalPopup/AddProfileModal";
import EditProfileModal from "../ModalPopup/EditProfileModal";
import ProfileAddressTab from "../components/ProfileAddressTab";
import { FaLocationDot } from "react-icons/fa6";
import Header from "../components/Header";

const MyAccount = () => {
  const dispatch = useDispatch();
  const { userId, userData } = useSelector((state) => state.user);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const parsedUserId = userId ? parseInt(userId, 10) : null;

  // Check if only phone number exists
  const hasOnlyPhoneNumber =
    userData?.phoneNumber &&
    !userData?.userProfiles?.[0]?.firstName &&
    !userData?.userProfiles?.[0]?.lastName &&
    !userData?.email;

  // User Details Query
  const { loading: queryLoading } = useQuery(GET_USER_DETAILS, {
    variables: { userId: parsedUserId },
    skip: !parsedUserId,
    onCompleted: (data) => {
      if (data?.userDetails) {
        dispatch(setUserData(data.userDetails));
      }
    },
    onError: (error) => {
      dispatch(setError(error.message));
    },
  });

  const handleShowModal = () => {
    if (hasOnlyPhoneNumber) {
      setShowAddModal(true);
    } else {
      setShowEditModal(true);
    }
  };

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);

  const fullName =
    userData?.userProfiles?.length > 0
      ? `${userData.userProfiles[0].firstName || ""} ${
          userData.userProfiles[0].lastName || ""
        }`.trim()
      : "";

  // if (queryLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <main className="main-myaccount">
      <Header />
      <section className="sec-banner account">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="offset-xl-1 offset-lg-1 col-xl-5 col-lg-5 col-md-5 col-sm-12 d-flex justify-content-start align-items-center">
              <div className="profile-img">
                <img
                  className="profile-img"
                  src={profile_placeholder}
                  alt="Profile"
                />
              </div>
              <div className="profile-details align-middle align-items-center">
                <ul className="mb-0 ms-4">
                  {fullName && (
                    <li className="profile-name fs-2 text-white fw-bold mb-2">
                      {fullName}
                    </li>
                  )}
                  {userData?.email && (
                    <li className="profile-email text-white d-flex align-items-center fs-5 mb-2">
                      <MdEmail className="me-2" />
                      {userData.email}
                    </li>
                  )}
                  {userData?.phoneNumber && (
                    <li className="profile-phone text-white d-flex align-items-center fs-5">
                      <FaPhoneAlt className="me-2" />
                      {userData.phoneNumber}
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 text-end">
              <Link
                to="#"
                onClick={handleShowModal}
                className="text-light b-1 btn border-1 border-light p-3 px-4 mt-0 mb-0 ms-auto me-0"
              >
                {hasOnlyPhoneNumber ? "Add Profile" : "Edit Profile"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-user-details bg-green-light pt-0 pb-5">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="offset-xl-1 offset-lg-1 col-xl-10 col-lg-10 col-md-10 col-sm-12">
              <div className="row bg-white tab-main-row pe-0">
                <div className="col-sm-12 col-md-12 col-lg-3 col-xl-3">
                  <ul
                    className="nav nav-tabs d-none d-lg-flex tab-df-unset border-bottom-0"
                    id="myTab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active border-0 border-bottom-0 text-gray"
                        id="tab-1"
                        data-bs-toggle="tab"
                        data-bs-target="#tab-1-panel"
                        type="button"
                        role="tab"
                        aria-controls="tab-1-panel"
                        aria-selected="true"
                      >
                        <MdOutlineShoppingBag className="me-2" />
                        Orders
                      </button>
                    </li>

                    {/* <li className="nav-item" role="presentation">
                      <button
                        className="nav-link border-0 border-bottom-0"
                        id="tab-2"
                        data-bs-toggle="tab"
                        data-bs-target="#tab-2-panel"
                        type="button"
                        role="tab"
                        aria-controls="tab-2-panel"
                        aria-selected="false"
                      >
                        <FaRegCreditCard className="me-2" /> Cards
                      </button>
                    </li> */}
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link border-0 border-bottom-0"
                        id="tab-4"
                        data-bs-toggle="tab"
                        data-bs-target="#tab-4-panel"
                        type="button"
                        role="tab"
                        aria-controls="tab-4-panel"
                        aria-selected="false"
                      >
                        <FaLocationDot className="me-2 fw-2" /> Address
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link border-0 border-bottom-0"
                        id="tab-3"
                        data-bs-toggle="tab"
                        data-bs-target="#tab-3-panel"
                        type="button"
                        role="tab"
                        aria-controls="tab-3-panel"
                        aria-selected="false"
                      >
                        <LuSettings className="me-2" /> Settings
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-9 col-xl-9 pe-0">
                  <div
                    className="tab-content accordion tab-user"
                    id="myTabContent"
                  >
                    <ProfilePastOrderTab />

                    <ProfileAddressTab />
                    <ProfileSettingTab />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AddProfileModal
        show={showAddModal}
        onClose={handleCloseAddModal}
        userData={userData}
        userId={parsedUserId}
      />

      <EditProfileModal
        show={showEditModal}
        onClose={handleCloseEditModal}
        userData={userData}
        userId={parsedUserId}
      />
    </main>
  );
};

export default MyAccount;
