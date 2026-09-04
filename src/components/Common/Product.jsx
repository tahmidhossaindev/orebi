import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Image from './Image'
import Badge from './Badge'
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import { useCartStore } from '../../store/useCartStore';

const Product = ({ product, productImage, badgeT, productName, productPrice, productCategory }) => {
  const addToCart = useCartStore((state) => state.addToCart)
  const [isAdded, setIsAdded] = useState(false)

  const id = product?.id
  const name = product?.title || productName || 'Product'
  const image = product?.thumbnail || product?.images?.[0] || productImage
  const rawPrice = product?.price !== undefined
    ? product.price
    : (typeof productPrice === 'string' ? parseFloat(productPrice.replace(/[^0-9.]/g, '')) : productPrice) || 0
  const formattedPrice = typeof rawPrice === 'number' ? `$${rawPrice.toFixed(2)}` : productPrice
  const category = product?.category || productCategory || ''
  const badgeText = badgeT !== undefined 
    ? badgeT 
    : (product?.discountPercentage ? `-${Math.round(product.discountPercentage)}%` : 'New')

  const handleAddToCart = (e) => {
    e.stopPropagation()
    const productToAdd = {
      id: id || name,
      title: name,
      price: rawPrice,
      thumbnail: image,
      category: category,
    }
    addToCart(productToAdd, 1)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1200)
  }

  const productLink = id ? `/product/${id}` : '#'

  return (
    <>
      <div className="relative mb-5.5 group overflow-hidden bg-[#F5F5F3]">
        <Link to={productLink} className="block w-full h-80 p-4">
          <div className="w-full h-full flex items-center justify-center">
            <Image
              imageSrc={image}
              imageAlt={name}
              className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {badgeText && (
          <Badge badgeText={`${badgeText}`} className={"absolute top-3 left-3 z-10"} />
        )}

        {/* hover part */}
        <div className="absolute bg-white bottom-0 left-0 w-full pr-7 py-6 font-orebi opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-400 ease-in-out z-20">
          <div className="flex gap-x-2 justify-end space-y-6 items-center cursor-pointer">
            <h3 className='text-[#767676] text-[16px] hover:underline underline-offset-4 hover:text-[#262626] transition-colors'>
              Add to Wishlist
            </h3>
            <FaHeart className='font-bold text-[#262626] text-[16px]' />
          </div>

          <div className="flex gap-x-2 justify-end space-y-6 items-center cursor-pointer">
            <h3 className='text-[#767676] text-[16px] hover:underline underline-offset-4 hover:text-[#262626] transition-colors'>
              Compare
            </h3>
            <LuRefreshCcw className='font-bold text-[#262626] text-[16px]' />
          </div>

          <div
            onClick={handleAddToCart}
            className="flex gap-x-2 justify-end space-y-6 items-center cursor-pointer"
          >
            <h3 className='font-bold text-[#262626] text-[16px] hover:underline underline-offset-4 transition-colors'>
              {isAdded ? 'Added to Cart' : 'Add to Cart'}
            </h3>
            <FaShoppingCart className={`font-bold text-[#262626] text-[16px] transition-all ${isAdded ? 'scale-125 text-emerald-600' : ''}`} />
          </div>
        </div>
      </div>

      {/* text part */}
      <div className="flex justify-between items-baseline font-orebi mb-2">
        <h3 className='font-bold text-[18px] lg:text-[20px] text-[#262626] truncate max-w-[65%]' title={name}>
          <Link to={productLink} className="hover:text-black hover:underline underline-offset-2">
            {name}
          </Link>
        </h3>
        <p className='text-[16px] text-[#767676] font-normal'>{formattedPrice}</p>
      </div>
      <p className='text-[16px] text-[#767676] capitalize font-orebi'>{category}</p>
    </>
  )
}

export default Product