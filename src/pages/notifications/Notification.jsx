import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  deleteNotification,
  fetchNotifications,
  markAllNotificationsRead,
} from "../../apiCalls/NotificationAPI";

import "./Notification.css";

const Notification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    error,
    notifications = [],
  } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());

    const interval = setInterval(() => {
      dispatch(fetchNotifications());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleDelete = (id) => {
    // const confirmDelete = window.confirm(
    //   "Are you sure you want to delete this notification?"
    // );
    dispatch(deleteNotification(id));

    // if (confirmDelete) {

    // }
  };

  const handleMarkAllRead = () => {
    dispatch(markAllNotificationsRead());
  };

  if (loading) {
    return (
      <div className="notification-status">
        <div className="notification-spinner"></div>
        <p>Loading notifications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notification-status">
        <div className="notification-error-card">
          <div className="error-icon">
            <i
              className="fa-solid fa-triangle-exclamation"
              style={{ color: "rgb(255, 0, 0)" }}
            ></i>
          </div>

          <h2>Something went wrong</h2>

          <p>
            {typeof error === "string"
              ? error
              : "Something went wrong while loading notifications."}
          </p>

          <button
            onClick={() => dispatch(fetchNotifications())}
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="notification-page">
      {/* Header */}
      <div className="notification-header">
        <div className="notification-header-inner">
          <p className="notification-breadcrumb">RentEasy</p>

          <div className="notification-title-row">
            <div>
              <h1>Notifications</h1>

              <p>Stay updated about your bookings and properties.</p>
            </div>

            {/* Mark All As Read */}
            {notifications.length > 0 && (
              <button onClick={handleMarkAllRead} className="mark-all-button">
                Mark All As Read
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="notification-container">
        {notifications.length === 0 ? (
          <div className="empty-notification-card">
            <div className="empty-notification-icon">
              <i
                className="fa-solid fa-bell"
                style={{ color: "rgb(255, 150, 0)" }}
              ></i>
            </div>

            <h2>No Notifications Found</h2>

            <p>You're all caught up!</p>

            <button
              onClick={() => navigate("/properties")}
              className="browse-property-button"
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="notification-list">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-card ${
                  notification.is_read
                    ? "notification-read"
                    : "notification-unread"
                }`}
              >
                {/* Unread Indicator */}
                {!notification.is_read && <span className="unread-dot"></span>}

                {/* Notification Icon */}
                <div className="notification-icon">
                  <i
                    className="fa-solid fa-bell"
                    style={{ color: "rgb(255, 150, 0)" }}
                  ></i>
                </div>

                {/* Notification Content */}
                <div className="notification-content">
                  <div className="notification-main">
                    {/* <h2>
                      {notification.title}
                    </h2> */}

                    <p>{notification.message}</p>
                  </div>

                  {/* Status */}
                  <span
                    className={`notification-status-badge ${
                      notification.is_read ? "read-badge" : "unread-badge"
                    }`}
                  >
                    {notification.is_read ? "Read" : "Unread"}
                  </span>
                </div>

                {/* Footer */}
                <div className="notification-footer">
                  <span className="notification-date">
                    {notification.created_at}
                  </span>

                  {/* Actions */}
                  <div className="notification-actions">
                    <Link
                      to={`/notifications/${notification.id}`}
                      className="notification-view-button"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="notification-delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
