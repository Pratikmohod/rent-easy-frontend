import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchSingleProperty,
  updateProperty,
} from "../../apiCalls/PropertiesAPI";

import Form from "../../components/auth/Form";
import { clearResponseCode } from "../../slice/PropertySlice";

import "./EditSingleProperty.css";

const EditSingleProperty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    singleProperty,
    loading,
    error,
    responseCode,
  } = useSelector((state) => state?.properties);

  const [formData, setFormData] = useState({
    title: "",
    property_type: "",
    description: "",
    rent: "",
    security_deposit: "",
    furnishing: "",
    available_from: "",
    tenant_preference: "",
    parking: false,
    lift: false,
    water_supply: "",
    is_available: true,
  });

  // Fetch property
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProperty(id));
    }
  }, [dispatch, id]);

  // Set existing property data
  useEffect(() => {
    if (singleProperty) {
      setFormData({
        title: singleProperty.title || "",
        property_type: singleProperty.property_type || "",
        description: singleProperty.description || "",
        rent: singleProperty.rent || "",
        security_deposit:
          singleProperty.security_deposit || "",
        furnishing:
          singleProperty.furnishing || "",
        available_from:
          singleProperty.available_from || "",
        tenant_preference:
          singleProperty.tenant_preference || "",
        parking:
          singleProperty.parking ?? false,
        lift:
          singleProperty.lift ?? false,
        water_supply:
          singleProperty.water_supply || "",
        is_available:
          singleProperty.is_available ?? true,
      });
    }
  }, [singleProperty]);

  // Navigate after successful update
  useEffect(() => {
    if (responseCode === 200) {
      dispatch(clearResponseCode());

      // Fetch the updated property when the detail page loads
      navigate(`/properties/${id}`);
    }
  }, [
    responseCode,
    dispatch,
    navigate,
    id,
  ]);

  const propertyData = [
    {
      name: "title",
      label: "Property Title",
      type: "text",
      state: formData.title,
      placeholder: "Enter property title",
    },

    {
      name: "property_type",
      label: "Property Type",
      type: "select",
      state: formData.property_type,
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
      state: formData.description,
      placeholder: "Enter property description",
    },

    {
      name: "rent",
      label: "Monthly Rent",
      type: "number",
      state: formData.rent,
      placeholder: "Enter monthly rent",
    },

    {
      name: "security_deposit",
      label: "Security Deposit",
      type: "number",
      state: formData.security_deposit,
      placeholder: "Enter security deposit",
    },

    {
      name: "furnishing",
      label: "Furnishing",
      type: "select",
      state: formData.furnishing,
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
      state: formData.available_from,
    },

    {
      name: "tenant_preference",
      label: "Tenant Preference",
      type: "select",
      state: formData.tenant_preference,
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
      state: formData.parking,
    },

    {
      name: "lift",
      label: "Lift Available",
      type: "checkbox",
      state: formData.lift,
    },

    {
      name: "water_supply",
      label: "Water Supply",
      type: "select",
      state: formData.water_supply,
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
      name: "is_available",
      label: "Property Available",
      type: "checkbox",
      state: formData.is_available,
    },
  ];

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateProperty({
        id,
        data: formData,
      })
    );
  };

  // Loading while fetching property
  if (loading && !singleProperty) {
    return (
      <div className="edit-property-loading">
        Loading property...
      </div>
    );
  }

  // Error
  if (error && !singleProperty) {
    return (
      <div className="edit-property-error">
        <h2>Unable to Update Property</h2>

        <p>
          {typeof error === "string"
            ? error
            : "Something went wrong while loading the property."}
        </p>

        <button
          onClick={() =>
            navigate(`/properties/${id}`)
          }
          className="back-property-button"
        >
          Back to Property
        </button>
      </div>
    );
  }

  return (
    <div className="edit-property-page">

      {/* Header */}
      <div className="edit-property-header">
        <div className="edit-property-header-inner">

          <p className="edit-property-breadcrumb">
            RentEasy / Property
          </p>

          <h1>Update Property</h1>

          <p className="edit-property-subtitle">
            Update your property details and keep your
            listing information up to date.
          </p>

        </div>
      </div>

      {/* Form Card */}
      <div className="edit-property-container">

        <div className="edit-property-card">

          <form onSubmit={handleSubmit}>

            {/* Property Form */}
            <div className="property-form-wrapper">
              <Form
                data={propertyData}
                handleChange={handleChange}
              />
            </div>

            {/* Buttons */}
            <div className="edit-property-actions">

              {/* Cancel */}
              <button
                type="button"
                onClick={() =>
                  navigate(`/properties/${id}`)
                }
                className="cancel-property-button"
              >
                Cancel
              </button>

              {/* Update */}
              <button
                type="submit"
                disabled={loading}
                className="update-property-button"
              >
                {loading ? (
                  <span className="update-loading">
                    <span className="button-spinner"></span>
                    <span>Updating...</span>
                  </span>
                ) : (
                  "Update Property"
                )}
              </button>

            </div>

          </form>

        </div>
      </div>

    </div>
  );
};

export default EditSingleProperty;