import React from 'react'
import { SearchItem } from '../../components/index'
import icons from '../../ultils/incons'

const { BsChevronRight, TbReportMoney, FaCropAlt, CiLocationOn, AiOutlineHome, FiSearch } = icons

const Search = () => {
  return (
    <div className='flex h-[55px] w-full items-center justify-around gap-2 rounded-[8px] bg-[#febb02] p-[10px]'>
      <SearchItem
        text={'Phòng trọ, nhà trọ'}
        fontWeight
        IconAffter={<BsChevronRight />}
        IconBefore={<AiOutlineHome />}
      />
      <SearchItem text={'Toàn quốc'} IconAffter={<BsChevronRight />} IconBefore={<CiLocationOn />} />
      <SearchItem text={'Chọn giá'} IconAffter={<BsChevronRight />} IconBefore={<TbReportMoney />} />
      <SearchItem text={'Chọn diện tích'} IconAffter={<BsChevronRight />} IconBefore={<FaCropAlt />} />
      <button
        className='flex w-full items-center justify-center gap-1 rounded-md bg-secondary1 px-4 py-2 font-medium text-white'
        type='button'
      >
        <FiSearch />
        Tìm kiếm
      </button>
    </div>
  )
}

export default Search
