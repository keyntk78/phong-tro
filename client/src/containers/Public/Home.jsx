import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { Search, Navigation } from './index'
import { IntroFooter, ContactFooter } from '../../components'

const Home = () => {
  return (
    <div className='h-full w-full'>
      <Header />
      <Navigation />
      <div className='mx-auto mt-4 flex w-1100 flex-col items-center justify-center'>
        <Search />
      </div>

      <div className='mx-auto mt-4 flex max-w-1100 items-start justify-start pb-[100px]'>
        <Outlet />
      </div>
      <div className=''>
        <IntroFooter />
        <ContactFooter />
      </div>
      <div className='h-28'></div>
    </div>
  )
}

export default Home
