import { Card, Skeleton } from '@nextui-org/react'
import React from 'react'

function ImageSkelton() {
  return (
    <Skeleton className="rounded-lg w-unit-8xl h-48">
      <div className="h-24 rounded-lg bg-default-300"></div>
    </Skeleton>
  )
}

export default ImageSkelton