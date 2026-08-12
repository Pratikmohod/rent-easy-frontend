import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearResponseCode } from "../../slice/BookingSlice";
import { addBooking } from "../../apiCalls/BookingAPI";
import "./BookProperty.css";

const BookProperty = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, responseCode, error } = useSelector(
    (state) => state.bookings
  );

  const [bookingData, setBookingData] = useState({
    property: id,
    visit_date: "",
    visit_time: "",
    message: "",
  });

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addBooking(bookingData));
  };

  useEffect(() => {
    if (responseCode === 201) {
      alert("Booking Request sent Successfully.");

      dispatch(clearResponseCode());
      navigate("/my-bookings");
    }
  }, [responseCode, dispatch, navigate]);

  return (
    <div className="book-property-page">

      {/* Header */}
      <header className="book-property-header">
        <div className="book-property-header-inner">
          <p className="book-property-breadcrumb">
            RentEasy / Property Booking
          </p>

          <h1>Book a Property Visit</h1>

          <p>
            Choose your preferred date and time to visit this property.
          </p>
        </div>
      </header>

      {/* Booking Container */}
      <main className="book-property-container">
        <div className="book-property-card">

          {/* Card Header */}
          <div className="book-property-card-header">
            <div className="book-property-icon">
              <i className="fa-solid fa-calendar-check"></i>
            </div>

            <div>
              <h2>Schedule Your Visit</h2>

              <p>
                Select a convenient date and time for your property visit.
              </p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="book-property-error">
              <span>
                <i className="fa-solid fa-circle-exclamation"></i>
              </span>

              <p>
                {typeof error === "string"
                  ? error
                  : "Something went wrong. Please try again."}
              </p>
            </div>
          )}

          {/* Booking Form */}
          <form
            onSubmit={handleSubmit}
            className="book-property-form"
          >

            {/* Visit Date */}
            <div className="book-property-field">
              <label htmlFor="visit_date">
                Visit Date <span>*</span>
              </label>

              <input
                type="date"
                id="visit_date"
                name="visit_date"
                value={bookingData.visit_date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Visit Time */}
            <div className="book-property-field">
              <label htmlFor="visit_time">
                Visit Time <span>*</span>
              </label>

              <input
                type="time"
                id="visit_time"
                name="visit_time"
                value={bookingData.visit_time}
                onChange={handleChange}
                required
              />
            </div>

            {/* Message */}
            <div className="book-property-field">
              <label htmlFor="message">
                Message <em>(Optional)</em>
              </label>

              <textarea
                id="message"
                name="message"
                value={bookingData.message}
                onChange={handleChange}
                placeholder="Add a message for the landlord..."
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="book-property-actions">

              {/* Cancel */}
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="book-property-cancel-button"
              >
                <i className="fa-solid fa-arrow-left"></i>
                Cancel
              </button>

              {/* Submit */}
              <button
                type="submit"
                className="book-property-submit-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="book-property-spinner"></span>
                    Sending Request...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-calendar-check"></i>
                    Request Property Visit
                  </>
                )}
              </button>

            </div>
          </form>

          {/* Information */}
          <div className="book-property-information">

            <div className="book-property-information-icon">
              <i className="fa-solid fa-circle-info"></i>
            </div>

            <div>
              <h3>Note</h3>

              <p>
                Your booking request will be sent to the landlord.
                The landlord will review your request and confirm or
                reject the visit.
              </p>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default BookProperty;