import React, { useRef, useState } from 'react'
import './style.css';
import logo from "./arius-logo.png"
import { account } from '../../Common/common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import {useNavigate } from 'react-router-dom';



function LogIn({setIsAuth}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
  const navigate = useNavigate();
  const inputPassword = useRef()
  const iconEye2 = useRef()
  
  const handleLogIn = () => {
    if (username == account[0].tk && password == account[0].mk) {
      localStorage.setItem('isAuth', 'true')
      setIsAuth(true)
      navigate("/");
    } else {
      alert("Thông tin đăng nhập chưa chính xác ^^")
    }
  }

  

  //Xử lí mắt nhìn mật khẩu
  const handleEyeLogin = () => {
    iconEye2.current.classList.toggle('display-none');
    if (inputPassword.current.type === 'password') {
      inputPassword.current.type = 'text';
    } else {
      inputPassword.current.type = 'password';
    }
  }

  return (

    <div className="main">

      {/* left side */}

      <div className="form-wrapper">

        <div className="left-side">

          <h1>Sign in</h1>
          <div className="input-infor">
            <div className="">
              <FontAwesomeIcon icon={faUser} />
              <input
                className="name-input"
                placeholder="Your Name"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>

            <div className="">
              <FontAwesomeIcon icon={faKey} />
              <input
                ref={inputPassword}
                className="password-input"
                placeholder="Repeat your password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="statements">

            <input
              type="checkbox"
              className="checkbox"
            />

            <span className='save-password'>Lưu mật khẩu</span> 
            <span className='span-icon-eyes1'>
        <FontAwesomeIcon icon={faEye} />
      </span>
      <span ref={iconEye2} onClick={handleEyeLogin} className='span-icon-eyes2'>
        <FontAwesomeIcon icon={faEyeSlash} />
      </span>



          </div>
          <div className="submit-Btn">
            <button
              className="btnSubmit"
              onClick={handleLogIn}
            >Sign In</button>


          </div>

        </div>


        {/* <!-- right-side --> */}
        <div className="right-side">
          <div className="logo-company">
            <img src={logo} alt="Ảnh logo" />
          </div>
        </div>
      </div>

      

    </div>
  )
}

export default LogIn
