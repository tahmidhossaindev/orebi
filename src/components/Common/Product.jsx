import React from 'react'
import Image from './Image'
import Badge from './Badge'
import { FaShoppingCart } from "react-icons/fa";
import Flex from '../Flex'
import { FaHeart } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";

const Product = ({productImage, badgeT, productName, productPrice, productCategory}) => {
  return (
  <>


  <div className="relative mb-5.5 group">
    <Image imageSrc={productImage}/>
    <Badge badgeText={`${badgeT}`} className={"absolute top-3 left-3"}/>

    {/* hover part  */}
   <div className="absolute bg-white  bottom-0 left-0 w-full pr-7 py-6 font-orebi opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-400 ease-in-out">
  
        <div className="flex gap-x-2 justify-end space-y-6">
            <h3 className=' text-[#767676] text-[16px]' >Add to Wishlist</h3>
            <FaHeart className='font-bold text-[#262626] text-[16px]'/>
        </div>
        
          <div className="flex gap-x-2 justify-end space-y-6">
            <h3 className=' text-[#767676] text-[16px]'>Compare</h3>
            <LuRefreshCcw className='font-bold text-[#262626] text-[16px]'/>
        </div>
       
          <div className="flex gap-x-2 justify-end space-y-6">
            <h3 className='font-bold text-[#262626] text-[16px]'>Add to Cart</h3>
            <FaShoppingCart className='font-bold text-[#262626] text-[16px]' />
        </div>



   </div>


  </div>
  
{/* textpart  */}

   <div className="flex justify-between font-orebi mb-3.75">
        <h3 className='font-bold text-[20px] text-[#262626]'>{productName}</h3>
        <p className='text-[16px] text-[#767676] height-[30px]'>{productPrice}</p>
    </div>
    <p className='text-[16px] text-[#767676] height-[30px]'>{productCategory}</p>


  </>
  )
}

export default Product