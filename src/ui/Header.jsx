import React from 'react'
import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import UserName from '../features/user/UserName'

const Header = () => {
  return (
    <header className='z-10 fixed w-full top-0 flex justify-between items-center px-10 py-5 bg-yellow-400'>
      <Link to='/' className='text-2xl font-semibold uppercase tracking-wider text-stone-800'>Fast React Pizza Co.</Link>
      <SearchOrder />
      <UserName />
    </header>
  )
}

export default Header
