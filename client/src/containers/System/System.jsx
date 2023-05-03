import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { Header, Sidebar } from './index'
import * as action from '../../store/actions'

const System = () => {
  const dispatch = useDispatch()

  const { isLoggedIn } = useSelector((state) => state.auth)

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(action.getCurrentUser())
    }, 500)
  }, [isLoggedIn])

  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />
  return (
    <div className='h-screen overflow-hidden'>
      <Header />
      <div className='grid h-screen grid-cols-12'>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default System
