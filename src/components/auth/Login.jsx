import React, { useEffect, useState } from "react";
import Form from "./Form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../apiCalls/UserApi";
import { useNavigate, Link } from "react-router-dom";
import { fetchProfile } from "../../apiCalls/ProfileAPI";
import "./Login.css";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginDetails;

  const loginData = [
    {
      name: "username",
      label: "Username",
      type: "text",
      state: username,
      placeholder: "Enter your username",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      state: password,
      placeholder: "Enter your password",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accessToken, loading, error, singleUser } = useSelector(
    (state) => state.user
  );

  const handleChange = (e) => {
    const { value, name } = e.target;

    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser(loginDetails));

    if (loginUser.fulfilled.match(result)) {
      await dispatch(fetchProfile());
    }
  };

  useEffect(() => {
    if (accessToken && singleUser?.id) {
      navigate("/myProfile");
    }
  }, [accessToken, singleUser, navigate]);

  return (
    <div className="login-page">
      <div className="login-wrapper">

        {/* Login Card */}
        <div className="login-card">

          {/* Heading */}
          <div className="login-header">
            <h1>Welcome Back</h1>

            <p>
              Login to your RentEasy account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="login-error">
              {typeof error === "string"
                ? error
                : error.detail || "Something went wrong"}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Form
              data={loginData}
              handleChange={handleChange}
            />

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {loading ? (
                <span className="login-loading">
                  <span className="login-spinner"></span>
                  Logging In...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Signup */}
          <div className="signup-section">
            <span>Don't have an account?</span>

            <Link to="/">
              Sign Up
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;