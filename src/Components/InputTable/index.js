import React, { useContext, useState } from "react"
import './style.css'
import { AppContext } from "../../Context/ContextApp"
import { FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router-dom"
import { onAddUser } from "../../services/api"


function InputTable() {
    //Sử dụng useContext
    const { listUser, setListUser } = useContext(AppContext)

    // "Name is require"
    // "Email is require"
    const [inputEmailError, setInputEmailError] = useState("")
    const [inputNameError, setInputNameError] = useState("")
    const [inputIdError, setInputIdError] = useState("")


    const [role, setRole] = useState("admin");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [id, setId] = useState("");


    /**--------------------Add-button---------------------------- */
    function handleAdd(e) {
        e.preventDefault();

        // Regex
        const regexName = /^[A-Za-zÀ-ỹ]+(?:\s[A-Za-zÀ-ỹ]+)*$/;
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const isNameValid = regexName.test(name);
        const isEmailValid = regexEmail.test(email);

        // Kiểm tra input trống và định dạng regex
        if (!name.trim()) {
            setInputNameError("Name is required");
        } else if (!isNameValid) {
            setInputNameError("Name is not in correct format");
        } else {
            setInputNameError("");
        }

        if (!email.trim()) {
            setInputEmailError("Email is required");
        } else if (!isEmailValid) {
            setInputEmailError("Email is not in correct format");
        } else {
            setInputEmailError("");
        }

        if(!id.trim()){
            setInputIdError("Id is required")
        }else {
            setInputIdError("");
        }

        // Ngừng nếu có lỗi
        if (!isNameValid || !isEmailValid || !name.trim() || !email.trim()) {
            return;
        }

        // Kiểm tra trùng lặp
        const isNameExist = listUser.some((value) => value.name === name);
        const isEmailExist = listUser.some((value) => value.email === email);
        const isIdExist = listUser.some((value) => value.id === id)

        if (isNameExist || isEmailExist || isIdExist) {
            if (isNameExist) {
                setInputNameError("Name already exists.");
            }
            if (isEmailExist) {
                setInputEmailError("Email already exists.");
            }
            if (isIdExist) {
                setInputIdError("Id already exists.");
            }
            return;
        }

        // Thêm người dùng mới
        const handlePostApi = async (newUser) => {
            try{
                const response = await onAddUser(newUser)
                console.log('Thêm thành công', response.data)
                return response.data;
            } catch (error) {
                console.error('Lỗi khi thêm dữ liệu', error)
            }
        }

        const newUsers = [...listUser, { name, email, role}];
        handlePostApi({ name, email, role})
        setListUser(newUsers);

        alert("Thêm người dùng thành công ^^");
        setInputNameError("");
        setInputEmailError("");
        setInputIdError("");
        clearData();
    }


    const clearData = () => {
        setEmail("")
        setName("")
        setId("")
        setRole("admin")
    }


    return (
        <div className="form-input">
            <div className="form-input_header">
                <Link to="/users" style={{ padding: '5px 12px 9px 0px', color: '#fff', cursor: 'pointer' }}><FaArrowLeft /></Link>
                Add user
            </div>
            <form className="form-input-main" action="">
                {/* <label className="input-lable" htmlFor="">Id</label>
                <input
                style={{maxWidth: '130px'}}
                    name="user-id"
                    type="number"
                    id="input-id"
                    placeholder="Enter your Id"
                    value={id}
                    onChange={(e) => {
                        setId(e.target.value);
                    }}
                ></input>

                {<p style={{ color: "red", marginBottom: '20px' }} className="input-name-error">{inputIdError}</p>} */}

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
                    <option value="user">User</option>
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
