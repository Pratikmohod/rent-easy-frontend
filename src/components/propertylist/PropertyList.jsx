import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./PropertyList.css";

const PropertyList = ({ properties }) => {
  const navigate = useNavigate();

  const { singleUser } = useSelector((state) => state.user);

  const getImageUrl = (image) => {
    if (!image) return null;

    if (typeof image === "string") {
      return image;
    }
    return image.url || null;
  };

  return (
    <div className="property-list">
      {properties?.map((value) => {
        const primary_image =
          value.images?.find((image) => image.is_primary === true) ||
          value.images?.[0];

        const imageUrl = getImageUrl(primary_image?.image);
        return (
          <div className="property-card" key={value.id}>
            {/* Property Image */}
            <div className="property-image-container">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={value.title}
                  className="property-image"
                />
              ) : (
                <div className="no-property-image">No Image</div>
              )}

              {/* Property Type Badge */}
              <span className="property-type-badge">{value.property_type}</span>
            </div>

            {/* Property Information */}
            <div className="property-content">
              {/* Location */}
              <p className="property-location">
                <i
                  className="fa-solid fa-map-pin"
                  style={{ color: "rgb(255, 2, 2)" }}
                ></i>
                {value.city}, {value.state}
              </p>

              {/* Title */}
              <h2 className="property-title">{value.title}</h2>

              {/* Rent */}
              <div className="property-rent">
                <span>Rent:</span>
                <strong>₹{value.rent}</strong>
                <small>/ month</small>
              </div>

              {/* Tenant Preference */}
              <div className="tenant-preference">
                <span>Tenant Preference:</span>
                <strong>{value.tenant_preference}</strong>
              </div>

              {/* Description */}
              <p className="property-description">
                {value.description?.slice(0, 80)}
                {value.description?.length > 80 ? "..." : ""}
              </p>

              {/* View More */}
              <Link to={`/properties/${value.id}`} className="view-more-link">
                View More →
              </Link>

              {/* Actions */}
              <div className="property-actions">
                {/* View Property */}
                <Link
                  to={`/properties/${value.id}`}
                  className="view-details-btn"
                >
                  View Details
                </Link>

                {/* Only Tenant can book property */}

                {singleUser?.role === "tenant" && (
                  <button
                    onClick={() => 
                      navigate(`/properties/${value.id}/book`)
                    }
                    className="book-property-btn"
                  >
                    Book Visit
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PropertyList;
