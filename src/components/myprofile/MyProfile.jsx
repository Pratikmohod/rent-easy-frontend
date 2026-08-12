import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProfile, deleteProfile } from "../../apiCalls/ProfileAPI";
import { clearMessages } from "../../slice/UserSlice";
import "./MyProfile.css";

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleUser, loading, success } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (token && !singleUser) {
      dispatch(fetchProfile());
    }
  }, [dispatch, singleUser]);

  useEffect(() => {
    if (success === "Account Deleted Successfully") {
      dispatch(clearMessages());
      navigate("/login");
    }
  }, [dispatch, success, navigate]);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the account?",
    );

    if (confirmDelete) {
      dispatch(deleteProfile());
    }
  };

  if (loading) {
    return <div className="profile-loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* PROFILE HEADER */}
        <div className="profile-header">
          <div className="profile-avatar">
            {singleUser?.username?.charAt(0).toUpperCase()}
          </div>

          <div className="profile-header-info">
            <h1>{singleUser?.username}</h1>
            <span className="profile-role">{singleUser?.role}</span>
          </div>
        </div>

        {/* FULL INFORMATION */}
        <div className="profile-card">
          <h2>Personal Information</h2>

          <div className="profile-grid">
            {/* Email */}
            <div className="profile-field">
              <label>Email</label>
              <p>{singleUser?.email || "Not provided"}</p>
            </div>

            {/* Mobile */}
            <div className="profile-field">
              <label>Mobile No</label>
              <p>{singleUser?.mobile_no || "Not provided"}</p>
            </div>

            {/* Gender */}
            <div className="profile-field">
              <label>Gender</label>
              <p>{singleUser?.gender || "Not provided"}</p>
            </div>

            {/* Permanent Address */}
            <div className="profile-field profile-full">
              <label>Permanent Address</label>
              <p>{singleUser?.permanent_address || "Not provided"}</p>
            </div>

            {/* City */}
            <div className="profile-field">
              <label>City</label>
              <p>{singleUser?.city || "Not provided"}</p>
            </div>

            {/* State */}
            <div className="profile-field">
              <label>State</label>
              <p>{singleUser?.state || "Not provided"}</p>
            </div>

            {/* Country */}
            <div className="profile-field">
              <label>Country</label>
              <p>{singleUser?.country || "Not provided"}</p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="profile-actions">
            <button
              onClick={() => navigate("/editProfile")}
              className="update-profile-btn"
            >
              Update Profile
            </button>

            <button onClick={handleDelete} className="delete-profile-btn">
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
