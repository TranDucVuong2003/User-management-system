import React, { useEffect, useState } from 'react'
import './assets/reset.css';
import Header from './Components/Header'
import InputTable from './Components/InputTable';
import UserList from './Components/UserList';


function App() {
  const [listUser, setListUser] = useState([
    {

      name: 'Tran Duc Vuong',
      email: 'Rongcon838@gmail.com',
      role: 'Admin'
    },
    {
      name: 'Tran Van Bao',
      email: 'Bao@Example.vn',
      role: 'User'
    },
    {
      name: 'Ngoc Thao Nhi',
      email: 'Hao@tienlen',
      role: 'merchant'
    },
    {
      name: 'Hoang Van Vu',
      email: 'VuDaiGia@gmail.com',
      role: 'Admin'
    },
    {
      name: 'Nghiem Quoc Thinh',
      email: 'Thinh69@yahoo.com',
      role: 'User'
    },
    {
      name: 'Nguyen Tien Thi',
      email: 'Tinthi221@gmail.com',
      role: 'merchant'
    },
    {
      name: 'Huan Hoa Hong',
      email: 'HuanHong8@gmail.com',
      role: 'Admin'
    },{
      name: 'Nguyen Van Vu',
      email: 'Naruto@gmail.com',
      role: 'Admin'
    },
    {
      name: 'Ha Thu Thinh',
      email: 'Thinhxxz0z@yahoo.com',
      role: 'User'
    },
    {
      name: 'Thi Ha Van',
      email: 'Vanmuat1@gmail.com',
      role: 'merchant'
    },
    {
      name: 'Hong Kong chan',
      email: 'Chinanb2@gmail.com',
      role: 'Admin'
    }
  ])

  return (
    <div>

      <Header />
      <InputTable listUser={listUser} setListUser={setListUser} />
      <UserList listUser={listUser} setListUser={setListUser} />

    </div>
  )
}

export default App
