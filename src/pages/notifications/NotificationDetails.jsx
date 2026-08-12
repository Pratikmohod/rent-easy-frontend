import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  deleteNotification,
  fetchSingleNotification,
  updateNotification,
} from "../../apiCalls/NotificationAPI";

import "./NotificationDetails.css";

const NotificationDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, singleNotification } = useSelector(
    (state) => state.notifications,
  );

  // Fetch notification
  useEffect(() => {
    dispatch(fetchSingleNotification(id));
  }, [dispatch, id]);

  // Mark notification as read when opened
  useEffect(() => {
    if (singleNotification && !singleNotification.is_read) {
      dispatch(
        updateNotification({
          id: singleNotification.id,
          notificationData: {
            is_read: true,
          },
        }),
      );
    }
  }, [dispatch, singleNotification]);

  // Delete notification
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notification?",
    );

    if (confirmDelete) {
      dispatch(deleteNotification(singleNotification.id));

      navigate("/notifications");
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="notification-details-status">
        <div className="details-spinner"></div>

        <p>Loading notification...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="notification-details-status">
        <div className="notification-details-error">
          <div className="details-error-icon">
            <i
              className="fa-solid fa-triangle-exclamation"
              style={{ color: "rgb(255, 0, 0)" }}
            ></i>
          </div>

          <h2>Something went wrong</h2>

          <p>
            {typeof error === "string"
              ? error
              : "Unable to load notification details."}
          </p>

          <button
            onClick={() => dispatch(fetchSingleNotification(id))}
            className="details-retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Notification not found
  if (!singleNotification) {
    return (
      <div className="notification-details-status">
        <div className="notification-details-error">
          <div className="details-error-icon">
            <i
              className="fa-solid fa-bell"
              style={{ color: "rgb(255, 206, 0)" }}
            ></i>
          </div>

          <h2>Notification Not Found</h2>

          <p>The notification you're looking for does not exist.</p>

          <button
            onClick={() => navigate("/notifications")}
            className="details-back-button"
          >
            Back to Notifications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="notification-details-page">
      {/* Header */}
      <div className="notification-details-header">
        <div className="notification-details-header-inner">
          <p className="details-breadcrumb">RentEasy / Notifications</p>

          <h1>Notification Details</h1>

          <p>View the details of your notification.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="notification-details-container">
        <div className="notification-details-card">
          {/* Card Header */}
          <div className="details-card-header">
            <div className="details-notification-icon">
              <i
                className="fa-solid fa-bell"
                style={{ color: "rgb(255, 150, 0)" }}
              ></i>
            </div>

            <div className="details-title-section">
              <h2>{singleNotification.title}</h2>

              <span
                className={`details-status-badge ${
                  singleNotification.is_read ? "details-read" : "details-unread"
                }`}
              >
                {singleNotification.is_read ? "Read" : "Unread"}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="details-divider"></div>

          {/* Notification Information */}
          <div className="notification-information">
            {/* Message */}
            <div className="details-information-item">
              <span className="details-label">Message</span>

              <p className="details-message">{singleNotification.message}</p>
            </div>

            {/* Type */}
            <div className="details-information-item">
              <span className="details-label">Notification Type</span>

              <p className="details-value">
                {singleNotification.type || "General"}
              </p>
            </div>

            {/* Status */}
            <div className="details-information-item">
              <span className="details-label">Status</span>

              <p className="details-value">
                {singleNotification.is_read ? "Read" : "Unread"}
              </p>
            </div>

            {/* Date */}
            <div className="details-information-item">
              <span className="details-label">Date</span>

              <p className="details-value">{singleNotification.created_at}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="notification-details-actions">
            <button
              type="button"
              onClick={() => navigate("/notifications")}
              className="details-back-button"
            >
               Back to Notifications
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="details-delete-button"
            >
              Delete Notification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetails;
