import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "./Form";
import { addUser } from "../../apiCalls/UserApi";
import { useNavigate, Link } from "react-router-dom";
import { clearAddResponse } from "../../slice/UserSlice";
import "./Register.css";

const Register = () => {
  const { loading, validationError } = useSelector(
    (state) => state.user
  );

  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile_no: "",
    gender: "",
    role: "",
    permanent_address: "",
    city: "",
    state: "",
    country: "",
  });

  const {
    username,
    email,
    password,
    confirmPassword,
    mobile_no,
    gender,
    role,
    permanent_address,
    city,
    state,
    country,
  } = userDetails;

  const registerData = [
    {
      name: "username",
      label: "Username",
      type: "text",
      state: username,
      placeholder: "Enter username",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      state: email,
      placeholder: "Enter email address",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      state: password,
      placeholder: "Enter password",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      state: confirmPassword,
      placeholder: "Confirm password",
    },
    {
      name: "mobile_no",
      label: "Mobile Number",
      type: "tel",
      state: mobile_no,
      placeholder: "Enter mobile number",
    },
    {
      name: "permanent_address",
      label: "Permanent Address",
      type: "text",
      state: permanent_address,
      placeholder: "Enter permanent address",
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
      name: "country",
      label: "Country",
      type: "text",
      state: country,
      placeholder: "Enter country",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormError("");

    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      mobile_no === "" ||
      gender === "" ||
      role === "" ||
      permanent_address === "" ||
      city === "" ||
      state === "" ||
      country === ""
    ) {
      setFormError("Please fill all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    setFormError("");

    const formData = new FormData();

    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("mobile_no", mobile_no);
    formData.append("gender", gender);
    formData.append("role", role);
    formData.append("permanent_address", permanent_address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("country", country);

    dispatch(addUser(formData));
  };

  const response = useSelector((state) => state.user.addResponse);

  useEffect(() => {
    if (response?.status === 201) {
      setSuccessMessage("Registration successful!");

      dispatch(clearAddResponse());

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  }, [response, dispatch, navigate]);

  return (
    <div className="register-page">
      <div className="register-card">

        {/* ================= HEADER ================= */}

        <div className="register-header">
          <div className="register-logo">
            REGISTER
          </div>

          <h1>Create Your Account</h1>

          <p>
            Join RentEasy and find your perfect property
          </p>
        </div>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="register-form"
        >

          {/* ================= ACCOUNT INFORMATION ================= */}

          <div className="form-section">

            <div className="section-title">
              <h2>Account Information</h2>
              <span>01</span>
            </div>

            <Form
              data={registerData.slice(0, 5)}
              handleChange={handleChange}
            />

          </div>

          {/* ================= PERSONAL INFORMATION ================= */}

          <div className="form-section">

            <div className="section-title">
              <h2>Personal Information</h2>
              <span>02</span>
            </div>

            <Form
              data={registerData.slice(5)}
              handleChange={handleChange}
            />

          </div>

          {/* ================= GENDER ================= */}

          <div className="form-section">

            <div className="section-title">
              <h2>Gender</h2>
              <span>03</span>
            </div>

            <div className="radio-group">

              {["male", "female", "other"].map((item) => (
                <label
                  key={item}
                  className={`radio-card ${
                    gender === item
                      ? "radio-card-active"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="gender"
                    value={item}
                    checked={gender === item}
                    onChange={handleChange}
                  />

                  <span className="radio-custom"></span>

                  <span className="radio-label">
                    {item.charAt(0).toUpperCase() +
                      item.slice(1)}
                  </span>

                </label>
              ))}

            </div>

          </div>

          {/* ================= ROLE ================= */}

          <div className="form-section">

            <div className="section-title">
              <h2>I want to register as</h2>
              <span>04</span>
            </div>

            <div className="role-grid">

              {/* LANDLORD */}

              <label
                className={`role-card ${
                  role === "landlord"
                    ? "role-card-active"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="role"
                  value="landlord"
                  checked={role === "landlord"}
                  onChange={handleChange}
                />

                <div className="role-icon">
                  <i className="fa-solid fa-house" style={{color: "rgb(116, 0, 186)"}}></i>
                </div>

                <div className="role-content">
                  <h3>Landlord</h3>

                  <p>
                    List and manage properties
                  </p>
                </div>

                <span className="role-radio"></span>

              </label>

              {/* TENANT */}

              <label
                className={`role-card ${
                  role === "tenant"
                    ? "role-card-active"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="role"
                  value="tenant"
                  checked={role === "tenant"}
                  onChange={handleChange}
                />

                <div className="role-icon">
                  <i className="fa-solid fa-key" style={{color: "rgb(116, 0, 186)"}}></i>
                </div>

                <div className="role-content">

                  <h3>Tenant</h3>

                  <p>
                    Find and rent properties
                  </p>

                </div>

                <span className="role-radio"></span>

              </label>

            </div>

          </div>

          {/* ================= FORM ERROR ================= */}

          {formError && (
            <div className="form-error">

              <span>⚠</span>

              <p>
                {formError}
              </p>

            </div>
          )}

          {/* ================= BACKEND VALIDATION ERROR ================= */}

          {validationError && (
            <div className="form-error backend-error">

              <span>⚠</span>

              <div>

                {typeof validationError === "string"
                  ? validationError
                  : Object.entries(validationError).map(
                      ([field, messages]) => (
                        <div
                          key={field}
                          className="validation-item"
                        >

                          <strong>
                            {field.replace("_", " ")}:
                          </strong>{" "}

                          {Array.isArray(messages)
                            ? messages.join(", ")
                            : messages}

                        </div>
                      )
                    )}

              </div>

            </div>
          )}

          {/* ================= SUCCESS ================= */}

          {successMessage && (
            <div className="success-message">

              <span>✓</span>

              {successMessage}

            </div>
          )}

          {/* ================= REGISTER BUTTON ================= */}

          <button
            type="submit"
            disabled={loading}
            className="register-button"
          >

            {loading ? (
              <span className="button-loading">

                <span className="loading-spinner"></span>

                Registering...

              </span>
            ) : (
              "Create Account"
            )}

          </button>

          {/* ================= LOGIN ================= */}

          <p className="login-text">

            Already have an account?

            <Link to="/login">
              Login
            </Link>

          </p>

        </form>

      </div>
    </div>
  );
};

export default Register;