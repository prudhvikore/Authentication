import React from "react"
import {useNavigate} from "react-router-dom"
import './header.css'

const Header = () => {
    const navigate=useNavigate();
    const onLogout=()=> {
        navigate("/login")
    }

    return (
        <nav className="nav-header">
        <div className="nav-content">
            <div className="nav-bar-mobile-logo-container">
                <img
                className="website-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Pluralsight_Logo.svg/1280px-Pluralsight_Logo.svg.png"
                alt="website logo mobile"
                />
            <button type="button" className="nav-mobile-btn">
                <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                alt="nav logout"
                className="nav-bar-image"
                onClick={onLogout}
                />
            </button>
            </div>

            <div className="nav-bar-large-container">
                <img
                className="website-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Pluralsight_Logo.svg/1280px-Pluralsight_Logo.svg.png"
                alt="website logo"
                />
            <ul className="nav-menu">
                <li className="nav-menu-item">
                    Home
                </li>
            </ul>
            <button
                type="button"
                className="logout-desktop-btn"
                onClick={onLogout}
                data-testid="logout-test"
            >
                Logout

            </button>
            </div>
        </div>
        </nav>
    )
}

export default (Header)
