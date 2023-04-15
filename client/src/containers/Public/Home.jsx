import React from 'react'
import Header from './Header'
import Navigation from './Navigation'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='h-full w-full'>
      <Header />
      <Navigation />
      <div className='mx-auto mt-4 flex w-1100 flex-col items-center justify-start '>
        <Outlet />
      </div>
    </div>
  )
}

export default Home
