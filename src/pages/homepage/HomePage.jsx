import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../../apiCalls/PropertiesAPI";
import PropertyList from "../../components/propertylist/PropertyList";
import "./HomePage.css";

const HomePage = () => {
  const {
    properties,
    loading,
    error,
    count = 0,
    next,
    previous,
  } = useSelector((state) => state?.properties);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProperties({
      page,}));
  }, [dispatch, page]);
   
  const handleRetry = () => {
    dispatch(fetchProperties({page,}));
  };

  // Loading
  if (loading) {
    return (
      <div className="homepage-status">
        <div className="loading-spinner"></div>
        <h2>Loading properties...</h2>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="homepage-status error">
        <h2>
          {typeof error === "string" ? error : "Unable to load properties."}
        </h2>

        <button
          type="button"
          onClick={handleRetry}
          className="retry-button"
        >
          Try Again
        </button>
      </div>
    );
  }

 

  return (
    <main className="homepage">
      {/* Hero Section */}
      <section className="homepage-hero">
        <div className="hero-content">
          <p className="hero-subtitle">Welcome to RentEasy</p>

          <h1>
            Find Your
            <span> Perfect Home</span>
          </h1>

          <p className="hero-description">
            Discover comfortable and affordable properties that match your
            lifestyle and budget.
          </p>
        </div>
      </section>

      {/* Properties Section */}
      <section className="homepage-properties">
        <div className="properties-header">
          <div>
            <p className="section-subtitle">Explore Properties</p>

            <h2>Available Properties</h2>

            <p>Find a property that feels like home.</p>
          </div>

          <span className="property-count">
            {count || 0} Properties
          </span>
        </div>

        {/* Property List */}
        {properties?.length > 0 ? (
          <>
            <PropertyList properties={properties} />

            {/* PAGINATION */}

            <div className="homepage-pagination">
              <button
                type="button"
                disabled={!previous}
                onClick={() => setPage((currentPage) => currentPage - 1)}
              >
                Previous
              </button>

              <span>Page {page}</span>

              <button
                type="button"
                disabled={!next}
                onClick={() => setPage((currentPage) => currentPage + 1)}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="empty-properties">
            <div className="empty-icon">
              <i
                className="fa-solid fa-house"
                style={{ color: "rgb(116, 0, 186)" }}
              ></i>
            </div>

            <h3>No Properties Found</h3>

            <p>There are currently no properties available.</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default HomePage;
