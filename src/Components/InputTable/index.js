import React, { useState } from "react"
import './style.css'
import { setTemListUser } from "../UserList";

function InputTable({ listUser, setListUser }) {
    // "Name is require"
    // "Email is require"
    const [name, setName] = useState("");
    const [inputNameError, setInputNameError] = useState("")
    const [inputEmailError, setInputEmailError] = useState("")
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("admin");

    /**--------------------Add-button---------------------------- */
    function handleAdd(e) {
        e.preventDefault()
        /**-------------------------------empty_input------------------------------- */

        if (!name || !email) {
            if (!name) {
                setInputNameError("Name is require")
            }
            if (!email) {
                setInputEmailError("Email is require")
            }
        }
        else {
            setInputNameError()
            setInputEmailError()
            let newUsers = [...listUser];
            newUsers.push({
                name: name,
                email: email,
                role: role
            })

            setListUser(newUsers)
            clearData()
           
        }
    }

    const clearData = () => {
        setEmail("")
        setName("")
        setRole("admin")
    }

    return (
        <div className="form-input">
            <div className="form-input_header">Add user</div>
            <form className="form-input-main" action="">
                <label className="input-lable" htmlFor="">Name</label>
                <input
                    name="user-name"
                    type="text"
                    id="input-name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                ></input>

                {<p style={{ color: "red", marginBottom: '20px' }} className="input-name-error">{inputNameError}</p>}
                <label className="input-lable" htmlFor="">Email</label>
                <input
                    name="user-email"
                    type="text"
                    id="input-email"
                    placeHolder="Enter your email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                ></input>

                {<p style={{ color: "red", marginBottom: '20px' }} className="input-email-error">{inputEmailError}</p>}
                <label className="input-lable" htmlFor="">Role</label>
                <select
                    name="user-role"
                    type="text"
                    id="select-role"
                    value={role}
                    onChange={(e) => {
                        setRole(e.target.value)
                    }}
                >
                    <option value="admin">Admin</option>
                    <option value="user">user</option>
                    <option value="merchant">Merchant</option>
                </select>
                <button className="form-input_submit"
                    type="submit"
                    style={{ marginTop: "15px" }}
                    onClick={handleAdd}
                >Add</button>
            </form>

        </div>
    )
}

export default InputTable
