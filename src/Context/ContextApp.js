import { createContext, useEffect, useState } from "react";
import { onGetAllUser } from "../services/api";




export const AppContext = createContext();
export const AppProvider = ({ children }) => {

    // const [listUser, setListUser] = useState([
    //     {
    //         "name": "Tran Duc Vuong",
    //         "email": "Rongcon838@gmail.com",
    //         "role": "Admin"
    //     },
    //     {
    //         "name": "Tran Van Bao",
    //         "email": "Bao@Example.vn",
    //         "role": "User"
    //     },
    //     {
    //         "name": "Tran Van Hia",
    //         "email": "BaHUMGo@Example.vn",
    //         "role": "Merchant"
    //     },
    //     {
    //         "name": "Tran Van Ba",
    //         "email": "Baunio@Example.vn",
    //         "role": "User"
    //     },
    //     {
    //         "name": "Ngoc Thao Nhi",
    //         "email": "Hao@tienlen",
    //         "role": "Merchant"
    //     },
    //     {
    //         "name": "Hoang Van Vu",
    //         "email": "VuDaiGia@gmail.com",
    //         "role": "Admin"
    //     },
    //     {
    //         "name": "Nghiem Quoc Thinh",
    //         "email": "Thinh69@yahoo.com",
    //         "role": "User"
    //     },
    //     {
    //         "name": "Nguyen Tien Thi",
    //         "email": "Tinthi221@gmail.com",
    //         "role": "Merchant"
    //     },
    //     {
    //         "name": "Huan Hoa Hong",
    //         "email": "HuanHong8@gmail.com",
    //         "role": "Admin"
    //     },
    //     {
    //         "name": "Nguyen Van Vu",
    //         "email": "Naruto@gmail.com",
    //         "role": "Admin"
    //     },
    //     {
    //         "name": "Ha Thu Thinh",
    //         "email": "Thinhxxz0z@yahoo.com",
    //         "role": "User"
    //     },
    //     {
    //         "name": "Thi Ha Van",
    //         "email": "Vanmuat1@gmail.com",
    //         "role": "Merchant"
    //     },
    //     {
    //         "name": "Hong Kong chan",
    //         "email": "Chinanb2@gmail.com",
    //         "role": "Admin"
    //     },
    //     {
    //         "name": "Le Thi Lan",
    //         "email": "LanLe92@gmail.com",
    //         "role": "User"
    //     },
    //     {
    //         "name": "Nguyen Minh Tu",
    //         "email": "TuMinh1998@yahoo.com",
    //         "role": "Admin"
    //     },
    //     {
    //         "name": "Pham Thi Lan",
    //         "email": "LanPham69@gmail.com",
    //         "role": "Merchant"
    //     },
    //     {
    //         "name": "Hoang Bao Long",
    //         "email": "BaoLong@tienlen.com",
    //         "role": "Merchant"
    //     },
    //     {
    //         "name": "Nguyen Thi Lan",
    //         "email": "ThiLan79@gmail.com",
    //         "role": "User"
    //     },
    //     {
    //         "name": "Do Quang Hieu",
    //         "email": "QuangHieu123@gmail.com",
    //         "role": "Merchant"
    //     },
    //     {
    //         "name": "Bui Hoang Duong",
    //         "email": "DuongHoang@tienlen.com",
    //         "role": "User"
    //     },
    //     {
    //         "name": "Truong Thi Bao",
    //         "email": "BaoTruong1985@gmail.com",
    //         "role": "Merchant"
    //     }
    // ]
    // )
    const [listUser, setListUser] = useState([])
    const [temListUser, setTemListUser] = useState(listUser);
    const [indexUser, setIndexUser] = useState(null);

    const handleGetApi = async () => {
        try {
            const response = await onGetAllUser()
            console.log('response', response);
            return response?.data || [];

        }
        catch (error) {
            console.error('Lỗi khi lấy dữ liệu từ API', error);
            return [];
        }

    }

    const fetchUsers = async () => {
        const data = await handleGetApi();
        setListUser(data);
        console.log('data', data);
    };


    useEffect(() => {
        
        fetchUsers();

    }, []);

    // useEffect(() => {
    //     setTemListUser(listUser); // Cập nhật temListUser mỗi khi listUser thay đổi
    // }, [listUser]);

    return (
        <AppContext.Provider value={{ listUser, setListUser, temListUser, setTemListUser, indexUser, setIndexUser, fetchUsers }}>
            {children}
        </AppContext.Provider>
    )

}