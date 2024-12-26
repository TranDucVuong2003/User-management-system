import React, { memo } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'


function Header({setIsAuth}) {
    const navigate = useNavigate();
    const LogOut = () => {
        // if (window.confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
            localStorage.removeItem('isAuth')
            setIsAuth(false)
            navigate("/login");
        //   }
    }
    return (
        <header className="header">
            <Link style={{ textDecoration: 'none', color: '#fff' }} to="/users"> <div style={{ padding: '15px', cursor: 'pointer' }}>Admin dashbroad</div></Link>
            <ul className="header-nav" >
                <Link style={{ textDecoration: 'none', color: '#fff' }} to='/'><li className="header-nav_item">Home</li></Link>
                <Link style={{ textDecoration: 'none', color: '#fff' }} to='/'><li className="header-nav_item">User</li></Link>
                <Link style={{ textDecoration: 'none', color: '#fff' }} to='/'><li className="header-nav_item">Settings</li></Link>
                <li style={{cursor: 'pointer'}} onClick={LogOut} className="header-nav_item">Logout</li>
            </ul>
        </header>
    )
}

export default memo(Header)
