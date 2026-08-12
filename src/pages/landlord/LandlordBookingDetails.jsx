import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchLandlordBookings,
  updateBookingStatus,
} from "../../apiCalls/BookingAPI";

import "./LandlordBookingDetails.css";

const LandlordBookingDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    error,
    landlordBookings = [],
  } = useSelector((state) => state.bookings);

  // Fetch landlord bookings
  useEffect(() => {
    dispatch(fetchLandlordBookings());
  }, [dispatch]);

  // Loading
  if (loading) {
    return (
      <div className="landlord-booking-page">
        <div className="landlord-booking-status">
          <div className="landlord-booking-spinner"></div>
          <p>Loading booking details...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="landlord-booking-page">
        <div className="landlord-booking-error">
          <div className="booking-error-icon">
            <i
              className="fa-solid fa-triangle-exclamation"
              style={{ color: "rgb(218, 0, 255)" }}
            ></i>
          </div>

          <h2>Something went wrong</h2>

          <p>
            {typeof error === "string"
              ? error
              : "Unable to load booking details."}
          </p>

          <button
            onClick={() => dispatch(fetchLandlordBookings())}
            className="booking-retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Find booking
  const booking = landlordBookings.find((booking) => booking.id === Number(id));

  // Booking not found
  if (!booking) {
    return (
      <div className="landlord-booking-page">
        <div className="booking-not-found">
          <div className="booking-not-found-icon">
            <i
              className="fa-solid fa-calendar-days"
              style={{ color: "rgb(218, 0, 255)" }}
            ></i>
          </div>

          <h2>Booking Not Found</h2>

          <p>The booking you're looking for could not be found.</p>

          <button
            onClick={() => navigate("/landlord/bookings")}
            className="booking-back-button"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  // Update booking status
  const handleStatusUpdate = async (status) => {
    let confirmMessage;

    if (status === "accepted") {
      confirmMessage = "Are you sure you want to accept this booking?";
    } else if (status === "rejected") {
      confirmMessage = "Are you sure you want to reject this booking?";
    } else if (status === "completed") {
      confirmMessage = "Mark this property visit as completed?";
    }

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      const result = await dispatch(
        updateBookingStatus({
          id: booking.id,
          status: status,
        }),
      ).unwrap();

      console.log("Booking status updated:", result);

      // Refresh bookings after successful update
      dispatch(fetchLandlordBookings());
    } catch (error) {
      console.error("Booking status update failed:", error);
    }
  };

  return (
    <div className="landlord-booking-page">
      {/* Header */}
      <div className="landlord-booking-header">
        <div className="landlord-booking-header-inner">
          <button
            type="button"
            onClick={() => navigate("/landlord/bookings")}
            className="booking-back-link"
          >
            Back to Booking Requests
          </button>

          <p className="booking-breadcrumb">RentEasy / Landlord</p>

          <h1>Booking Details</h1>

          <p>Review the tenant's request and manage the property visit.</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="landlord-booking-container">
        <div className="landlord-booking-card">
          {/* Property Image */}
          {booking.property_image && (
            <div className="booking-property-image-wrapper">
              <img
                src={booking.property_image}
                alt={booking.property_title}
                className="booking-property-image"
              />
            </div>
          )}

          {/* Property Header */}
          <div className="booking-property-header">
            <div className="booking-property-info">
              <span className="booking-property-label">Property</span>

              <h2>{booking.property_title}</h2>

              <p>
                <i
                  className="fa-solid fa-map-pin"
                  style={{ color: "rgb(255, 2, 2)" }}
                ></i>
                {booking.property_address}
              </p>
            </div>

            {/* STATUS */}
            <span className="booking-status">{booking.status}</span>
          </div>

          {/* Divider */}
          <div className="booking-divider"></div>

          {/* Tenant Details */}
          <section className="booking-section">
            <div className="booking-section-heading">
              <div className="booking-section-icon">
                <i
                  className="fa-solid fa-user"
                  style={{ color: "rgb(255, 2, 2)" }}
                ></i>
              </div>

              <div>
                <h3>Tenant Details</h3>

                <p>Information about the tenant</p>
              </div>
            </div>

            <div className="booking-info-grid">
              <div className="booking-info-item">
                <span>Name</span>

                <strong>{booking.tenant_name}</strong>
              </div>

              <div className="booking-info-item">
                <span>Email</span>

                <strong>{booking.tenant_email}</strong>
              </div>
            </div>
          </section>

          {/* Visit Details */}
          <section className="booking-section">
            <div className="booking-section-heading">
              <div className="booking-section-icon">
                <i
                  className="fa-solid fa-calendar-days"
                  style={{ color: "rgb(255, 2, 2)" }}
                ></i>
              </div>

              <div>
                <h3>Visit Details</h3>

                <p>Requested property visit</p>
              </div>
            </div>

            <div className="booking-info-grid">
              <div className="booking-info-item">
                <span>Visit Date</span>

                <strong>{booking.visit_date}</strong>
              </div>

              <div className="booking-info-item">
                <span>Visit Time</span>

                <strong>{booking.visit_time}</strong>
              </div>
            </div>
          </section>

          {/* Tenant Message */}
          <section className="booking-section">
            <div className="booking-section-heading">
              <div className="booking-section-icon">
                <i
                  className="fa-solid fa-comments"
                  style={{ color: "rgb(255, 2, 2)" }}
                ></i>
              </div>

              <div>
                <h3>Tenant Message</h3>

                <p>Message provided with the request</p>
              </div>
            </div>

            <div className="booking-message">
              {booking.message || "No message provided."}
            </div>
          </section>

          {/* Actions */}
          <div className="booking-actions">
            {/* Pending */}
            {booking.status === "pending" && (
              <div className="booking-pending-actions">
                <button
                  type="button"
                  onClick={() => handleStatusUpdate("accepted")}
                  className="booking-accept-button"
                >
                  {" "}
                  Accept Booking
                </button>

                <button
                  type="button"
                  onClick={() => handleStatusUpdate("rejected")}
                  className="booking-reject-button"
                >
                  Reject Booking
                </button>
              </div>
            )}

            {/* Accepted */}
            {booking.status === "accepted" && (
              <button
                type="button"
                onClick={() => handleStatusUpdate("completed")}
                className="booking-complete-button"
              >
                <i
                  className="fa-solid fa-check"
                  style={{ color: "rgb(255, 255, 255)" }}
                ></i>{" "}
                Mark Visit as Completed
              </button>
            )}

            {/* Rejected */}
            {booking.status === "rejected" && (
              <div className="booking-final-message booking-rejected-message">
                <span>
                  <i
                    className="fa-solid fa-x"
                    style={{ color: "rgb(255, 0, 0)" }}
                  ></i>
                </span>

                <p>This booking request has been rejected.</p>
              </div>
            )}

            {/* Completed */}
            {booking.status === "completed" && (
              <div className="booking-final-message booking-completed-message">
                <span>
                  <i
                    className="fa-solid fa-check"
                    style={{ color: "rgb(0, 24, 255)" }}
                  ></i>
                </span>

                <p>This property visit has been completed.</p>
              </div>
            )}

            {/* Cancelled */}
            {booking.status === "cancelled" && (
              <div className="booking-final-message booking-cancelled-message">
                <span>
                  <i
                    className="fa-solid fa-triangle-exclamation"
                    style={{ color: "rgb(255, 2, 2)" }}
                  ></i>
                </span>

                <p>This booking has been cancelled.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordBookingDetails;
