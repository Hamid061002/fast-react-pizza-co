import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LinkButton = ({ children, to }) => {
  const navigate = useNavigate()

  if (to == '-1') return <button className='text-blue-500 hover:underline underline-offset-4 w-fit' onClick={() => navigate(-1)}>{children}</button>
  
  return <Link to={to} className='text-blue-500 hover:underline underline-offset-4'>{children}</Link>
}

export default LinkButton
