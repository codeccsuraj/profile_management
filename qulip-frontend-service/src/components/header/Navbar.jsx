import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context";

const Navbar = () => {
  const { token, userInfo } = useAuthContext();
  return (
    <nav className="navbar navbar-expand-lg bg-success sticky-top">
      <div className="container-sm">
        <Link className="navbar-brand text-light fw-bold" to="/">
          Portfile
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title fw-bold" id="offcanvasNavbarLabel">
              Portfile
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            {token ? (
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 gap-2">
                <li className="nav-item">
                  <Link className="nav-link text-light active" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" to={`/my-profile/${userInfo?.id}`}>
                    My profile
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav items-center justify-content-end flex-grow-1 pe-3 gap-2">
                <li className="nav-item">
                  <Link className="nav-link text-light active" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-light p-1 px-2 text-sm fw-bold text-success" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-warning p-1 px-2 text-sm fw-bold text-success" to="/register">
                    Sign up
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
