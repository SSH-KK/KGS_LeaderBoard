import React from 'react'
import { Link } from 'react-router-dom'
import styles from '@styles/Navbar.module.css'

type NavBarProps = {
  isAuth: boolean
  makeLogout: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Navbar: React.FC<NavBarProps> = ({ isAuth, makeLogout }) => {
  return (
    <nav
      className={`${styles.fixedNav} navbar navbar-expand-md navbar-dark bg-dark`}
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
          <ul className="navbar-nav">
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
          </ul>
        </div>
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
      </div>
    </nav>
  )
}

export default Navbar
