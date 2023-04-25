import React, { useEffect } from 'react'
import { Button, Item } from '../../components/index'
import { getPaginationPosts } from '../../store/actions/post'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const List = () => {
  const dispatch = useDispatch()
  const { posts } = useSelector((state) => state.posts)

  const [searchParams] = useSearchParams()

  useEffect(() => {
    let params = []
    for (let entry of searchParams.entries()) {
      params.push(entry)
    }

    let searchParamObject = []
    params?.map((i) => (searchParamObject = { ...searchParamObject, [i[0]]: i[1] }))
    dispatch(getPaginationPosts(searchParamObject))
  }, [searchParams])

  return (
    <div className='col-span-8 rounded-md bg-white px-4 py-4 shadow-md'>
      <div className='flex items-center justify-between'>
        <h3 className='text-xl font-semibold'>Danh sách tin đăng</h3>
        <span className='text-[16px]'>Cập nhật: 00:25 20/04/2023</span>
      </div>
      <div className='my-2 flex items-center gap-2'>
        <span>Sắp xếp:</span>
        <Button text={'Mặc định'} bgColor={'bg-gray-200'} />
        <Button text={'Mới nhất'} bgColor={'bg-gray-200'} />
      </div>
      <div>
        {posts?.length > 0 &&
          posts.map((item) => {
            return (
              <Item
                key={item.id}
                images={JSON.parse(item?.images?.image)}
                title={item?.title}
                price={item?.attribute?.price}
                acreage={item?.attribute?.acreage}
                address={item?.address}
                description={JSON.parse(item?.description)}
                name={item?.user?.name}
                zalo={item?.user?.zalo}
                phone={item?.user?.phone}
                star={+item?.star}
                id={item?.id}
                slug={item?.slug}
              />
            )
          })}
      </div>
    </div>
  )
}

export default List
