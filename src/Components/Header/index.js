import React from 'react'
import './style.css'

function Header() {
    return (
        <header className="header">
            <div>Admin dashbroad</div>
            <ul className="header-nav" >
                <li className="header-nav_item">Home</li>
                <li className="header-nav_item">Users</li>
                <li className="header-nav_item">Settings</li>
                <li className="header-nav_item">Logout</li>
            </ul>
        </header>
    )
}

export default Header
