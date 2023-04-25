/* eslint-disable prettier/prettier */
import React, { memo } from 'react'
import { text } from '../ultils/dataIntroFooter'
import icons from '../ultils/incons'
import { Button } from './index'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const { AiFillStar } = icons
const IntroFooter = () => {
  const { categories } = useSelector((state) => state.app)

  return (
    <div className=' mx-auto flex max-w-1100 flex-col items-center justify-center rounded-md bg-white px-20 py-10 shadow-md'>
      <h3 className='text-xl font-semibold'>{text.title}</h3>
      <p className='mt-4 text-center text-[15px] font-medium text-[#333] '>
        {text.description}
        <span>
          {categories?.length > 0 &&
            categories.map((item) => {
              return (
                <Link key={item.code} to={item.slug} className='text-blue-800 hover:text-red-600'>
                  {`${item.value.toLowerCase()}, `}
                </Link>
              )
            })}
        </span>
        {text.description2}
      </p>
      <div className='mt-4 grid grid-cols-4 gap-[80px]'>
        {text.statistics.map((item, index) => {
          return (
            <div className='col-span-1 text-center' key={index}>
              <h3 className='text-xl font-semibold'>{item.value}</h3>
              <span>{item.name}</span>
            </div>
          )
        })}
      </div>
      <h3 className='mt-6 text-xl font-semibold'>{text.priceTittle}</h3>
      <span className='mt-4 flex gap-1'>
        <AiFillStar size={25} className='text-[#ffd453]' />
        <AiFillStar size={25} className='text-[#ffd453]' />
        <AiFillStar size={25} className='text-[#ffd453]' />
        <AiFillStar size={25} className='text-[#ffd453]' />
        <AiFillStar size={25} className='text-[#ffd453]' />
      </span>
      <p className='pt-4 text-center text-[15px] italic text-[#333]'>{text.comment}</p>
      <h3 className='mt-6 text-xl font-semibold'>{text.question}</h3>
      <p className='mb-4 mt-4 text-[15px] text-[#333]'>{text.answer}</p>

      <Button text='Đăng tin mới' textColor='text-white' bgColor='bg-secondary2' />
    </div>
  )
}

export default memo(IntroFooter)
