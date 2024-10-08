
let listUser = [
    {

        name: 'Tran Duc Vuong',
        email: 'Rongcon838@gmail.com',
        role: 'Admin'
    },
    {
        name: 'Tran Van B',
        email: 'A@Example.vn',
        role: 'User'
    },
    {
        name: 'Ngoc Thao Nhi',
        email: 'Hao@tienlen',
        role: 'merchant'
    },
    {
        name: 's',
        email: 'Rongcon838@gmail.com',
        role: 'Admin'
    },
    {
        name: 'd',
        email: 'A@Example.vn',
        role: 'User'
    },
    {
        name: 'g',
        email: 'Hao@tienlen',
        role: 'merchant'
    },
    {
        name: 'h',
        email: 'Rongcon838@gmail.com',
        role: 'Admin'
    },
    {
        name: 'u',
        email: 'A@Example.vn',
        role: 'User'
    },
    {
        name: 'uy',
        email: 'Hao@tienlen',
        role: 'merchant'
    },
    {
        name: 'fgdf',
        email: 'Rongcon838@gmail.com',
        role: 'Admin'
    },
    {
        name: 'hgh',
        email: 'A@Example.vn',
        role: 'User'
    },
    {
        name: 'sdf',
        email: 'Hao@tienlen',
        role: 'merchant'
    },
    {
        name: 'sdfdsf',
        email: 'Rongcon838@gmail.com',
        role: 'Admin'
    },
    {
        name: 'jlj',
        email: 'A@Example.vn',
        role: 'User'
    },
    {
        name: 'pioi',
        email: 'Hao@tienlen',
        role: 'merchant'
    },
];
const offSetElement = document.querySelector('.form-select');
let offSetValue = offSetElement.value;
let current = 1;
let lengOfList = listUser.length;
const inputName = document.getElementById("input-name");
const inputEmail = document.getElementById("input-email");
const selectRole = document.getElementById("select-role");
const innerListUser = document.getElementById("table-main");
const btnSubmitForm = document.querySelector(".form-input_submit");

btnSubmitForm.addEventListener("click", handleSubmitForm);
let listName = [];


function renderRowHtml(list) {
    let stringListUser = `
    <tr>
    <th>#</th>
    <th>Name</th>
    <th>Email</th>
    <th>Role</th>
    <th>Action</th>
    </tr>`;

    list.forEach((user, index) => {
        stringListUser += `
        <tr>
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>
        <button class="btn-edit">edit</button>
        <button class="btn-delete" data-index="${index}">delete</button>
        </td>
        </tr>`;
    });

    innerListUser.innerHTML = stringListUser;
    addDeleteListeners();

    //Tạo array để sort
    listName = listUser.map((user) => user.name);
    listName = listName.sort()

    lengOfList = listUser.length;
    genPageItem();
}
offSet();


// renderRowHtml(listUser);
//trc khi nhận 1 task clear rõ ra task này để làm gì 
// function sắp xếp
let indexOfArray = 0;
listName = listUser.map((user) => user.name);
listName = listName.sort()

lengOfList = listUser.length;

function sortByName() {
    while (indexOfArray != listUser.length) {
        sortUserByName(indexOfArray)
        indexOfArray++;
    }
    renderRowHtml(listSortName);
}

let listSortName = [];
function sortUserByName(indexOfArray) {

    listUser.forEach((value) => {
        if (listName[indexOfArray] == value.name) {
            listSortName.push(value);
            return;
        }
    })
}


//làm thêm 1 hàm show data, delete 1 lần render lại 1 lần, mỗi lần delete
function addDeleteListeners() {
    const btnDelete = document.querySelectorAll(".btn-delete");

    btnDelete.forEach((element) => {

        element.addEventListener("click", (e) => {
            const isConfirm = confirm('Bạn có chắc muốn xóa không: ');//return true or false 
            if (isConfirm) {
                const index = e.target.getAttribute("data-index")
                listUser.splice(index, 1);
                renderRowHtml(listUser);
            }
        });
    });
}

//trống input



// pagination


function offSet() {
    offSetValue = offSetElement.value;
    let startIndex = (current - 1) * offSetValue;
    let endIndex = startIndex + (offSetValue - 1);
    let result = []
    listUser.map((value, index) => {
        if (index >= startIndex && index <= endIndex) {
            result.push(value);
        }
    })
    renderRowHtml(result)
    if (current == 1) {
        document.querySelector('.nextbtn2').style.opacity = '0.5';
    }
}

function numOfPage() {
    return Math.ceil(lengOfList / offSetValue)
}

function genPageItem() {
    const paginationElement = document.querySelector(".pagination");
    let listPage = '<li class="page-item nextbtn2"><a onClick = "prePage()" class="page-link" href="#">Previous</a></li>'
    let page = 1;
    while (page <= numOfPage()) {
        listPage += `<li class="page-item"><a onClick = 'getCurrentPage(${page})' class="page-link" href="#">${page}</a></li>`
        page++
    }
    listPage += '<li class="page-item nextbtn1 "><a onClick = "nextPage()" class="page-link" href="#">Next</a></li>'
    paginationElement.innerHTML = (listPage);
}

// debounc
// nextjs

// lấy value của current page

function getCurrentPage(page) {
    current = page;
    offSet()
}


function nextPage() {
    if (current < numOfPage()) {
        current += 1;
        document.querySelector('.nextbtn2').style.opacity = '1';
        offSet()
    }
    if (current == numOfPage()) {
        document.querySelector('.nextbtn1').style.opacity = '0.5';
    }
}

if (current == 1) {
    document.querySelector('.nextbtn2').style.opacity = '0.5';
}

function prePage() {
    if (current > 0) {
        current -= 1;
        document.querySelector('.nextbtn1').style.opacity = '1';
        offSet()
    }
    if (current == 1) {
        document.querySelector('.nextbtn2').style.opacity = '0.5';
    }
}



//vứt button sắp xếp xuống header cột