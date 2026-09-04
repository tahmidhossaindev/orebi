import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { LuRefreshCcw } from 'react-icons/lu'
import Button from '@/components/Common/Button'
import Badge from '@/components/Common/Badge'
import { useCartStore } from '@/store/useCartStore'

const ProductListItem = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart)
  const [isAdded, setIsAdded] = useState(false)

  const id = product?.id
  const name = product?.title || 'Product'
  const image = product?.thumbnail || product?.images?.[0] || ''
  const price = typeof product?.price === 'number' ? product.price : 0
  const category = product?.category || ''
  const brand = product?.brand || ''
  const description = product?.description || ''
  const badgeText = product?.discountPercentage
    ? `-${Math.round(product.discountPercentage)}%`
    : null

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        title: name,
        price: price,
        thumbnail: image,
        category: category,
      },
      1
    )
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1200)
  }

  const productLink = id ? `/product/${id}` : '#'

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center border border-[#F0F0F0] p-4 sm:p-6 mb-6 font-orebi bg-white hover:shadow-md transition-shadow">
      {/* Product Image */}
      <Link
        to={productLink}
        className="relative w-full sm:w-52 md:w-60 h-52 sm:h-52 md:h-60 bg-[#F5F5F3] flex items-center justify-center p-4 flex-shrink-0 overflow-hidden mb-4 sm:mb-0 group block"
      >
        <img
          src={image}
          alt={name}
          className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
        />
        {badgeText && (
          <Badge badgeText={badgeText} className="absolute top-3 left-3 z-10" />
        )}
      </Link>

      {/* Product Info & Details */}
      <div className="flex-1 sm:pl-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
          <h3 className="font-bold text-[20px] text-[#262626] hover:text-black">
            <Link to={productLink} className="hover:underline underline-offset-2">
              {name}
            </Link>
          </h3>
          <span className="font-bold text-[18px] text-[#262626]">
            ${price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-x-4 text-[14px] text-[#767676] mb-3 capitalize">
          <span>Category: <strong className="text-[#262626]">{category}</strong></span>
          {brand && <span>Brand: <strong className="text-[#262626]">{brand}</strong></span>}
        </div>

        <p className="text-[14px] text-[#767676] line-clamp-2 md:line-clamp-3 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-4">
          <Button
            onClick={handleAddToCart}
            className="px-6 py-2.5 text-[14px] hover:px-7 hover:py-3 hover:text-[15px] flex items-center gap-x-2"
          >
            <FaShoppingCart className="text-[14px]" />
            <span>{isAdded ? 'Added to Cart' : 'Add to Cart'}</span>
          </Button>

          <button
            className="flex items-center gap-x-2 text-[14px] text-[#767676] hover:text-[#262626] cursor-pointer transition-colors px-2 py-1"
            title="Add to Wishlist"
          >
            <FaHeart />
            <span>Wishlist</span>
          </button>

          <button
            className="flex items-center gap-x-2 text-[14px] text-[#767676] hover:text-[#262626] cursor-pointer transition-colors px-2 py-1"
            title="Compare"
          >
            <LuRefreshCcw />
            <span>Compare</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductListItem
