import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineLiveHelp } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context";

const Register = () => {
  const { signupHandler } = useAuthContext();
  const [registerCredentials, setRegisterCredentials] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [passwordToggle, setPasswordToggle] = useState(false);
  const [error, setError] = useState(""); // State to hold the error message

  const handlePasswordToggle = () => {
    setPasswordToggle(!passwordToggle);
  };

  const handleInputChange = (e) => {
    setRegisterCredentials({
      ...registerCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation logic
    const { firstName, lastName, mobile, email, password } = registerCredentials;

    if (!firstName || !lastName || !mobile || !email || !password) {
      setError("All fields are required!");
      setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
      return;
    }

    if (mobile.length < 10) {
      setError("Mobile number must be at least 10 digits!");
      setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
      return;
    }

    // Clear any previous error message
    setError("");

    // Proceed with the signup
    signupHandler(registerCredentials);
    console.log(registerCredentials); // For debugging
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-7 login-page">
          <h1>Welcome</h1>
        </div>
        <div className="col-lg-5">
          <div className="row justify-center">
            <div className="col-lg-10">
              <div className="head-box py-3">
                <h2 className="text-2xl text-success font-bold">
                  Join us<br />
                  Create a PortFile account
                </h2>
                <p>
                  Already a user ?{" "}
                  <Link to="/login" className="text-blue-600">
                    Login here
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
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    onChange={handleInputChange}
                    value={registerCredentials.firstName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    onChange={handleInputChange}
                    value={registerCredentials.lastName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobile" className="form-label">
                    Mobile
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="mobile"
                    onChange={handleInputChange}
                    value={registerCredentials.mobile}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={handleInputChange}
                    value={registerCredentials.email}
                  />
                </div>
                <div className="form-group relative">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type={passwordToggle ? "text" : "password"}
                    className="form-control"
                    name="password"
                    onChange={handleInputChange}
                    value={registerCredentials.password}
                  />
                  <Link
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
                    className="btn bg-success w-100 py-2 text-light fw-bold"
                  >
                    Register
                  </button>
                </div>
              </form>
              <div className="foot-box py-3 flex flex-col gap-3">
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

export default Register;
