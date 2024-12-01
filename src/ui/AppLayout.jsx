import React from 'react'
import Header from './Header'
import CartOverview from '../features/cart/CartOverview'
import { Outlet, useNavigation } from 'react-router-dom'
import Loader from './Loader'

const AppLayout = () => {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading' 

  return (
    <div className='flex flex-col h-screen relative font-FiraSans'>
      {
        isLoading && <Loader />
      }    
      <Header />
      <main className='grow mt-[88px]'>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  )
}

export default AppLayout
