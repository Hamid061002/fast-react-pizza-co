import React from 'react'
import { useSelector } from 'react-redux'

const UserName = () => {
  const userName = useSelector(state => state.user.userName)

  if(!userName) return null
  
  return (
    <div className='font-semibold'>
      {userName}
    </div>
  )
}

export default UserName
