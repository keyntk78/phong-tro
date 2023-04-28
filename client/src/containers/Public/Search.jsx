import React, { useEffect, useState } from 'react'
import { SearchItem, Modal } from '../../components/index'
import icons from '../../ultils/incons'
import { useSelector } from 'react-redux'
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom'
import { path } from '../../ultils/constant'
const { BsChevronRight, TbReportMoney, FaCropAlt, CiLocationOn, AiOutlineHome, FiSearch } = icons

const Search = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [isShowModal, setIsShowModal] = useState(false)
  const [content, setContent] = useState([])
  const { categories, prices, areas, provinces } = useSelector((state) => state.app)
  const [name, setName] = useState('')
  const [arrMinMax, setArrMinMax] = useState({})
  const [defaultText, setDefaultText] = useState('')

  const handleShowModal = (content, name, defaultText) => {
    setContent(content)
    setName(name)
    setIsShowModal(true)
    setDefaultText(defaultText)
  }

  const [queries, setQueries] = useState({})

  useEffect(() => {
    if (!location.pathname.includes(path.SEARCH)) {
      setArrMinMax({})
      setQueries({})
    }
  }, [location])

  const handleSubmit = (e, query, arrMinMax) => {
    e.stopPropagation()
    setQueries((prev) => ({ ...prev, ...query }))
    setIsShowModal(false)
    arrMinMax && setArrMinMax((pre) => ({ ...pre, ...arrMinMax }))
  }

  const handleSearch = () => {
    const queryCode = Object.entries(queries)
      .filter((item) => item[0].includes('Code') || item[0].includes('Number'))
      .filter((item) => item[1])
    let queryObject = {}

    queryCode.forEach((item) => {
      queryObject[item[0]] = item[1]
    })

    const queryText = Object.entries(queries).filter((item) => !item[0].includes('Code') || !item[0].includes('Number'))
    let queryTextObject = {}
    queryText.forEach((item) => {
      queryTextObject[item[0]] = item[1]
    })

    let titleSearch = `${queryTextObject.category ? queryTextObject.category : 'Tìm tất cả bất động sản'} ${
      queryTextObject.province ? queryTextObject.province : 'toàn quốc'
    } ${queryTextObject.price ? 'giá ' + queryTextObject.price.toLowerCase() + ' đồng' : ''}  ${
      queryTextObject.area ? 'diện tích ' + queryTextObject.area.toLowerCase() : ''
    }`

    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams(queryObject).toString()
      },
      { state: { titleSearch } }
    )
  }

  return (
    <>
      <div className='flex h-[55px] w-full items-center justify-around gap-2 rounded-[8px] bg-[#febb02] p-[10px]'>
        <span
          className='cursor-pointer'
          onClick={() => handleShowModal(categories, 'category', 'Tìm tất cả bất động sản')}
        >
          <SearchItem
            text={queries.category}
            defaltText='Tìm tất cả bất động sản'
            IconAffter={<BsChevronRight />}
            IconBefore={<AiOutlineHome />}
          />
        </span>
        <span className='cursor-pointer' onClick={() => handleShowModal(provinces, 'province', 'Toàn quốc')}>
          <SearchItem
            text={queries.province}
            defaltText='Toàn quốc'
            IconAffter={<BsChevronRight />}
            IconBefore={<CiLocationOn />}
          />
        </span>
        <span className='cursor-pointer' onClick={() => handleShowModal(prices, 'price', 'Chọn giá')}>
          <SearchItem
            text={queries.price}
            defaltText='Chọn giá'
            IconAffter={<BsChevronRight />}
            IconBefore={<TbReportMoney />}
          />
        </span>
        <span className='cursor-pointer' onClick={() => handleShowModal(areas, 'area', 'Chọn diện tích')}>
          <SearchItem
            text={queries.area}
            defaltText='Chọn diện tích'
            IconAffter={<BsChevronRight />}
            IconBefore={<FaCropAlt />}
          />
        </span>
        <button
          className='flex w-full items-center justify-center gap-1 rounded-md bg-secondary1 px-4 py-2 font-medium text-white'
          type='button'
          onClick={handleSearch}
        >
          <FiSearch />
          Tìm kiếm
        </button>
      </div>
      {isShowModal && (
        <Modal
          queries={queries}
          handleSubmit={handleSubmit}
          setIsShowModal={setIsShowModal}
          content={content}
          name={name}
          arrMinMax={arrMinMax}
          defaultText={defaultText}
        />
      )}
    </>
  )
}

export default Search
