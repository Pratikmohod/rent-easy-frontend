import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { fetchSingleBooking, cancelBooking } from "../../apiCalls/BookingAPI";

import "./BookingDetails.css";

const BookingDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, singleBooking } = useSelector(
    (state) => state.bookings,
  );

  useEffect(() => {
    dispatch(fetchSingleBooking(id));
  }, [dispatch, id]);

  const handleCancelBooking = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmCancel) {
      return;
    }

    const result = await dispatch(cancelBooking(id));

    if (cancelBooking.fulfilled.match(result)) {
      navigate("/my-bookings");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "booking-details-status-pending";

      case "accepted":
        return "booking-details-status-accepted";

      case "rejected":
        return "booking-details-status-rejected";

      case "completed":
        return "booking-details-status-completed";

      case "cancelled":
        return "booking-details-status-cancelled";

      default:
        return "booking-details-status-default";
    }
  };

  if (loading) {
    return (
      <div className="booking-details-status-page">
        <div className="booking-details-spinner"></div>

        <p>Loading booking details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="booking-details-status-page">
        <div className="booking-details-error">
          <div className="booking-details-error-icon">⚠️</div>

          <h2>Something went wrong</h2>

          <p>
            {typeof error === "string"
              ? error
              : "Unable to load booking details."}
          </p>

          <button
            onClick={() => dispatch(fetchSingleBooking(id))}
            className="booking-details-retry"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!singleBooking) {
    return (
      <div className="booking-details-status-page">
        <div className="booking-details-not-found">
          <div className="booking-details-not-found-icon">
            <i
              className="fa-solid fa-calendar-days"
              style={{ color: "rgb(255, 2, 2)" }}
            ></i>
          </div>

          <h2>Booking Not Found</h2>

          <p>The booking you're looking for does not exist.</p>

          <button
            onClick={() => navigate("/my-bookings")}
            className="booking-details-back-button"
          >
            Back to My Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-details-page">
      {/* Header */}
      <div className="booking-details-header">
        <div className="booking-details-header-inner">
          <Link to="/my-bookings" className="booking-details-back-link">
            ←Back to My Bookings
          </Link>

          <p className="booking-details-breadcrumb">RentEasy / Booking</p>

          <h1>Booking Details</h1>
        </div>
      </div>

      {/* Main */}
      <div className="booking-details-container">
        <div className="booking-details-card">
          {/* Property Image */}
          {singleBooking.property_image && (
            <div className="booking-property-image-container">
              <img
                src={singleBooking.property_image}
                alt={singleBooking.property_title}
                className="booking-property-image"
              />
            </div>
          )}

          {/* Property Information */}
          <div className="booking-details-content">
            <div className="booking-property-header">
              <div>
                <span className="booking-property-label">Property</span>

                <h2>{singleBooking.property_title}</h2>
              </div>

              <span
                className={`booking-details-status ${getStatusClass(
                  singleBooking.status,
                )}`}
              >
                {singleBooking.status}
              </span>
            </div>

            {/* Property Location */}
            <section className="booking-details-section">
              <h3>Property Location</h3>

              <div className="booking-info-grid">
                <div className="booking-info-box">
                  <span>Address</span>

                  <strong>{singleBooking.property_address}</strong>
                </div>

                <div className="booking-info-box">
                  <span>City</span>

                  <strong>{singleBooking.property_city}</strong>
                </div>
              </div>
            </section>

            {/* Visit Details */}
            <section className="booking-details-section">
              <h3>Visit Details</h3>

              <div className="booking-info-grid">
                <div className="booking-info-box">
                  <span>Visit Date</span>

                  <strong>{singleBooking.visit_date}</strong>
                </div>

                <div className="booking-info-box">
                  <span>Visit Time</span>

                  <strong>{singleBooking.visit_time}</strong>
                </div>
              </div>
            </section>

            {/* Message */}
            <section className="booking-details-section">
              <h3>Your Message</h3>

              <div className="booking-message-box">
                {singleBooking.message || "No message provided."}
              </div>
            </section>

            {/* Landlord Details */}
            <section className="booking-details-section">
              <h3>Landlord Details</h3>

              <div className="booking-info-grid">
                <div className="booking-info-box">
                  <span>Name</span>

                  <strong>{singleBooking.landlord_name}</strong>
                </div>

                <div className="booking-info-box">
                  <span>Email</span>

                  <strong>{singleBooking.landlord_email}</strong>
                </div>
              </div>
            </section>

            {/* Actions */}
            {singleBooking.status === "pending" && (
              <div className="booking-details-actions">
                {/* Edit */}
                <Link
                  to={`/my-bookings/${singleBooking.id}/edit`}
                  className="booking-edit-button"
                >
                  Edit Booking
                </Link>

                {/* Cancel */}
                <button
                  type="button"
                  onClick={handleCancelBooking}
                  className="booking-cancel-button"
                  disabled={loading}
                >
                  {loading ? "Cancelling" : "Cancel Booking"}
                </button>
              </div>
            )}

            {/* Accepted */}
            {singleBooking.status === "accepted" && (
              <div className="booking-info-message booking-accepted-message">
                Your booking has been accepted by the landlord.
              </div>
            )}

            {/* Rejected */}
            {singleBooking.status === "rejected" && (
              <div className="booking-info-message booking-rejected-message">
                 This booking request was rejected by the landlord.
              </div>
            )}

            {/* Completed */}
            {singleBooking.status === "completed" && (
              <div className="booking-info-message booking-completed-message">
                Your property visit has been completed.
              </div>
            )}

            {/* Cancelled */}
            {singleBooking.status === "cancelled" && (
              <div className="booking-info-message booking-cancelled-message">
                This booking has been cancelled.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
