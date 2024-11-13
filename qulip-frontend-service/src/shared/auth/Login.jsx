import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineLiveHelp } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthContext } from "../../context";

const Login = () => {
  const { loginHandler, token } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [error, setError] = useState("");  // State to hold error message

  useEffect(() => {
    if (token) {
      const redirectTo = location?.state?.from?.pathname ?? "/";
      const timerId = setTimeout(() => {
        navigate(redirectTo);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [token, navigate, location?.state?.from?.pathname]);

  const handlePasswordToggle = () => {
    setPasswordToggle((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if fields are empty and show an error message
    if (!loginCredentials.email || !loginCredentials.password) {
      setError("Both email and password are required!");

      // Clear the error after 3 seconds
      setTimeout(() => {
        setError("");
      }, 3000);

      return;  // Prevent form submission
    }

    // Clear any previous error message
    setError("");

    // Call login handler if fields are valid
    await loginHandler(loginCredentials);
  };

  return (
    <div className="container-fluid">
      <div className="row items-center">
        <div className="col-lg-7 h-[92vh] login-page">
          <h1>Welcome</h1>
        </div>
        <div className="col-lg-5">
          <div className="row justify-center items-center">
            <div className="col-lg-10">
              <div className="py-3">
                <h2 className="text-2xl text-success font-bold">
                  Welcome Back! <br />
                  Login to your account
                </h2>
                <p>
                  Not a user?{" "}
                  <Link to="/register" className="text-blue-600">
                    Create an account
                  </Link>
                </p>
              </div>
              {/* Display error message if there is an error */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control py-2"
                    name="email"
                    placeholder="Your username or email"
                    onChange={handleInputChange}
                    value={loginCredentials.email}
                  />
                </div>
                <div className="form-group relative mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type={passwordToggle ? "text" : "password"}
                    className="form-control py-2"
                    name="password"
                    placeholder="Your password"
                    onChange={handleInputChange}
                    value={loginCredentials.password}
                  />
                  <Link
                    type="button"
                    className="absolute right-5 bottom-2"
                    onClick={handlePasswordToggle}
                  >
                    {passwordToggle ? (
                      <span className="flex items-center gap-1">
                        <FaEyeSlash /> hide
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <FaEye /> show
                      </span>
                    )}
                  </Link>
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-success w-100 py-2 fw-bold"
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="foot-box py-3 flex flex-col gap-3">
                <Link to="/forgot-password" className="text-blue-600">
                  Forgot password?
                </Link>
                <Link
                  to="/help"
                  className="flex items-center gap-2 text-blue-600"
                >
                  Get help <MdOutlineLiveHelp />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
