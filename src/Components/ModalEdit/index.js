import React, { memo, useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './style.css'
import { AppContext } from '../../Context/ContextApp';

function ModalEdit({ show, handleClose}) {

    //Sử dụng useContext
    const {setListUser, listUser, indexUser} = useContext(AppContext)

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
                   <div className='main-modals' >
                        <input className='main-modals-input_name' placeholder='name' defaultValue={listUser[indexUser]?.name || "" } onChange={(e)=>{setName(e.target.value)}}/>
                        <input className='main-modals-input_email' placeholder='email' defaultValue = {listUser[indexUser]?.email || "" }  onChange={(e)=>{setEmail(e.target.value)}}/>
                        <select className='main-modals-select' defaultValue={listUser[indexUser]?.role}  onChange={(e)=>{setRole(e.target.value)}}>
                            <option value={"Admin"}>Admin</option>
                            <option value={"User"}>User</option>
                            <option value={"Merchant"}>Merchant</option>
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

export default memo(ModalEdit);
