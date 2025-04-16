import MaxWidthWrapper from '@/app/components/defaults/MaxWidthWrapper'
import SendOffer from '@/app/components/forms/SendOffer'
import React from 'react'

const page = ({searchParams}: {searchParams: any}) => {
  return (
    <div>
      <SendOffer userId={searchParams.userId}/>
    </div>
  )
}

export default page
