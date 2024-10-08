import React from 'react'

function TableList() {
    function filterRole() {

        const roleFilterElement = document.getElementById("role-filter");
        const filter = (roleFilterElement.value);
    
    
        if (filter != "all") {
            listUserFilter = listUser.filter((item) => item.role === filter);
            renderRowHtml(listUserFilter)
        } else {
            renderRowHtml(listUser)
        }
    }
    return (
        <div class="table-list">
            <div class="table-list_header">
                <div style="display: flex; gap: 8px;">
                    <p>User list</p>
                    <select onchange={filterRole()} name="" id="role-filter" style="outline: none;">
                        <option value="all">All</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="merchant">Merchant</option>
                    </select>
                    <button onclick="sortByName()">Sắp xếp</button>
                </div>
                <div style="display: flex; gap: 8px">
                    <p>Search</p>
                    <div class="table-list_header--search">
                        <input id="search-user" type="text" /> <button onclick="searchUserByName()"
                            class="table-list_header--search--button">
                            <i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </div>
            </div>

            <table id="table-main" class="table-list_main">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>

            </table>
            <div style="display: flex;justify-content: space-between; padding: 0 12px; align-items: center;">
                <select class="form-select" onchange="offSet()" aria-label="Default select example" style="max-width: 100px;">
                    <option selected value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
                <nav aria-label="Page navigation example" style="justify-content: end; display: flex;">
                    <ul class="pagination">
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default TableList
