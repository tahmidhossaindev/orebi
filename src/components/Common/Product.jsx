import React from 'react'
import Image from './Image'
import Badge from './Badge'

const Product = ({productImage, badgeT, productName, productPrice, productCategory}) => {
  return (
  <>
  <div className="relative mb-5.5">
    <Image imageSrc={productImage}/>
    <Badge badgeText={`${badgeT}`} className={"absolute top-3 left-3"}/>
   
  </div>
   <div className="flex justify-between font-orebi mb-3.75">
        <h3 className='font-bold text-[20px] text-[#262626]'>{productName}</h3>
        <p className='text-[16px] text-[#767676] height-[30px]'>{productPrice}</p>
    </div>
    <p className='text-[16px] text-[#767676] height-[30px]'>{productCategory}</p>

  </>
  )
}

export default Product