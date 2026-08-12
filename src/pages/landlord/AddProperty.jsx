import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Form from "../../components/auth/Form";

import { addProperty, addPropertyImages } from "../../apiCalls/PropertiesAPI";

import {
  clearResponseCode,
  clearSingleProperty,
} from "../../slice/PropertySlice";

import "./AddProperty.css";

const AddProperty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imageUploadStarted = useRef(false);

  const singleUser = useSelector((state) => state?.user?.singleUser);

  const {
    responseCode,
    singleProperty: createdProperty,
    loading,
    error,
  } = useSelector((state) => state.properties);

  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    property_type: "",
    description: "",
    rent: "",
    security_deposit: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    bhk: "",
    bathrooms: "",
    area_sqft: "",
    furnishing: "",
    available_from: "",
    tenant_preference: "",
    parking: false,
    lift: false,
    water_supply: "",
    balcony: false,
    is_available: true,
  });

  const [images, setImages] = useState([]);

  

  // it clear old property data whenever add property opens

  useEffect(() => {
    imageUploadStarted.current = false;
    dispatch(clearSingleProperty());
    dispatch(clearResponseCode());
  }, [dispatch]);

  // Property created successfully

  useEffect(() => {
    if (!createdProperty?.id) {
      return;
    }

    // it will prevent duplicate upload
    if (imageUploadStarted.current) {
      return;
    }
    imageUploadStarted.current=true

    // No images selected

    if (images.length === 0) {
      dispatch(clearResponseCode());
      navigate("/myProfile");
      return;
    }

    // Upload property images

    const formData = new FormData();

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(
      addPropertyImages({
        propertyId: createdProperty.id,
        formData,
      }),
    );
  }, [createdProperty, dispatch, navigate, images]);

  // Image upload completed

  useEffect(() => {
    if (responseCode === 201) {
      dispatch(clearResponseCode());
      navigate("/myProfile");
    }
  }, [responseCode, dispatch, navigate]);

  const {
    title,
    property_type,
    description,
    rent,
    security_deposit,
    address,
    city,
    state,
    pincode,
    bhk,
    bathrooms,
    area_sqft,
    furnishing,
    available_from,
    tenant_preference,
    parking,
    lift,
    water_supply,
    balcony,
    is_available,
  } = propertyDetails;

  /*
   * Form configuration
   */
  const propertyData = [
    {
      name: "title",
      label: "Property Title",
      type: "text",
      state: title,
      placeholder: "Enter property title",
    },
    {
      name: "property_type",
      label: "Property Type",
      type: "select",
      state: property_type,
      options: [
        {
          value: "apartment",
          label: "Apartment/Flat",
        },
        {
          value: "house",
          label: "House",
        },
        {
          value: "shop",
          label: "Shop",
        },
        {
          value: "office",
          label: "Office",
        },
      ],
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      state: description,
      placeholder: "Enter property description",
    },
    {
      name: "rent",
      label: "Monthly Rent",
      type: "number",
      state: rent,
      placeholder: "Enter monthly rent",
    },
    {
      name: "security_deposit",
      label: "Security Deposit",
      type: "number",
      state: security_deposit,
      placeholder: "Enter security deposit",
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      state: address,
      placeholder: "Enter property address",
    },
    {
      name: "city",
      label: "City",
      type: "text",
      state: city,
      placeholder: "Enter city",
    },
    {
      name: "state",
      label: "State",
      type: "text",
      state: state,
      placeholder: "Enter state",
    },
    {
      name: "pincode",
      label: "Pincode",
      type: "text",
      state: pincode,
      placeholder: "Enter pincode",
    },
    {
      name: "bhk",
      label: "BHK",
      type: "number",
      state: bhk,
      placeholder: "Enter BHK",
    },
    {
      name: "bathrooms",
      label: "Bathrooms",
      type: "number",
      state: bathrooms,
      placeholder: "Enter number of bathrooms",
    },
    {
      name: "area_sqft",
      label: "Area (sqft)",
      type: "number",
      state: area_sqft,
      placeholder: "Enter area in sqft",
    },
    {
      name: "furnishing",
      label: "Furnishing",
      type: "select",
      state: furnishing,
      options: [
        {
          value: "fully_furnished",
          label: "Fully Furnished",
        },
        {
          value: "semi_furnished",
          label: "Semi Furnished",
        },
        {
          value: "unfurnished",
          label: "Unfurnished",
        },
      ],
    },
    {
      name: "available_from",
      label: "Available From",
      type: "date",
      state: available_from,
    },
    {
      name: "tenant_preference",
      label: "Tenant Preference",
      type: "select",
      state: tenant_preference,
      options: [
        {
          value: "family",
          label: "Family",
        },
        {
          value: "bachelor",
          label: "Bachelor",
        },
        {
          value: "student",
          label: "Student",
        },
        {
          value: "anyone",
          label: "Anyone",
        },
      ],
    },
    {
      name: "parking",
      label: "Parking Available",
      type: "checkbox",
      state: parking,
    },
    {
      name: "lift",
      label: "Lift Available",
      type: "checkbox",
      state: lift,
    },
    {
      name: "water_supply",
      label: "Water Supply",
      type: "select",
      state: water_supply,
      options: [
        {
          value: "municipal",
          label: "Municipal",
        },
        {
          value: "borewell",
          label: "Borewell",
        },
        {
          value: "both",
          label: "Municipal + Borewell",
        },
      ],
    },
    {
      name: "balcony",
      label: "Balcony Available",
      type: "checkbox",
      state: balcony,
    },
    {
      name: "is_available",
      label: "Property Available",
      type: "checkbox",
      state: is_available,
    },
  ];

  /*
   * Handle form input
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setPropertyDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /*
   * Handle image selection
   */
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files || []);

    setImages(selectedImages);
  };

  /*
   * Submit property
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      title,
      property_type,
      description,
      rent,
      security_deposit,
      address,
      city,
      state,
      pincode,
      bhk,
      bathrooms,
      area_sqft,
      furnishing,
      available_from,
      tenant_preference,
      water_supply,
    ];

    const hasEmptyField = requiredFields.some((field) => field === "");

    if (hasEmptyField) {
      alert("Fill all the Fields.");
      return;
    }

    if (!singleUser) {
      alert("Please login first.");
      return;
    }

    dispatch(addProperty(propertyDetails));
  };

  /*
   * Loading
   */
  if (loading) {
    return (
      <div className="add-property-status">
        <div className="add-property-spinner"></div>

        <p>
          {createdProperty
            ? "Uploading property images..."
            : "Submitting property..."}
        </p>
      </div>
    );
  }

  return (
    <div className="add-property-page">
      {/* Header */}
      <div className="add-property-header">
        <div className="add-property-header-inner">
          <p className="add-property-breadcrumb">RentEasy / Landlord</p>

          <h1>Add Property</h1>

          <p>Add your property details and images.</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="add-property-container">
        <form onSubmit={handleSubmit} className="add-property-card">
          {/* Property Details */}
          <div className="add-property-section">
            <div className="add-property-section-header">
              <div className="section-icon">
                <i
                  className="fa-solid fa-house"
                  style={{ color: "rgb(255, 2, 2)" }}
                ></i>
              </div>

              <div>
                <h2>Property Details</h2>

                <p>Enter the basic information about your property.</p>
              </div>
            </div>

            <div className="property-form-wrapper">
              <Form data={propertyData} handleChange={handleChange} />
            </div>
          </div>

          {/* Property Images */}
          <div className="add-property-section">
            <div className="add-property-section-header">
              <div className="section-icon">
                <i
                  className="fa-solid fa-camera"
                  style={{ color: "rgb(255, 2, 2)" }}
                ></i>
              </div>

              <div>
                <h2>Property Images</h2>

                <p>Upload images to make your property more attractive.</p>
              </div>
            </div>

            {/* Upload Area */}
            <label htmlFor="images" className="property-upload-area">
              <div className="upload-icon">
                <i
                  className="fa-solid fa-camera"
                  style={{ color: "rgb(255, 2, 2)" }}
                ></i>
              </div>

              <h3>Click to upload property images</h3>

              <p>PNG, JPG or JPEG</p>

              <input
                type="file"
                id="images"
                name="images"
                multiple
                accept="image/*"
                className="property-image-input"
                onChange={handleImageChange}
              />
            </label>

            {/* Selected Images */}
            {images.length > 0 && (
              <div className="selected-images-section">
                <div className="selected-images-header">
                  <h3>Selected Images</h3>

                  <span>{images.length}</span>
                </div>

                <div className="selected-images-list">
                  {images.map((image, index) => (
                    <div
                      key={`${image.name}-${index}`}
                      className="selected-image-item"
                    >
                      <div className="selected-image-info">
                        <div className="selected-image-icon">
                          <i
                            className="fa-solid fa-image"
                            style={{ color: "rgb(255, 2, 2)" }}
                          ></i>
                        </div>

                        <div>
                          <p className="selected-image-name">{image.name}</p>

                          <span className="selected-image-size">
                            {(image.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="add-property-error">
              <span>
                <i
                  className="fa-solid fa-triangle-exclamation"
                  style={{ color: "rgb(255, 2, 2)" }}
                ></i>
              </span>

              <p>
                {typeof error === "string"
                  ? error
                  : error.detail || "Something went wrong."}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="add-property-actions">
            <button
              type="button"
              onClick={() => navigate("/myProfile")}
              className="add-property-cancel"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="add-property-submit"
            >
              {loading ? "Submitting..." : "Submit Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
