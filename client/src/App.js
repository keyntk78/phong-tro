import React, { useEffect } from 'react'

import { Routes, Route } from 'react-router-dom'
import { Home, Homepage, Login, Rental, DetailPost, SearchPage } from './containers/Public'
import { System, CreatePost, ManagePost } from './containers/System'
import { useDispatch, useSelector } from 'react-redux'

import { path } from './ultils/constant'
import * as actions from './store/actions'

function App() {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state) => state.auth)
  useEffect(() => {
    dispatch(actions.getPrices())
    dispatch(actions.getAreas())
    dispatch(actions.getProvinces())
  }, [])

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrentUser())
    }, 500)
  }, [isLoggedIn])

  return (
    <div className=''>
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path='' element={<Homepage />} />
          <Route path={path.HOME_PAGE} element={<Homepage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.DETAIL_POST_TITLE_POSTID} element={<DetailPost />} />
          <Route path={path.SEARCH} element={<SearchPage />} />
        </Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
