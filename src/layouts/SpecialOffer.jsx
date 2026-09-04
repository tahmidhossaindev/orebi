import React from 'react'
import Product from '@/components/Common/Product'
import Container from '@/components/Container'
import { useProductStore } from '@/store/useProductStore'

const SpecialOffer = ({ className }) => {
  const { products, isLoading, error } = useProductStore()
  const specialOfferProducts = products.slice(8, 12)

  return (
    <div className={`${className}`}>
      <Container>
        <h1 className='font-orebi font-bold text-[#262626] text-[39px] mb-11'>Special Offers</h1>

        {isLoading && specialOfferProducts.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="bg-[#F5F5F3] h-80 w-full mb-5.5 rounded-sm"></div>
                <div className="h-5 bg-[#E5E5E5] w-3/4 mb-2 rounded-sm"></div>
                <div className="h-4 bg-[#E5E5E5] w-1/3 rounded-sm"></div>
              </div>
            ))}
          </div>
        ) : error && specialOfferProducts.length === 0 ? (
          <div className="text-center py-6 font-orebi text-red-500">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {specialOfferProducts.map((product) => (
              <div key={product.id} className="w-full">
                <Product product={product} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default SpecialOffer