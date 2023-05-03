import icons from './incons'

const { BsFillPlusSquareFill, FaUserAlt, BsFillFileEarmarkPostFill, AiFillPhone } = icons

const menuSidebar = [
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
    text: 'Sữa Thông tin cá nhân',
    path: '/he-thong/sua-thong-tin-ca-nhan',
    icon: <FaUserAlt />
  },
  {
    id: 4,
    text: 'Liên hệ',
    path: '/he-thong/lien-he',
    icon: <AiFillPhone />
  }
]

export default menuSidebar
