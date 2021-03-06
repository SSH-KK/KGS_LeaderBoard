import React from 'react'
import { Link } from 'react-router-dom'
import '@styles/Navbar.css'

type NavBarProps = {
  isAuth: boolean
  makeLogout?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Navbar: React.FC<NavBarProps> = ({ isAuth, makeLogout }) => {
  return (
    <nav
      className={`fixedNav navbar navbar-expand-md navbar-dark bg-dark`}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold">
          KGS LeaderBoard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav w-100 d-flex justify-content-between">
            <li className="nav-item">
              {isAuth ? (
                <Link to="/top" className="nav-link">
                  TOP 100
                </Link>
              ) : (
                <Link to="/" className="nav-link">
                  Login
                </Link>
              )}
            </li>
            {isAuth ? (
              <button
                type="button"
                onClick={makeLogout}
                className="btn btn-outline-danger"
              >
                Logout
              </button>
            ) : (
              ''
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
