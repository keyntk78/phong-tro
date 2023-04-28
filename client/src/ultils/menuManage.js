import icons from './incons'

const { BsFillPlusSquareFill, FaUserAlt, BsFillFileEarmarkPostFill } = icons

const menuManage = [
  {
    id: 1,
    text: 'Đăng tin cho thuê',
    path: '/system/create-new',
    icon: <BsFillPlusSquareFill />
  },
  {
    id: 2,
    text: 'Quản lý tin đăng',
    path: '/system/manage-post',
    icon: <BsFillFileEarmarkPostFill />
  },
  {
    id: 3,
    text: 'Thông tin tài khoản',
    path: '/system/profile',
    icon: <FaUserAlt />
  }
]

export default menuManage
