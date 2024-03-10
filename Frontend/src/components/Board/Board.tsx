import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
const Board = () => {
  const {logout} = useAuth(); 
  return (
    <div>Board
      <button onClick={()=>logout()}>logout</button>
    </div>

  )
}

export default Board