import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ModalEdit from '../ModalEdit';
import { AppContext } from '../../Context/ContextApp';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { onDeleteAUser } from '../../services/api';


function UserList() {
    // Sử dụng useContext
    const { listUser, setListUser, temListUser, setTemListUser, setIndexUser, fetchUsers } = useContext(AppContext);

    const [show, setShow] = useState(false)
    const [role, setRole] = useState('all')
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleClose = useCallback(() => { setShow(false); }, [])
    const handleShow = () => { setShow(true) }
    const [offSetValue, setOffSetValue] = useState(5) // Số hàng trên mỗi trang
    const [current, setCurrent] = useState(1);
    //Số lượng trang hiển thị
    const numOfPage = (list) => {
        return Math.ceil(list.length / offSetValue)
    }
    const [nop, setNop] = useState(numOfPage(listUser));
    const preBtnElement = useRef();
    const nextBtnElement = useRef();

    // Render của temListUser
    const renderTemListUser = (list) => {
        setTemListUser(list);
    }
    // ----------------------Số hàng hiển thị 3_5_10 -----------------------------
    const handleOffSet = (list) => {
        let startIndex = (current - 1) * offSetValue;
        let endIndex = startIndex + (offSetValue - 1);

        let result = []
        list.map((value, index) => {
            if (index >= startIndex && index <= endIndex) {
                result.push(value)
            }
        })
        return (result);
    }
    /*-----------------Button Delete--------------------------------*/
    const handleFetchDelete = async (id) => {
        try {
            console.log("Deleting ID:", id); 
            const response = await onDeleteAUser(id)
            console.log('Xóa thành công', response.data);
            alert("Xóa thành công!");
            return response.data

        } catch (error) {
            console.error('Lỗi khi xóa dữ liệu', error);
            alert("Lỗi khi xóa dữ liệu !");

        }
    }

    // Hàm xử lý khi nhấn nút Delete
    const handleDelete = async () => {
        // Kiểm tra nếu có hàng nào được chọn
        if (selectedUsers.length > 0) { // Lọc bỏ các phần tử có chỉ mục trong selectedUsers
            try {
                //Lấy id của các phần tử đã được chọn
                const selectedIds = selectedUsers.map((index) =>
                    temListUser[index].id
                )

                await Promise.all(selectedIds.map((id) => handleFetchDelete(id)))

                // const updatedTemListUser = temListUser.filter((user) => !selectedUsers.includes(user.id));
                // const updatedListUser = listUser.filter((user) => !selectedUsers.includes(user.id));
                
                // // Cập nhật lại listUser và temListUser
                // setListUser(updatedListUser);
                // setTemListUser(updatedTemListUser);

                // Cập nhật bằng cách gọi lại API
                fetchUsers();
                
                // Sau khi xóa, bỏ chọn tất cả các checkbox
                setSelectedUsers([]);
            }
            catch (error) {
                console.log('Lỗi khi xóa người dùng', error);
            }
        }
    };

    // Hàm xử lý chọn hoặc bỏ chọn tất cả checkbox trong trang
    const handleSelectAll = (isChecked) => {
        if (isChecked) {
            // Chọn tất cả checkbox trong trang
            setSelectedUsers(temListUser.map((_, index) => index));
        } else {
            // Bỏ chọn tất cả checkbox trong trang
            setSelectedUsers([]);
        }
    };

    // Hàm xử lý khi nhấn vào checkbox con
    const handleCheckBox = (index) => {
        setSelectedUsers((prev) => {
            if (prev.includes(index)) {
                // Bỏ chọn checkbox
                return prev.filter((i) => i !== index);
            } else {
                // Chọn checkbox
                return [...prev, index];
            }
        });
    };

    /*-----------------Seach User--------------------------------*/
    const [searchValue, setSearchValue] = useState("")
    function searchUser() {
        const nameSearch = listUser.filter((item) => {
            return item.name.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                item.email.toLowerCase().includes(searchValue.toLocaleLowerCase())
        })
        renderTemListUser(nameSearch)
    }

    /*-----------------Sort-SapXep--------------------------------*/

    let indexOfArray = 0;
    let listName = listUser.map((user) => user.name.toLowerCase());
    listName = listName.sort();

    let listSortName = [];
    function sortUserByName(indexOfArray) {
        temListUser.forEach((value) => {
            if (listName[indexOfArray] == value.name.toLowerCase()) {
                listSortName.push(value);
                return;
            }
        })
    }
    function sortByName() {
        while (indexOfArray != listUser.length) {
            sortUserByName(indexOfArray)
            indexOfArray++;
        }

        // Sắp xếp a-z
        if (temListUser[0] != listSortName[0]) {
            renderTemListUser(listSortName);
        }

        // Sắp xếp z-a
        if (temListUser[0] == listSortName[0]) {
            renderTemListUser(listSortName.reverse())
        }
    }

    // nextBtn, preBtn

    const preBtn = () => {
        if (current > 1) {
            setCurrent(current - 1)
        } else {
            return
        }
    }

    const nextBtn = () => {
        if (current < nop) {
            setCurrent(current + 1)
        } else {
            return
        }
    }

    // ----------------------------------------------Pagination----------------------------------------------------------
    const getPagination = () => {
        const totalPages = nop; // Tổng số trang
        let pageNumbers = [];

        // Số trang nhỏ hơn hoặc bằng 5 thì hiển thị tất cả
        if (totalPages < 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Hiển thị các trang đầu, trang cuối, và các trang gần trang hiện tại
            pageNumbers.push(1) // Hiển thị trang đầu tiên

            if (current > 3) {
                pageNumbers.push('...') //Trang hiện tại lớn hơn 3 thì hiển thị '...'
            }

            for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) {
                pageNumbers.push(i);
            }
            if (current < totalPages - 2) pageNumbers.push('...'); // Nếu trang hiện tại < trang cuối - 2, hiển thị "..."
            if (totalPages > 1) pageNumbers.push(totalPages); // Thêm trang cuối
        }
        return pageNumbers

    }

    useEffect(() => {
        //role
        if (role != "all") {
            const newListUser = listUser.filter((item) => {
                return item.role === role
            })
            setNop(numOfPage(newListUser));
            renderTemListUser(handleOffSet(newListUser));


        } else {
            // console.log('offSetValue',offSetValue);
            // console.log('nop',nop);
            // console.log('current',current);
            // console.log('listUser', listUser);
            
            console.log('  ');
            

            
            setNop(numOfPage(listUser));
            renderTemListUser(handleOffSet(listUser));
        }

        // current thay đổi thì style của preBtn và nextBtn thay đổi

        if (current == 1) {
            preBtnElement.current.style.cursor = 'context-menu';
            preBtnElement.current.style.opacity = '0.6';
        } else {
            preBtnElement.current.style.cursor = 'pointer';
            preBtnElement.current.style.opacity = '1';
        }

        if (current == nop) {
            nextBtnElement.current.style.cursor = 'context-menu';
            nextBtnElement.current.style.opacity = '0.6';
        } else {
            nextBtnElement.current.style.cursor = 'pointer';
            nextBtnElement.current.style.opacity = '1';
        }

        //sang trang mới thì bỏ chọn checkbox
        setSelectedUsers([]);

    }, [current, role, nop, listUser, offSetValue])


    return (
        <div>
            <div className="table-list">
                <div className="table-list_header">
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <p style={{ marginTop: '12px' }}>User list</p>
                    </div>
                </div>
                <div className='table-list_change' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <button className='add-Data'>
                            <Link style={{ textDecoration: 'none' }} to="/user">Add</Link>
                        </button>
                        <button className="delete-datas" onClick={handleDelete}>Delete</button>
                    </div>
                    <div className="table-list_header--search" style={{ height: '30px' }}>
                        {/* <p style={{ fontSize: '20px' }}>Search</p>  */}
                        <input id="search-user" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                        <button onClick={searchUser} className="table-list_header--search--button" style={{ border: 'none' }}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>

                    <select onChange={(e) => {
                        setRole(e.target.value)
                        setCurrent(1);
                    }} name="" id="role-filter">
                        <option value="all">All</option>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Merchant">Merchant</option>
                    </select>

                </div>

                <table id="table-main" className="table-list_main">
                    <tr>
                        <th style={{ width: "250px" }}>
                            <input
                                type="checkbox"
                                onChange={(e) => handleSelectAll(e.target.checked)}  // Khi click vào checkbox tổng, gọi handleSelectAll
                                checked={selectedUsers.length === temListUser.length && temListUser.length > 0}  // Kiểm tra xem tất cả checkbox con đã được chọn chưa
                            />
                        </th>
                        <th onClick={sortByName} >Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th >Action</th>
                    </tr>
                    {temListUser?.map((user, index) => (
                        <tr key={index}>
                            <td style={{ width: "250px" }}>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(index)} // Kiểm tra cái checkbox đó có trong selectedUsers chưa
                                    onChange={() => handleCheckBox(index)} // Khi checkbox con thay đổi, gọi hàm handleCheckBox để chọn/bỏ chọn checkbox đó
                                />
                            </td>
                            <td>{user.name}</td>
                            <td >{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="btn-edit" onClick={() => { handleShow(index); setIndexUser(index) }}>edit</button>
                            </td>
                        </tr>
                    ))}

                </table>


                {/* Pagination */}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "0 12px", alignItems: 'center' }}>
                    <select
                        className="form-select"
                        onChange={(e) => {
                            const parseToInt = parseInt(e.target.value)
                            setOffSetValue(e.target.value);


                        }} aria-babel="Default select example"
                        style={{ maxWidth: '100px' }}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                    {/* Pagination */}
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "0 12px", alignItems: 'center' }}>
                        <nav aria-label="Page navigation example" style={{ justifyContent: 'end', display: 'flex' }}>
                            <ul className="pagination">
                                <li className="page-item">
                                    <button className="page-links preBtn" onClick={preBtn} ref={preBtnElement} href="#">Previous</button>
                                </li>

                                {/* Render các trang */}
                                {getPagination().map((page, index) => (
                                    <li className="page-item" key={index}>
                                        {page === '...' ? (
                                            <span className="page-links" style={{ cursor: 'default' }}>...</span>
                                        ) : (
                                            <button
                                                onClick={() => { setCurrent(page); }}
                                                className="page-links"
                                                style={{ backgroundColor: current === page ? "#c9f1ff" : '' }}
                                            >
                                                {page}
                                            </button>
                                        )}
                                    </li>
                                ))}

                                <li className="page-item">
                                    <button className="page-links nextBtn" ref={nextBtnElement} onClick={nextBtn} href="#">Next</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <ModalEdit show={show} handleClose={handleClose} />
        </div>
    )
}

export default UserList

//naming convention