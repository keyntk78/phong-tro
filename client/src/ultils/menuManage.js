import icons from './incons'

const { BsFillPlusSquareFill, FaUserAlt, BsFillFileEarmarkPostFill } = icons

const menuManage = [
  {
    id: 1,
    text: 'Đăng tin cho thuê',
    path: '/he-thong/tao-moi-bai-dang',
    icon: <BsFillPlusSquareFill />
  },
  {
    id: 2,
    text: 'Quản lý tin đăng',
    path: '/he-thong/quan-ly-bai-dang',
    icon: <BsFillFileEarmarkPostFill />
  },
  {
    id: 3,
    text: 'Thông tin tài khoản',
    path: '/he-thong/sua-thong-tin-ca-nhan',
    icon: <FaUserAlt />
  }
]

export default menuManage
