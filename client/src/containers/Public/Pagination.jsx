import React, { useEffect, useState } from 'react'
import { PaginationItem } from '../../components'
import { useSelector } from 'react-redux'
import icons from '../../ultils/incons'

const { AiOutlineDoubleRight, AiOutlineDoubleLeft } = icons

const Pagination = ({ page }) => {
  const { count, posts } = useSelector((state) => state.posts)
  const [arrPages, setArrPage] = useState([])
  const [currentPage, setCurrentPage] = useState(+page || 1)
  const [isHideEnd, setIsHideEnd] = useState(false)
  const [isHideStart, setIsHideStart] = useState(false)

  useEffect(() => {
    let maxPage = Math.floor(count / posts.length)
    let end = currentPage + 1 > maxPage ? maxPage : currentPage + 1
    let start = currentPage - 1 <= 0 ? 1 : currentPage - 1

    let temp = []
    for (let i = start; i <= end; i++) {
      temp.push(i)
    }

    currentPage >= maxPage - 1 ? setIsHideEnd(true) : setIsHideEnd(false)

    currentPage <= 2 ? setIsHideStart(true) : setIsHideStart(false)

    setArrPage(temp)
  }, [count, posts, currentPage])

  return (
    <div className='flex items-center justify-center gap-2'>
      {!isHideStart && (
        <PaginationItem icon={<AiOutlineDoubleLeft />} setCurrentPage={setCurrentPage} number={1} type='start' />
      )}
      {!isHideStart && <PaginationItem setCurrentPage={setCurrentPage} number={'...'} />}
      {arrPages.length > 0 &&
        arrPages.map((item) => {
          return <PaginationItem key={item} number={item} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        })}
      {!isHideEnd && <PaginationItem setCurrentPage={setCurrentPage} number={'...'} />}
      {!isHideEnd && (
        <PaginationItem
          icon={<AiOutlineDoubleRight />}
          setCurrentPage={setCurrentPage}
          number={Math.floor(count / posts.length)}
        />
      )}
    </div>
  )
}

export default Pagination
