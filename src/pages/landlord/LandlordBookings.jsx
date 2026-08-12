import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchLandlordBookings } from "../../apiCalls/BookingAPI";

import "./LandlordBookings.css";

const LandlordBookings = () => {
  const dispatch = useDispatch();

  const {
    loading,
    error,
    landlordBookings = [],
  } = useSelector((state) => state?.bookings);

  useEffect(() => {
    dispatch(fetchLandlordBookings());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="landlord-bookings-page">
        <div className="landlord-bookings-status">
          <div className="landlord-bookings-spinner"></div>
          <p>Loading booking requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="landlord-bookings-page">
        <div className="landlord-bookings-error">
          <div className="landlord-error-icon">⚠️</div>

          <h2>Something went wrong</h2>

          <p>
            {typeof error === "string"
              ? error
              : "Unable to load booking requests."}
          </p>

          <button
            onClick={() => dispatch(fetchLandlordBookings())}
            className="landlord-retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="landlord-bookings-page">

      {/* Header */}
      <header className="landlord-bookings-header">
        <div className="landlord-bookings-header-inner">
          <p className="landlord-bookings-breadcrumb">
            RentEasy / Landlord
          </p>

          <h1>Booking Requests</h1>

          <p>
            Manage tenant requests for your properties.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="landlord-bookings-container">
        {landlordBookings.length === 0 ? (
          /* Empty State */
          <div className="landlord-empty-state">
            <div className="landlord-empty-icon">
              <i
                className="fa-solid fa-calendar-days"
                style={{ color: "rgb(255, 2, 2)" }}
              ></i>
            </div>

            <h2>No Booking Requests</h2>

            <p>
              You don't have any booking requests yet.
            </p>
          </div>
        ) : (
          <div className="landlord-bookings-list">
            {landlordBookings.map((booking) => (
              <div
                key={booking.id}
                className="landlord-booking-card"
              >

                {/* Card Header */}
                <div className="landlord-booking-card-header">
                  <div>
                    <span className="landlord-property-label">
                      Property
                    </span>

                    <h2>
                      {booking.property_title}
                    </h2>
                  </div>

                  {/* Status */}
                  <span className="landlord-booking-status">
                    {booking.status}
                  </span>
                </div>

                {/* Booking Information */}
                <div className="landlord-booking-info">

                  {/* Tenant */}
                  <div className="landlord-info-item">
                    <span className="landlord-info-label">
                      Tenant
                    </span>

                    <strong>
                      {booking.tenant_name}
                    </strong>
                  </div>

                  {/* Email */}
                  <div className="landlord-info-item">
                    <span className="landlord-info-label">
                      Email
                    </span>

                    <strong>
                      {booking.tenant_email}
                    </strong>
                  </div>

                  {/* Visit Date */}
                  <div className="landlord-info-item">
                    <span className="landlord-info-label">
                      Visit Date
                    </span>

                    <strong>
                      {booking.visit_date}
                    </strong>
                  </div>

                  {/* Visit Time */}
                  <div className="landlord-info-item">
                    <span className="landlord-info-label">
                      Visit Time
                    </span>

                    <strong>
                      {booking.visit_time}
                    </strong>
                  </div>

                </div>

                {/* Message */}
                <div className="landlord-message">
                  <span>Message</span>

                  <p>
                    {booking.message ||
                      "No message provided."}
                  </p>
                </div>

                {/* Footer */}
                <div className="landlord-booking-footer">
                  <Link
                    to={`/landlord/bookings/${booking.id}`}
                    className="landlord-view-button"
                  >
                    View Booking Details

                    <span>→</span>
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default LandlordBookings;