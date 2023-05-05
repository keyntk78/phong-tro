import React, { memo } from 'react'
import Slider from 'react-slick'

const SliderSlick = ({ images }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <div>
      <Slider {...settings}>
        {images?.length > 0 &&
          images.map((item, index) => {
            return (
              <div key={index} className='flex h-[320px] w-full items-center justify-center bg-black'>
                <img src={item} alt={`slide-${index}`} className='m-auto h-full  object-contain' />
              </div>
            )
          })}
      </Slider>
    </div>
  )
}

export default memo(SliderSlick)
