import React, { useState } from 'react'


function LearnUseState({isDeptrai}) {
  console.log('isDeptrai', isDeptrai);
  

  let [render, SetRender] = useState(0);
  console.log('re-render')

  const handleClick = () => {
      // for(let i = 0; i<5; i++){
        SetRender(render+1);
        SetRender(render+1);
        SetRender(render+1);
        SetRender(render+1);
        SetRender(render+1);

        SetRender((prev) => prev+1);
        SetRender((prev) => prev+1);
        SetRender((prev) => prev+1);
        SetRender((prev) => prev+1);
        SetRender((prev) => prev+1);
    // }
  }
  return (
    <div>
      <button onClick={() => handleClick()}>Clicks!</button>
      {render}
    </div>
  )
}

export default LearnUseState
