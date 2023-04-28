import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { Search, Navigation } from './index'
import { IntroFooter, ContactFooter } from '../../components'
import * as action from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state) => state.auth)
  useEffect(() => {
    dispatch(action.getPrices())
    dispatch(action.getAreas())
    dispatch(action.getProvinces())
  }, [])

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(action.getCurrentUser())
    }, 500)
  }, [isLoggedIn])

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
