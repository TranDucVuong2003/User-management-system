import { faDisplay } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalEdit({ show, handleClose, indexUser , setListUser, listUser }) {
    const [name, setName] = useState(listUser[indexUser]?.name || "")
    const [email, setEmail] = useState(listUser[indexUser]?.email || "")
    const [role, setRole] = useState(listUser[indexUser]?.role || "")
    const editUser = () => {
        const updatedListUser = listUser.map((value, index)=>{
            if(index == indexUser){
                value.name = name;
                value.email = email;
                value.role = role;
            }
            return value
        })
        setListUser(updatedListUser)
        handleClose()
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                   <div style={{display: "flex", flexDirection: "column", gap: '16px'}}>
                        <input placeholder='name' defaultValue={listUser[indexUser]?.name || "" } onChange={(e)=>{setName(e.target.value)}}/>
                        <input placeholder='email' defaultValue = {listUser[indexUser]?.email || "" }  onChange={(e)=>{setEmail(e.target.value)}}/>
                        <select defaultValue={listUser[indexUser]?.role}  onChange={(e)=>{setRole(e.target.value)}}>
                            <option value={"admin"}>Admin</option>
                            <option value={"user"}>User</option>
                            <option value={"merchant"}>Merchant</option>
                        </select>
                   </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={editUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalEdit
