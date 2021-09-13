import React from "react";
import { Link, useHistory } from "react-router-dom";

import Logo from "../logo.svg";
import { useGlobalContext } from "../hooks";


function Navbar() {
  const history = useHistory();
  const { isLogged, user, userLogout } = useGlobalContext();

  function handleClick() {
    userLogout();
    history.push("/redirect");
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-0">
      <div className="container">

        <Link to="/" className="navbar-brand">
          <img src={Logo} alt="GAME DEALS" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#gameDealsNavbar"
          aria-controls="gameDealsNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="gameDealsNavbar">
          <div className="navbar-nav ms-auto mb-2 mb-lg-0">
            {
              isLogged && (
                <Dropdown
                  id="navDropdown"
                  text={ user }
                  onClick={ handleClick }
                />                
              )
            }
          </div>
        </div>
      </div>
    </nav>
  );
}

function Dropdown({ id, text, onClick }) {
  return (
    <div className="dropdown nav-item">
      <a
        className="upper dropdown-toggle nav-link"
        id={ id }
        href="/"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        { text }
      </a>
      <ul
        className="dropdown-menu dropdown-menu-end dropdown-menu-dark"
        aria-labelledby={ id }
      >
        <button className="cap dropdown-item" onClick={ onClick }>
          logout
        </button>
      </ul>
    </div>
  );
}


export default Navbar;