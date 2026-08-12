import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchMyBookings } from "../../apiCalls/BookingAPI";

import "./MyBookings.css";

const MyBookings = () => {
  const dispatch = useDispatch();

  const {
    loading,
    error,
    bookings = [],
  } = useSelector((state) => state?.bookings);

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "my-bookings-status pending";

      case "accepted":
        return "my-bookings-status accepted";

      case "rejected":
        return "my-bookings-status rejected";

      case "completed":
        return "my-bookings-status completed";

      case "cancelled":
        return "my-bookings-status cancelled";

      default:
        return "my-bookings-status";
    }
  };

  if (loading) {
    return (
      <div className="my-bookings-state">
        <div className="my-bookings-loader"></div>
        <p>Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-bookings-state">
        <div className="my-bookings-error-icon">
          <i
            className="fa-solid fa-triangle-exclamation"
            style={{ color: "rgb(218, 0, 255)" }}
          ></i>
        </div>

        <h2>Unable to Load Bookings</h2>

        <p>
          {typeof error === "string" ? error : "Unable to load your bookings."}
        </p>
      </div>
    );
  }

  return (
    <div className="my-bookings-page">
      {/* Header */}
      <div className="my-bookings-header">
        <div className="my-bookings-header-inner">
          <p className="my-bookings-breadcrumb">RentEasy / Tenant</p>

          <h1>My Bookings</h1>

          <p>View and manage your property visit requests.</p>
        </div>
      </div>

      {/* Content */}
      <div className="my-bookings-container">
        {bookings.length === 0 ? (
          /* Empty State */
          <div className="my-bookings-empty">
            <div className="my-bookings-empty-icon">
              <i
                className="fa-solid fa-calendar-days"
                style={{ color: "rgb(218, 0, 255)" }}
              ></i>
            </div>

            <h2>No Bookings Found</h2>

            <p>You haven't requested any property visits yet.</p>

            <Link to="/properties" className="my-bookings-browse-button">
              Browse Properties
            </Link>
          </div>
        ) : (
          /* Booking List */
          <div className="my-bookings-list">
            {bookings.map((booking) => (
              <div key={booking.id} className="my-booking-card">
                {/* Card Header */}
                <div className="my-booking-card-header">
                  <div>
                    <h2>{booking.property_title}</h2>

                    <p>
                      <i
                        className="fa-solid fa-map-pin"
                        style={{ color: "rgb(255, 2, 2)" }}
                      ></i>
                      {booking.property_city}
                    </p>
                  </div>

                  <span className={getStatusClass(booking.status)}>
                    {booking.status}
                  </span>
                </div>

                {/* Booking Information */}
                <div className="my-booking-information">
                  {/* Address */}
                  <div className="my-booking-info-item">
                    <span className="my-booking-info-icon">
                      <i
                        className="fa-solid fa-map-pin"
                        style={{ color: "rgb(255, 2, 2)" }}
                      ></i>
                    </span>

                    <div>
                      <p className="my-booking-info-label">Address</p>

                      <p className="my-booking-info-value">
                        {booking.property_address}
                      </p>
                    </div>
                  </div>

                  {/* Rent */}
                  <div className="my-booking-info-item">
                    <span className="my-booking-info-icon">
                      <i
                        className="fa-solid fa-indian-rupee-sign"
                        style={{ color: "rgb(255, 2, 2)" }}
                      ></i>
                    </span>

                    <div>
                      <p className="my-booking-info-label">Monthly Rent</p>

                      <p className="my-booking-info-value rent">
                        ₹{booking.property_rent}
                      </p>
                    </div>
                  </div>

                  {/* Visit Date */}
                  <div className="my-booking-info-item">
                    <span className="my-booking-info-icon">
                      <i
                        className="fa-solid fa-calendar-days"
                        style={{ color: "rgb(255, 2, 2)" }}
                      ></i>
                    </span>

                    <div>
                      <p className="my-booking-info-label">Visit Date</p>

                      <p className="my-booking-info-value">
                        {booking.visit_date}
                      </p>
                    </div>
                  </div>

                  {/* Visit Time */}
                  <div className="my-booking-info-item">
                    <span className="my-booking-info-icon">
                      <i
                        className="fa-solid fa-clock"
                        style={{ color: "rgb(255, 2, 2)" }}
                      ></i>
                    </span>

                    <div>
                      <p className="my-booking-info-label">Visit Time</p>

                      <p className="my-booking-info-value">
                        {booking.visit_time}
                      </p>
                    </div>
                  </div>

                  {/* Landlord */}
                  <div className="my-booking-info-item">
                    <span className="my-booking-info-icon">
                      <i
                        className="fa-solid fa-user"
                        style={{ color: "rgb(255, 2, 2)" }}
                      ></i>
                    </span>

                    <div>
                      <p className="my-booking-info-label">Landlord</p>

                      <p className="my-booking-info-value">
                        {booking.landlord_name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Message */}
                {booking.message && (
                  <div className="my-booking-message">
                    <p className="my-booking-message-title">Your Message</p>

                    <p className="my-booking-message-text">{booking.message}</p>
                  </div>
                )}

                {/* Footer */}
                <div className="my-booking-footer">
                  <Link
                    to={`/my-bookings/${booking.id}`}
                    className="my-booking-details-button"
                  >
                    View Booking Details
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
