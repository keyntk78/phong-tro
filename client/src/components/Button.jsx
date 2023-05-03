import React, { memo } from 'react'

const Button = ({ text, textColor, bgColor, IsIcon, onClick, fullWidth }) => {
  return (
    <button
      type='button'
      className={`rounded-md p-2 outline-none ${textColor} ${bgColor} flex items-center justify-center gap-1 hover:underline ${
        fullWidth && 'w-full'
      }`}
      onClick={onClick}
    >
      <span>{text}</span>
      {IsIcon && <span>{<IsIcon />}</span>}
    </button>
  )
}

export default memo(Button)
