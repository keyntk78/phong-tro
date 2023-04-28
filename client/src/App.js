import { Routes, Route } from 'react-router-dom'
import { Home, Homepage, Login, Rental, DetailPost, SearchPage } from './containers/Public'
import { path } from './ultils/constant'

function App() {
  return (
    <div className=' bg-primary'>
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
      </Routes>
    </div>
  )
}

export default App
