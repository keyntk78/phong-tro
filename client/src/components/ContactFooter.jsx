import React from 'react'
import { text } from '../ultils/dataContactFooter'
import { Button } from './index'

const ContactFooter = () => {
  return (
    <div className='mx-auto mt-10 flex max-w-1100 flex-col items-center justify-center gap-6 rounded-md bg-white px-20 py-10 shadow-md'>
      <img src={text.image} alt='img-contact' className='h-48 w-full object-contain' />
      <h4 className='text-[15px] text-blue-800'>{text.content}</h4>
      <div className='grid grid-cols-3 gap-[100px]'>
        {text.contact.length > 0 &&
          text.contact.map((item, index) => {
            return (
              <div key={index} className='flex flex-col items-center justify-center'>
                <span className='text-[18px] font-medium text-red-600'>{item.name}</span>
                <span className='text-xl font-semibold text-blue-800'>Điện thoại: {item.phone}</span>
                <span className='text-xl font-semibold text-blue-800'>Zalo: {item.zalo}</span>
              </div>
            )
          })}
      </div>
      <Button text='Gửi liên hệ' textColor='text-white' bgColor='bg-secondary1' />
    </div>
  )
}

export default ContactFooter
