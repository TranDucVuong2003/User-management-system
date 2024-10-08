import React, { useEffect, useState } from 'react'

function LearnUseEffect() {
    const [count, setCount] = useState(0);//khi setState thi rerender
    const [count2, setCount2] = useState(0);//khi setState thi rerender
    useEffect(() => {
        console.log('abc');

    })
    /**
     * chạy khi onMount
     * chạy cả khi rerender
     * */

    // ==================================
    // useEffect(() => {
    //     console.log('def');
    // }, [])
    /**
     * chạy khi onMount
     * không chạy khi rerender
     * */

    // ===============================
    // console.log('rerender');

    // useEffect(() => {
    //     console.log(count);
    //     console.log(count2);
    // }, [count])
    /**
     * chạy khi onMount
     * không chạy khi rerender 
     * chạy khi dependency thay đổi
     * */

    // 1 mảng rỗng thì chỉ chạy web site đc mouted
    // 2 có dependency
    // 3 không có 



    return (
        <div>
            hello
            <button onClick={() => setCount(count + 1)}>Increase 1</button>
            <button onClick={() => setCount2(count2 + 1)}>Increase 2</button>

            <h1>count 1: {count}</h1>
            <h1>count 2: {count2}</h1>
        </div>
    )
}

export default LearnUseEffect
