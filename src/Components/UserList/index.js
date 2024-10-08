import React, { useEffect, useState } from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../Pagination';

function UserList({ listUser, setListUser }) {
    const [temListUser, setTemListUser] = useState(listUser)

    /*-----------------Button Delete--------------------------------*/
    function handleDelete(indexd) {
        const isConfirm = window.confirm('Bạn có chắc muốn xóa không: ');//return true or false 
        if (isConfirm) {
            let arr = listUser.filter((_, index) => index !== indexd );
            setTemListUser(arr) //render
        }
    }


    /*-----------------Filter role--------------------------------*/
    function filterRole(e) {

        if (e.target.value != "all") {
            const newListUser = listUser.filter((item) => {
                return item.role === e.target.value
            })
            setTemListUser(newListUser)

        } else {
            setTemListUser(listUser)
        }
    }

    /*-----------------Seach User--------------------------------*/
    const [searchValue, setSearchValue] = useState("")
    function searchUser() {
        const nameSearch = listUser.filter((item) => {
            return item.name.toLowerCase().includes(searchValue.toLocaleLowerCase()) || 
            item.email.toLowerCase().includes(searchValue.toLocaleLowerCase())
        })
        setTemListUser(nameSearch)
    }

    /*-----------------Sort-SapXep--------------------------------*/

    let indexOfArray = 0;
    let listName = temListUser.map((user) => user.name.toLowerCase());
    listName = listName.sort();


    function sortByName() {
        while (indexOfArray != temListUser.length) {
            sortUserByName(indexOfArray)
            indexOfArray++;
        }
        setTemListUser(listSortName);
    }

    let listSortName = [];
    function sortUserByName(indexOfArray) {

        temListUser.forEach((value) => {
            if (listName[indexOfArray] == value.name.toLowerCase()) {
                listSortName.push(value);
                return;
            }
        })
    }

    /*Khi nhấn vào add_button => listUser thay đổi thì dependency thay đổi => Set lại temListUser => render lại đúng list vừa đc add thêm*/
    useEffect(() => {
        console.log("listUser: ", listUser.length);
        console.log("temListUser: ", temListUser.length);
        
        if(listUser.length != temListUser.length) {
            console.log("vao");
            setTemListUser(listUser);
        }
    }, [listUser])

    return (
        <div className="table-list">
            <div className="table-list_header">
                <div style={{ display: 'flex', gap: '8px' }}>
                    <p>User list</p>
                </div>
            </div>
            <div className='table-list_change' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="table-list_header--search">
                    <p style={{ fontSize: '20px' }}>Search</p>
                    <input id="search-user" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    <button onClick={searchUser} className="table-list_header--search--button" style={{ border: 'none' }}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>

                <select onChange={filterRole} name="" id="role-filter">
                    <option value="all">All</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="merchant">Merchant</option>
                </select>

            </div>

            <table id="table-main" className="table-list_main">
                <tr>
                    <th>#</th>
                    <th onClick={sortByName} >Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
                {temListUser?.map((user, index) =>
                    <tr key={index}>
                        <td>{index + 1}</td> 
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <button class="btn-edit">edit</button>
                            <button class="btn-delete" data-index="${index}" onClick={() => handleDelete(index)}>delete</button>
                        </td>
                    </tr>
                )}
            </table>
            <Pagination temListUser = {temListUser} setTemListUser={setTemListUser} listUser={listUser} />
        </div>
    )
}

export default UserList

//naming convention