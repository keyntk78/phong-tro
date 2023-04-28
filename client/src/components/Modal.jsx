import React, { useState, useEffect, memo } from 'react'
import icons from '../ultils/incons'
import { getCodes } from '../ultils/common/getCodes'

const { GrLinkPrevious } = icons

const Modal = ({ setIsShowModal, content, name, handleSubmit, queries, arrMinMax, defaultText }) => {
  const [persent1, setPersent1] = useState(
    name === 'price' && arrMinMax?.priceArr
      ? arrMinMax?.priceArr[0]
      : name === 'area' && arrMinMax?.areaArr
      ? arrMinMax?.areaArr[0]
      : 0
  )
  const [persent2, setPersent2] = useState(
    name === 'price' && arrMinMax?.priceArr
      ? arrMinMax?.priceArr[1]
      : name === 'area' && arrMinMax?.areaArr
      ? arrMinMax?.areaArr[1]
      : 100
  )
  const [activeEl, setActiveEl] = useState('')

  useEffect(() => {
    const activedTrackEl = document.getElementById('track-active')
    if (activedTrackEl) {
      if (persent2 <= persent1) {
        activedTrackEl.style.left = `${persent2}%`
        activedTrackEl.style.right = `${100 - persent1}%`
      } else {
        activedTrackEl.style.left = `${persent1}%`
        activedTrackEl.style.right = `${100 - persent2}%`
      }
    }
  }, [persent1, persent2])

  const handleClickTrack = (e, value) => {
    const stackEl = document.getElementById('track')
    const stackRect = stackEl.getBoundingClientRect()
    let percent = value ? value : Math.round(((e.clientX - stackRect.left) * 100) / stackRect.width, 0)
    setActiveEl('')
    if (Math.abs(percent - persent1) <= Math.abs(percent - persent2)) {
      setPersent1(percent)
    } else {
      setPersent2(percent)
    }
  }

  const convert100toTarget = (percent) => {
    return name === 'price'
      ? (Math.ceil(Math.round(percent * 1.5) / 5) * 5) / 10
      : name === 'area'
      ? Math.ceil(Math.round(percent * 0.9) / 5) * 5
      : 1
  }

  const convertTargetto100 = (percent) => {
    return name === 'price' ? Math.floor((percent / 15) * 100) : name === 'area' ? Math.floor(percent / 0.9) : 1
  }

  const handleChoosePrice = (code, min, max) => {
    if (+max === 1000000) {
      setPersent1(0)
      setPersent2(convertTargetto100(+max))
    } else if (+min === +max) {
      setPersent1(100)
      setPersent2(100)
    } else {
      setPersent1(convertTargetto100(+min))
      setPersent2(convertTargetto100(+max))
    }

    setActiveEl(code)
  }

  const handleBeforeSubmit = (e) => {
    let per1 = convert100toTarget(persent1)
    let per2 = convert100toTarget(persent2)
    if (name === 'price') {
      per1 = per1 * 1000000
      per2 = per2 * 1000000
    }
    if (per1 === per2) {
      if (persent1 < persent2) {
        per2 = per2 * 999
      } else {
        per1 = per1 * 999
      }
    }

    let arMinMax = persent1 < persent2 ? [per1, per2] : [per2, per1]

    handleSubmit(
      e,
      {
        [`${name}Number`]: arMinMax,
        [name]:
          persent1 < persent2
            ? `Từ ${convert100toTarget(persent1)} - ${convert100toTarget(persent2)} ${
                name === 'price' ? 'triệu' : 'm2'
              }`
            : `Từ ${convert100toTarget(persent2)} - ${convert100toTarget(persent1)} ${
                name === 'price' ? 'triệu' : 'm2'
              }`
      },
      { [`${name}Arr`]: [+persent1, +persent2] }
    )
  }

  return (
    <div
      onClick={(e) => {
        setIsShowModal(false)
      }}
      className='fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-overlay-30 '
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
          setIsShowModal(true)
        }}
        className='w-1/2 rounded-md bg-white'
      >
        <div className='flex h-[45px] items-center border-b border-gray-200 px-4'>
          <span
            className='cursor-pointer'
            onClick={(e) => {
              e.stopPropagation()
              setIsShowModal(false)
            }}
          >
            <GrLinkPrevious size={24} />
          </span>
        </div>
        {(name === 'category' || name === 'province') && (
          <div className='flex flex-col p-5'>
            <span className='flex gap-3 border-b py-3 text-[18px]'>
              <input
                type='radio'
                id='default'
                defaultValue={defaultText || ''}
                name={name}
                defaultChecked={!queries[`${name}Code`] ? true : false}
                onClick={(e) => handleSubmit(e, { [name]: null, [`${name}Code`]: null })}
              />
              <label htmlFor='default'>{defaultText}</label>
            </span>
            {content?.map((item) => {
              return (
                <span key={item.code} className='flex gap-3 border-b py-3 text-[18px]'>
                  <input
                    type='radio'
                    id={item.code}
                    defaultValue={item.code}
                    name={name}
                    defaultChecked={item.code === queries[`${name}Code`] ? true : false}
                    onClick={(e) => handleSubmit(e, { [name]: item.value, [`${name}Code`]: item.code })}
                  />
                  <label htmlFor={item.code}>{item.value}</label>
                </span>
              )
            })}
          </div>
        )}

        {(name === 'price' || name === 'area') && (
          <div className='px-12 py-20 '>
            <div className='relative flex flex-col items-center justify-center'>
              <div className='absolute top-[-60px] z-20 text-[20px] font-bold text-orange-600'>
                {persent1 === persent2
                  ? `Trên ${convert100toTarget(persent2)} ${name === 'price' ? 'triệu' : name === 'area' ? 'm2' : ''}`
                  : `Từ ${persent1 <= persent2 ? convert100toTarget(persent1) : convert100toTarget(persent2)} - ${
                      persent2 >= persent1 ? convert100toTarget(persent2) : convert100toTarget(persent1)
                    } ${name === 'price' ? 'triệu' : name === 'area' ? 'm2' : ''}`}
              </div>
              <div
                id='track'
                onClick={handleClickTrack}
                className='slider-track absolute bottom-0 top-0 h-[5px] w-full cursor-pointer rounded-full bg-gray-200'
              ></div>
              <div
                onClick={handleClickTrack}
                id='track-active'
                className='slider-track-active absolute bottom-0 top-0 h-[5px] cursor-pointer rounded-full bg-orange-600'
              ></div>
              <input
                type='range'
                min='0'
                step='1'
                max='100'
                className=' pointer-events-none absolute bottom-0 top-0 w-full appearance-none'
                value={persent1}
                onChange={(e) => {
                  setPersent1(+e.target.value)
                  setActiveEl('')
                }}
              />
              <input
                type='range'
                min='0'
                step='1'
                max='100'
                className='pointer-events-none absolute bottom-0 top-0 w-full appearance-none'
                value={persent2}
                onChange={(e) => {
                  setPersent2(+e.target.value)
                  setActiveEl('')
                }}
              />
              <div className='absolute left-0 right-0 top-6 z-20 flex items-center justify-between'>
                <span
                  className='cursor-pointer px-[10px]'
                  onClick={(e) => {
                    e.stopPropagation()
                    setPersent1(0)
                  }}
                >
                  0
                </span>
                <span
                  className='mr-[-5px] cursor-pointer'
                  onClick={(e) => {
                    e.stopPropagation()
                    setPersent2(100)
                  }}
                >
                  {name === 'price' ? '15 triệu+' : name === 'area' ? '90m2+' : ''}
                </span>
              </div>
            </div>
            <h3 className='mt-20 text-[18px] font-semibold'>Chọn nhanh</h3>
            <div className='mt-4 flex flex-wrap gap-1'>
              {content?.map((item) => {
                return (
                  <span
                    key={item.code}
                    onClick={() => handleChoosePrice(item.code, item.min, item.max)}
                    className={`cursor-pointer rounded-md px-4 py-1   ${
                      item.code === activeEl ? 'bg-secondary1 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {item.value}
                  </span>
                )
              })}
            </div>
          </div>
        )}
        {(name === 'price' || name === 'area') && (
          <button
            onClick={handleBeforeSubmit}
            className='w-full rounded-bl-md rounded-br-md bg-[#ffa500] p-3 text-[18px] font-semibold'
          >
            Áp dụng
          </button>
        )}
      </div>
    </div>
  )
}

export default memo(Modal)
