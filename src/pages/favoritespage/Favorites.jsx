import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { deleteFavorite, fetchFavorites } from "../../apiCalls/FavoriteAPI";

import "./Favorites.css";

const Favorites = () => {
  const dispatch = useDispatch();

  const {
    loading,
    error,
    favorites = [],
  } = useSelector((state) => state.favorites);

  // Fetch favorites
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);
  
  // Remove favorite
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Remove this property from your favorites?",
    );

    if (confirmDelete) {
      dispatch(deleteFavorite(id));
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="favorites-status">
        <div className="favorites-spinner"></div>

        <p>Loading Favorites...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="favorites-status">
        <div className="favorites-error-card">
          <div className="favorites-error-icon">
            <i
              className="fa-solid fa-triangle-exclamation"
              style={{ color: "rgb(255, 2, 2)" }}
            ></i>
          </div>

          <h2>Something went wrong</h2>

          <p>
            {typeof error === "string"
              ? error
              : "Unable to load your favorites."}
          </p>

          <button
            onClick={() => dispatch(fetchFavorites())}
            className="favorites-retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      {/* Header */}
      <div className="favorites-header">
        <div className="favorites-header-inner">
          <p className="favorites-breadcrumb">RentEasy / Tenant</p>

          <h1>My Favorites</h1>

          <p>Properties you saved for later.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="favorites-container">
        {favorites.length === 0 ? (
          /* Empty State */
          <div className="favorites-empty-card">
            <div className="favorites-empty-icon">♡</div>

            <h2>No Favorite Properties Found</h2>

            <p>Properties you add to favorites will appear here.</p>

            <Link to="/properties" className="browse-favorites-button">
              Browse Properties
            </Link>
          </div>
        ) : (
          /* Favorite Properties */
          <div className="favorites-content">
            <div className="favorites-section-header">
              <div>
                <h2>Favorite Properties</h2>

                <p>
                  {favorites.length}{" "}
                  {favorites.length === 1 ? "property" : "properties"} saved
                </p>
              </div>
            </div>

            <div className="favorites-grid">
              {favorites.map((favorite) => (
                <div className="favorite-card" key={favorite.id}>
                  {/* Property Image */}
                  <div className="favorite-image-wrapper">
                    {favorite.property_image ? (
                      <img
                        src={favorite.property_image}
                        alt={favorite.property_title || "Property"}
                        className="favorite-property-image"
                      />
                    ) : (
                      <div className="favorite-no-image">
                        <span>
                          <i
                            className="fa-solid fa-home"
                            style={{ color: "rgb(255, 2, 2)" }}
                          ></i>
                        </span>
                        <p>No Image Available</p>
                      </div>
                    )}

                    {/* Favorite Badge */}
                    <div className="favorite-badge">
                      <i
                        className="fa-solid fa-heart"
                        style={{ color: "rgb(255, 2, 2)" }}
                      ></i>{" "}
                      Favorite
                    </div>
                  </div>

                  {/* Property Content */}
                  <div className="favorite-content">
                    <h3 className="favorite-title">
                      {favorite.property_title}
                    </h3>

                    {/* City */}
                    <div className="favorite-info">
                      <span className="favorite-label">
                        <i
                          className="fa-solid fa-map-pin"
                          style={{ color: "rgb(255, 2, 2)" }}
                        ></i>{" "}
                        City
                      </span>

                      <span className="favorite-value">
                        {favorite.property_city}
                      </span>
                    </div>

                    {/* Address */}
                    <div className="favorite-info">
                      <span className="favorite-label">
                        <i
                          className="fa-solid fa-home"
                          style={{ color: "rgb(255, 2, 2)" }}
                        ></i>{" "}
                        Address
                      </span>

                      <span className="favorite-value">
                        {favorite.property_address}
                      </span>
                    </div>

                    {/* Rent */}
                    <div className="favorite-rent">
                      <span>₹{favorite.property_rent}</span>

                      <small>/ month</small>
                    </div>

                    {/* Buttons */}
                    <div className="favorite-actions">
                      <Link
                        to={`/properties/${favorite.property}`}
                        className="favorite-view-button"
                      >
                        View Property
                      </Link>

                      <button
                        onClick={() => handleDelete(favorite.id)}
                        className="favorite-remove-button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
