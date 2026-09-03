import Product from '@/components/Common/Product'
import Container from '@/components/Container'
import Flex from '@/components/Flex'
import React from 'react'
import productImageOne from '/src/assets/productImageOne.png'

const BestSeller = () => {
  return (
  <>
  <div className="py-20">
    <Container>
        <h1 className='font-orebi font-bold text-[#262626] text-[39px] mb-11'>Our Bestsellers</h1>
        <Flex className={"gap-x-10"}>
            <div className="w-1/4">
            <Product productImage={productImageOne} badgeT={"New"} productName={"Basic Crew Neck Tee"} productPrice={"$44.00"} productCategory={"Black"}/>
            </div>
            
            <div className="w-1/4">
          <Product productImage={productImageOne} badgeT={"New"} productName={"Basic Crew Neck Tee"} productPrice={"$44.00"} productCategory={"Black"}/>
            </div>
            
            <div className="w-1/4">
         <Product productImage={productImageOne} badgeT={"New"} productName={"Basic Crew Neck Tee"} productPrice={"$44.00"} productCategory={"Black"}/>
            </div>
            
            <div className="w-1/4">
          <Product productImage={productImageOne} badgeT={"New"} productName={"Basic Crew Neck Tee"} productPrice={"$44.00"} productCategory={"Black"}/>
            </div>

        </Flex>
    </Container>
  </div>
  </>
  )
}

export default BestSeller