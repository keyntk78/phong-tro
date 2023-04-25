import React, { useEffect } from 'react'
import { ItemSmall } from './index'
import { useDispatch, useSelector } from 'react-redux'
import * as action from '../store/actions'

const RelatePost = () => {
  const dispatch = useDispatch()
  const { newPosts } = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(action.getNewPosts())
  }, [])

  return (
    <div className='rounded-md bg-white px-4  py-4 shadow-md'>
      <h3 className='mb-2 text-xl font-semibold'>Tin mới đăng</h3>
      {newPosts?.map((item) => {
        return (
          <ItemSmall
            key={item.id}
            title={item.title}
            price={item.attribute.price}
            image={JSON.parse(item?.images?.image)}
            id={item.id}
            slug={item.slug}
            createdAt={item.createdAt}
          />
        )
      })}

      {/* <ItemSmall /> */}
    </div>
  )
}

export default RelatePost
