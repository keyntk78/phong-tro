import React from 'react'

import { ColorRing } from 'react-loader-spinner'

const Loading = () => {
  return (
    <ColorRing
      visible={true}
      height='80'
      width='80'
      ariaLabel='blocks-loading'
      wrapperStyle={{}}
      wrapperClass='blocks-wrapper'
      colors={['#1653dd', '#1653dd', '#1653dd', '#1653dd', '#1653dd']}
    />
  )
}

export default Loading
