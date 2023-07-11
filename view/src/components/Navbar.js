import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import logo from "../images/mapgo_logo.png";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg   mynavbar">
        {/* <NavLink className="navbar-brand"></NavLink> */}
        <div className="container-fluid">
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0"> */}
            

              <div className="link">
                {/* <li> */}
                <NavLink className="mapgo" to="/">
                    mapGo
                </NavLink>
                {/* </li> */}
                {/* <li className="nav-item item1"> */}
                <div className="pages">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                {/* </li> */}

                {/* <li className="nav-item item2"> */}
                  <NavLink className="nav-link" to="/signup">
                    Signup
                  </NavLink>
                {/* </li> */}

                {/* <li className="nav-item item3"> */}
                  <NavLink className="nav-link" to="/contact">
                    Contact
                  </NavLink>
                  </div>
                {/* </li> */}
              </div>
            
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
