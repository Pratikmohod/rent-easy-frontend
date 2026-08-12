import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  deleteProperty,
  fetchSingleProperty,
} from "../../apiCalls/PropertiesAPI";

import { addFavorite } from "../../apiCalls/FavoriteAPI";
import ImageSlider from "../../components/imageslider/ImageSlider";

import "./SingleProperty.css";

const SingleProperty = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleUser } = useSelector((state) => state?.user);

  const { singleProperty, loading, error, responseCode } = useSelector(
    (state) => state?.properties,
  );

  // Fetch property
  useEffect(() => {
    dispatch(fetchSingleProperty(id));
  }, [dispatch, id]);

  // Navigate after delete
  useEffect(() => {
    if (responseCode === 204) {
      navigate("/properties");
    }
  }, [responseCode, navigate]);

  // Loading
  if (loading && !singleProperty) {
    return (
      <div className="single-property-status">
        <p>Loading property...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="single-property-status">
        <div className="status-card">
          <h2>Something went wrong</h2>

          <p>
            {typeof error === "string"
              ? error
              : "Unable to load property details."}
          </p>

          <button
            onClick={() => navigate("/properties")}
            className="primary-button"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  // Property not found
  if (!singleProperty) {
    return (
      <div className="single-property-status">
        <div className="status-card">
          <h2>Property Not Found</h2>

          <button
            onClick={() => navigate("/properties")}
            className="primary-button"
          >
            Browse Properties
          </button>
        </div>
      </div>
    );
  }

  // Delete property
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?",
    );

    if (confirmDelete) {
      dispatch(deleteProperty(id));
    }
  };

  return (
    <div className="single-property-page">
      {/* PAGE HEADER */}
      <div className="single-property-header">
        <div className="single-property-header-inner">
          <p className="breadcrumb">RentEasy / Property Details</p>

          <h1>Property Details</h1>
        </div>
      </div>

      {/* PROPERTY CARD */}
      <div className="single-property-container">
        <div className="single-property-card">
          {/* IMAGE GALLERY */}
          <div className="property-gallery">
            <ImageSlider images={singleProperty.images} />
          </div>

          {/* PROPERTY INFORMATION */}
          <div className="property-details">
            {/* TITLE + PROPERTY TYPE */}
            <div className="property-heading">
              <span className="property-type">
                {singleProperty.property_type}
              </span>

              <h2>{singleProperty.title}</h2>
            </div>

            {/* RENT */}
            <div className="rent-box">
              <p className="rent-label">Monthly Rent</p>

              <div className="rent-value">
                <p>₹{singleProperty.rent}</p>
                <span>/ month</span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="property-section">
              <h3>Description</h3>

              <p className="description">
                {singleProperty.description || "No description available."}
              </p>
            </div>

            {/* PROPERTY INFORMATION */}
            <div className="property-section">
              <h3>Property Information</h3>

              <div className="property-info-grid">
                {/* Location */}
                <div className="info-box">
                  <p className="info-label">Location</p>

                  <p className="info-value">
                    {singleProperty.city}, {singleProperty.state}
                  </p>
                </div>

                {/* BHK */}
                <div className="info-box">
                  <p className="info-label">BHK</p>

                  <p className="info-value">{singleProperty.bhk} BHK</p>
                </div>

                {/* Bathrooms */}
                <div className="info-box">
                  <p className="info-label">Bathrooms</p>

                  <p className="info-value">{singleProperty.bathrooms}</p>
                </div>

                {/* Area */}
                <div className="info-box">
                  <p className="info-label">Area</p>

                  <p className="info-value">{singleProperty.area_sqft} sq.ft</p>
                </div>

                {/* Furnishing */}
                <div className="info-box">
                  <p className="info-label">Furnishing</p>

                  <p className="info-value capitalize">
                    {singleProperty.furnishing}
                  </p>
                </div>

                {/* Tenant Preference */}
                <div className="info-box">
                  <p className="info-label">Tenant Preference</p>

                  <p className="info-value capitalize">
                    {singleProperty.tenant_preference}
                  </p>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="property-actions">
              {/* TENANT ACTIONS */}
              {!singleProperty.is_owner && (
                <div className="tenant-actin-section">
                  {singleUser?.role === "tenant" && (
                    <div className="tenant-actions">

                      {/* BOOK VISIT */}

                      <Link
                        to={`/properties/${singleProperty.id}/book`}
                        className="action-link"
                      >
                        <button type="button" className="book-visit-button">
                          Book Visit
                        </button>
                      </Link>

                        {/* Favorite BUTTON */}
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            addFavorite({
                              property: singleProperty.id,
                            }),
                          )
                        }
                        className="favorite-button"
                      >
                        Add to Favorites
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* LANDLORD ACTIONS */}
              {singleUser?.role === "landlord" &&
              singleProperty.owner === singleUser.id && (
                <div className="landlord-actions">
                  {/* UPDATE PROPERTY */}
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/editSingleProperty/${singleProperty.id}`)
                    }
                    className="update-property-button"
                  >
                    Update Property
                  </button>

                  {/* DELETE PROPERTY */}
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={loading}
                    className="delete-property-button"
                  >
                    {loading ? "Deleting..." : "Delete Property"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProperty;
