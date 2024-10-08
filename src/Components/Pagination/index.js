import React, { useEffect, useLayoutEffect, useState } from 'react'

function Pagination({ temListUser, setTemListUser, listUser }) {

    const [current, setCurrent] = useState(1); // Trang hiện tại
    const [offSetValue, setOffSetValue] = useState(3) // Số hàng trên mỗi trang

    let lengOfList = temListUser.length;


    // ----------------------Số trang hiển thị 3_5_10 -----------------------------
    function offSet() {
        let endIndex = current * offSetValue;
        let startIndex = endIndex - offSetValue;
        console.log("anc: ", temListUser.slice(startIndex, endIndex));
        
        setTemListUser(temListUser.slice(startIndex, endIndex));
    }

    // -----------------------Số trang hiển thị ---------------------------------------
    function numOfPage() {
        return Math.ceil(lengOfList / offSetValue)
    }


    function prePage() {
        if (current > 1) {
            setCurrent(current - 1)
        }
    }

    function nextPage() {
        if (current < numOfPage()) {
            setCurrent(current + 1)
        }
    }

    // -------------------Render page-------------------------------------------------



    function getCurrentPage(page) {
        setCurrent(page);
    }

    // --------------------------------Số trang hiển thị thay đổi nếu current, offSetValue, listUser thay đổi------------------------
    useEffect(() => {
        offSet()
    }, [current, offSetValue])

    return (
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 12px", alignItems: 'center' }}>
            <select className="form-select" onChange={(e) => {
                setOffSetValue(e.target.value);
            }} aria-babel="Default select example"
                style={{ maxWidth: '100px' }}>
                <option selected value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
            </select>
            <nav aria-label="Page navigation example" style={{ justifyContent: 'end', display: 'flex' }}>
                <ul className="pagination" style={{ display: 'flex', gap: '6px' }}>
                    <li class="page-item nextbtn2" ><button onClick={prePage} class="page-link" href="#">Previous</button></li>
                    {
                        [...Array(numOfPage()).keys()].map((_, index) => <li class="page-item">
                            <button key={index}
                                onClick={() => getCurrentPage(index + 1)}
                                class="page-link"
                                href="#">{index + 1}
                            </button>
                        </li>
                        )
                    }
                    <li class="page-item nextbtn1 "><button onClick={nextPage} class="page-link" href="#">Next</button></li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination
