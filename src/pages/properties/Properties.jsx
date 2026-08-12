import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../../apiCalls/PropertiesAPI";
import PropertyList from "../../components/propertylist/PropertyList";
import "./Properties.css";

const Properties = () => {
  const dispatch = useDispatch();

  const {
    properties = [],
    loading,
    error,
    count = 0,
    next,
    previous,
  } = useSelector((state) => state?.properties);

  // FILTER STATES

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [bhk, setBhk] = useState("");
  const [ordering, setOrdering] = useState("");

  // FETCH PROPERTIES

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        fetchProperties({
          page,
          search,
          city,
          bhk,
          ordering,
        }),
      );
    }, 600);

    return () => clearTimeout(timer);
  }, [dispatch, page, search, city, bhk, ordering]);

  // SEARCH

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // CITY FILTER

  const handleCity = (e) => {
    setCity(e.target.value);
    setPage(1);
  };

  // BHK FILTER

  const handleBhk = (e) => {
    setBhk(e.target.value);
    setPage(1);
  };

  // ORDERING

  const handleOrdering = (e) => {
    setOrdering(e.target.value);
    setPage(1);
  };

  // CLEAR FILTERS

  const clearFilters = () => {
    setSearch("");
    setCity("");
    setBhk("");
    setOrdering("");
    setPage(1);
  };

  // RETRY

  const handleRetry = () => {
    dispatch(
      fetchProperties({
        page,
        search,
        city,
        bhk,
        ordering,
      }),
    );
  };

  // LOADING

  if (loading) {
    return (
      <main className="properties-page">
        <div className="properties-status">
          <div className="properties-spinner"></div>

          <h2>Loading properties...</h2>
        </div>
      </main>
    );
  }

  // ERROR

  if (error) {
    return (
      <main className="properties-page">
        <div className="properties-status properties-error">
          <h2>
            {typeof error === "string" ? error : "Unable to load properties."}
          </h2>

          <button
            type="button"
            onClick={handleRetry}
            className="properties-retry"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // MAIN UI

  return (
    <main className="properties-page">
      {/* PAGE HEADER */}

      <section className="properties-page-header">
        <div className="properties-header-content">
          <p className="properties-eyebrow">RentEasy</p>

          <h1>All Properties For Rent / PG</h1>

          <p className="properties-subtitle">
            Find your dream property or PG for rent
          </p>
        </div>
      </section>

      {/*SEARCH & FILTER */}

      <section className="properties-filter-section">
        <div className="properties-filters">
          {/* Search */}

          <div className="property-filter">
            <label htmlFor="property-search">Search</label>

            <input
              id="property-search"
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={handleSearch}
            />
          </div>

          {/* City */}

          <div className="property-filter">
            <label htmlFor="property-city">City</label>

            <select id="property-city" value={city} onChange={handleCity}>
              <option value="">All Cities</option>

              <option value="Nagpur">Nagpur</option>

              <option value="Pune">Pune</option>

              <option value="Mumbai">Mumbai</option>
            </select>
          </div>

          {/* BHK */}

          <div className="property-filter">
            <label htmlFor="property-bhk">BHK</label>

            <select id="property-bhk" value={bhk} onChange={handleBhk}>
              <option value="">Any BHK</option>

              <option value="1">1 BHK</option>

              <option value="2">2 BHK</option>

              <option value="3">3 BHK</option>

              <option value="4">4 BHK</option>
            </select>
          </div>

          {/* Ordering */}

          <div className="property-filter">
            <label htmlFor="property-ordering">Sort By</label>

            <select
              id="property-ordering"
              value={ordering}
              onChange={handleOrdering}
            >
              <option value="">Default</option>

              <option value="rent">Rent: Low to High</option>

              <option value="-rent">Rent: High to Low</option>

              <option value="area_sqft">Area: Small to Large</option>

              <option value="-area_sqft">Area: Large to Small</option>

              <option value="-created_at">Newest</option>
            </select>
          </div>

          {/* Clear Filters */}

          <button
            type="button"
            onClick={clearFilters}
            className="properties-clear-btn"
          >
            Clear Filters
          </button>
        </div>
      </section>

      {/* PROPERTIES LIST */}

      <section className="properties-list-section">
        {/* List Header */}

        <div className="properties-list-header">
          <div>
            <h2>Available Properties</h2>

            <p>Browse properties available for rent.</p>
          </div>

          <span className="properties-count">{count} Properties</span>
        </div>

        {/* PROPERTY LIST*/}

        {properties.length > 0 ? (
          <>
            <PropertyList properties={properties} />

            {/* PAGINATION*/}

            <div className="properties-pagination">
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
          /* EMPTY STATE */

          <div className="properties-empty">
            <div className="properties-empty-icon">
              <i
                className="fa-solid fa-house"
                style={{ color: "rgb(116, 0, 186)" }}
              ></i>
            </div>

            <h3>No Properties Found</h3>

            <p>No properties match your current search or filters.</p>

            <button
              type="button"
              onClick={clearFilters}
              className="properties-clear-btn"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Properties;
