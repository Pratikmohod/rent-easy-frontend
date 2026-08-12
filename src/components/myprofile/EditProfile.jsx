import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editProfile, fetchProfile } from "../../apiCalls/ProfileAPI";
import { clearMessages } from "../../slice/UserSlice";
import "./EditProfile.css";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleUser, loading, success, error } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile_no: "",
    gender: "",
    permanent_address: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (token && !singleUser) {
      dispatch(fetchProfile());
    }
  }, [dispatch, singleUser]);

  useEffect(() => {
    if (singleUser) {
      setFormData({
        username: singleUser.username || "",
        email: singleUser.email || "",
        mobile_no: singleUser.mobile_no || "",
        gender: singleUser.gender || "",
        permanent_address: singleUser.permanent_address || "",
        city: singleUser.city || "",
        state: singleUser.state || "",
        country: singleUser.country || "",
      });
    }
  }, [singleUser]);

  useEffect(() => {
    if (success === "Profile Updated Successfully") {
      dispatch(clearMessages());
      navigate("/myProfile");
    }
  }, [success, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(editProfile(formData));
  };

  if (loading && !singleUser) {
    return <div className="edit-profile-loading">Loading...</div>;
  }

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">

        {/* Header */}
        <div className="edit-profile-header">
          <h1>Edit Profile</h1>
          <p>Update your personal information</p>
        </div>

        {/* Error */}
        {error && (
          <div className="edit-profile-error">
            {typeof error === "string"
              ? error
              : "Something went wrong while updating your profile."}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="edit-profile-form">

          {/* Username */}
          <div className="form-group">
            <label htmlFor="username">Username</label>

            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          {/* Mobile */}
          <div className="form-group">
            <label htmlFor="mobile_no">Mobile Number</label>

            <input
              type="text"
              id="mobile_no"
              name="mobile_no"
              value={formData.mobile_no}
              onChange={handleChange}
              placeholder="Enter mobile number"
            />
          </div>

          {/* Gender */}
          <div className="form-group">
            <label htmlFor="gender">Gender</label>

            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Permanent Address */}
          <div className="form-group full-width">
            <label htmlFor="permanent_address">
              Permanent Address
            </label>

            <textarea
              id="permanent_address"
              name="permanent_address"
              value={formData.permanent_address}
              onChange={handleChange}
              placeholder="Enter permanent address"
              rows="3"
            />
          </div>

          {/* City */}
          <div className="form-group">
            <label htmlFor="city">City</label>

            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
          </div>

          {/* State */}
          <div className="form-group">
            <label htmlFor="state">State</label>

            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
            />
          </div>

          {/* Country */}
          <div className="form-group">
            <label htmlFor="country">Country</label>

            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter country"
            />
          </div>

          {/* Buttons */}
          <div className="edit-profile-actions">

            <button
              type="submit"
              className="save-profile-btn"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/myProfile")}
              className="cancel-profile-btn"
            >
              Cancel
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;