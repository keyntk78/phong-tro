import React, { memo } from 'react'

const SearchItem = ({ IconBefore, IconAffter, fontWeight, text }) => {
  return (
    <div className='flex  items-center justify-between rounded-md bg-white px-4 py-2 text-gray-400'>
      <div className='flex w-full items-center gap-1'>
        {IconBefore}{' '}
        <span
          className={`${
            fontWeight && 'font-medium text-black'
          } w-[150px] overflow-hidden text-ellipsis whitespace-nowrap`}
        >
          {text}
        </span>
      </div>
      <div>{IconAffter}</div>
    </div>
  )
}

export default memo(SearchItem)
