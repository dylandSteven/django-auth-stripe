import React from "react";
import { NavLink, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Navbar() {
  const { isLoggedIn } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{justifyContent: "space-between"}}>
          <div style={{height: "40px"}}>
            <NavLink className={'nav-link'} to={'/'} style={{height: "100%"}}>
              <img src="/logo.png" style={{height: "100%"}} alt="logo" />
            </NavLink>
          </div>
          <ul className='navbar-nav mb-2 mb-lg-0'>
            <li className="nav-item">
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Apps"
                menuVariant="dark"
              >
                <NavDropdown.Item as={Link} to={'/hello_world'}>Hello World</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={'/hello_universe'}>Hello Universe</NavDropdown.Item>
              </NavDropdown>
            </li>
            {isLoggedIn ? (
              <li className='nav-item'><NavLink className={'nav-link'} to={'/auth/user'}>User</NavLink></li>
            ) : (
              <>
                <li className='nav-item'><NavLink className={'nav-link'} to={'/auth/login'}>Login</NavLink></li>
                <li className='nav-item'><NavLink className={'nav-link'} to={'/auth/register'}>Register</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
