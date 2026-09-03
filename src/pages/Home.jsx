import React from 'react'
import Banner from '../layouts/Banner'
import Container from '@/components/Container'
import { FaTruck } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import Flex from '@/components/Flex';
import Image from '@/components/Common/Image';
import adOne from '/src/assets/adOne.jpg'
import adTwo from '/src/assets/adTwo.png'
import adThree from '/src/assets/adThree.jpg'
import longAd from '/src/assets/longAd.png'
import Badge from '@/components/Common/Badge';
import NewArrival from '@/layouts/NewArrival';
import BestSeller from '@/layouts/BestSeller';

const Home = () => {
  return (
    <>
    <Banner/>

{/* -----------Points part */}


    <div className="bg-white border-2 border-[#F0F0F0] py-7">
      <Container>
      <div className="flex justify-between font-orebi">

        <div className="flex gap-x-3 items-center">
          <h3 className='text-[#262626] font-bold text-[24px]'>2</h3>
          <p className='text-[16px] text-[#6D6D6D]'>Two years warranty</p>
        </div>
       
        <div className="flex gap-x-3 items-center">
          <FaTruck className='text-[#262626] font-bold text-[24px]' />
          <p className='text-[16px] text-[#6D6D6D]'>Free shipping</p>
        </div>
       
        <div className="flex gap-x-2.5 items-center">
          <MdRefresh className='text-[#262626] font-bold text-[24px]' />
          <p className='text-[16px] text-[#6D6D6D]'>Return policy in 30 days</p>
        </div>


      </div>
      </Container>
    </div>

{/* sales part  */}
  

<Container className={"pt-35"}>
  <Flex className={"gap-x-10"}>

    <div className="">
      <Image imageSrc={adOne} className={"w-full"}/>
    </div>    

    <div className="">
      <Image imageSrc={adTwo} className={"w-full mb-8.75"}/>
      <Image imageSrc={adThree} className={"w-full"}/>
    </div>

  </Flex>
</Container>


{/* New arrivals */}
<NewArrival/>


{/*Best Seller */}
<BestSeller/>

{/* Long Ad  */}
<Container>




<div className="py-35">
  <Image imageSrc={longAd}/>
</div>

</Container>


{/* New arrivals */}
<NewArrival/>


    </>
  )
}

export default Home