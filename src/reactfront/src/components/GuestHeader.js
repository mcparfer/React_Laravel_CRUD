import React from "react";
import { Link } from 'react-router-dom';

import logo from "../images/logo.png";

const GuestHeader = () => {

  return (
    <div>
      <header>
        <div className="px-3 py-2 miku">
          <div className="d-flex flex-wrap align-items-center">
            <div className="d-flex align-items-center my-2 my-lg-0 me-lg-auto">
              <img
                src={logo}
                className="mx-3"
                width="200px"
                alt="Project SEKAI Wiki"
              ></img>
              <h5 className="fs-4 fw-bold mt-2">Project SEKAI</h5>
            </div>

            <ul className="nav col-12 col-lg-auto justify-content-center align-items-center my-2 my-md-0 text-small">
              <Link to="/" className="nav-link text-black fw-bold">
                Home
              </Link>
              <li>
                <Link to="/login" className="nav-link fw-bold text-white ms-3 btn danger-color">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default GuestHeader;
