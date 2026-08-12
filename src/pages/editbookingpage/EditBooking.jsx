import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { fetchSingleBooking, updateBooking } from "../../apiCalls/BookingAPI";

import { clearResponseCode } from "../../slice/BookingSlice";

import "./EditBooking.css";

const EditBooking = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, singleBooking, responseCode } = useSelector(
    (state) => state.bookings,
  );

  const [bookingData, setBookingData] = useState({
    visit_date: "",
    visit_time: "",
    message: "",
  });

  const [formError, setFormError] = useState("");

  // Fetch booking
  useEffect(() => {
    dispatch(clearResponseCode());
    dispatch(fetchSingleBooking(id));
  }, [dispatch, id]);

  // Populate form
  useEffect(() => {
    if (singleBooking) {
      setBookingData({
        visit_date: singleBooking.visit_date || "",
        visit_time: singleBooking.visit_time || "",
        message: singleBooking.message || "",
      });
    }
  }, [singleBooking]);

  // Navigate after update
  useEffect(() => {
    if (responseCode === 200) {
      alert("Booking Updated Successfully");

      dispatch(clearResponseCode());

      navigate("/my-bookings");
    }
  }, [responseCode, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bookingData.visit_date) {
      setFormError("Please select a visit date.");
      return;
    }

    if (!bookingData.visit_time) {
      setFormError("Please select a visit time.");
      return;
    }

    setFormError("");

    dispatch(
      updateBooking({
        id,
        bookingData,
      }),
    );
  };

  if (loading && !singleBooking) {
    return (
      <div className="edit-booking-state">
        <div className="edit-booking-loader"></div>
        <p>Loading booking...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="edit-booking-state">
        <div className="edit-booking-error-icon">⚠️</div>

        <h2>Unable to Load Booking</h2>

        <p>
          {typeof error === "string"
            ? error
            : "Something went wrong while loading the booking."}
        </p>

        <button
          onClick={() => navigate("/my-bookings")}
          className="edit-booking-back-button"
        >
          Back to My Bookings
        </button>
      </div>
    );
  }

  if (!singleBooking) {
    return (
      <div className="edit-booking-state">
        <div className="edit-booking-not-found-icon">📅</div>

        <h2>Booking Not Found</h2>

        <p>The booking you're trying to edit could not be found.</p>

        <button
          onClick={() => navigate("/my-bookings")}
          className="edit-booking-back-button"
        >
          Back to My Bookings
        </button>
      </div>
    );
  }

  // Only pending bookings can be edited
  if (singleBooking.status !== "pending") {
    return (
      <div className="edit-booking-state">
        <div className="edit-booking-warning-icon">🔒</div>

        <h2>Booking Cannot Be Edited</h2>

        <p>Only pending bookings can be edited.</p>

        <div className="edit-booking-status">
          Current Status: <span>{singleBooking.status}</span>
        </div>

        <button
          onClick={() => navigate(`/my-bookings/${id}`)}
          className="edit-booking-back-button"
        >
          View Booking
        </button>
      </div>
    );
  }

  // Today's date
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="edit-booking-page">
      {/* Header */}
      <div className="edit-booking-header">
        <div className="edit-booking-header-inner">
          <p className="edit-booking-breadcrumb">RentEasy / My Bookings</p>

          <h1>Edit Booking</h1>

          <p>Update your preferred property visit date, time, or message.</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="edit-booking-container">
        {/* Booking Information */}
        <div className="edit-booking-property-card">
          <div className="edit-booking-property-icon">🏠</div>

          <div>
            <p className="edit-booking-property-label">Property</p>

            <h2>{singleBooking.property_title}</h2>

            <p>📍 {singleBooking.property_city}</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="edit-booking-card">
          <div className="edit-booking-card-header">
            <div className="edit-booking-calendar-icon">📅</div>

            <div>
              <h2>Update Visit Details</h2>

              <p>Change the date, time, or message for your request.</p>
            </div>
          </div>

          {/* Error */}
          {(formError || error) && (
            <div className="edit-booking-form-error">
              <span>⚠️</span>

              <p>
                {formError ||
                  (typeof error === "string"
                    ? error
                    : "Unable to update booking.")}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="edit-booking-form">
            {/* Visit Date */}
            <div className="edit-booking-field">
              <label htmlFor="visit_date">
                Visit Date
                <span>*</span>
              </label>

              <input
                id="visit_date"
                type="date"
                name="visit_date"
                value={bookingData.visit_date}
                min={today}
                onChange={handleChange}
                required
              />

              <small>Select your preferred date for the property visit.</small>
            </div>

            {/* Visit Time */}
            <div className="edit-booking-field">
              <label htmlFor="visit_time">
                Visit Time
                <span>*</span>
              </label>

              <input
                id="visit_time"
                type="time"
                name="visit_time"
                value={bookingData.visit_time}
                onChange={handleChange}
                required
              />

              <small>Choose the time you would like to visit.</small>
            </div>

            {/* Message */}
            <div className="edit-booking-field">
              <label htmlFor="message">
                Message
                <em>(Optional)</em>
              </label>

              <textarea
                id="message"
                name="message"
                rows="5"
                value={bookingData.message}
                onChange={handleChange}
                placeholder="Write a message to the landlord..."
                maxLength="500"
              />

              <small>You can update your questions or requirements.</small>
            </div>

            {/* Buttons */}
            <div className="edit-booking-actions">
              <button
                type="button"
                onClick={() => navigate(`/my-bookings/${id}`)}
                className="edit-booking-cancel-button"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="edit-booking-submit-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="edit-booking-spinner"></span>
                    Updating...
                  </>
                ) : (
                  "Update Booking"
                )}
              </button>
            </div>
          </form>

          {/* Information */}
          <div className="edit-booking-information">
            <span>ℹ️</span>

            <div>
              <h3>Important</h3>

              <p>
                Editing your booking will update the request sent to the
                landlord. The landlord may review your updated visit date and
                time again.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBooking;
