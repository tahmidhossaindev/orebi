import Container from '@/components/Container'
import Flex from '@/components/Flex'
import React from 'react'
import aboutImageOne from '/src/assets/aboutImageOne.png'
import aboutImageTwo from '/src/assets/aboutImageTwo.png'
import Image from '@/components/Common/Image'

const About = () => {
  return (
    <>
      <Container className={"py-30.5"}>

        {/* title  */}

        <div className="titlePart mb-30">
          <h1 className="font-orebi font-bold text-[#262626] text-[49px]">About</h1>
          <p className='tex-[12px] text-[#767676] font-orebi'>{`Home  >  About`}</p>
        </div>


        {/* Cards  */}

        <Flex className={"gap-x-10"}>
          <div className="cardOne">
            <Image imageSrc={aboutImageOne} className={"w-full"} />
          </div>

          <div className="cardTwo">
            <Image imageSrc={aboutImageTwo} className={"w-full"} />
          </div>


        </Flex>


        <h3 className='font-orebi text-[32px] text-[#262626] height-[52px] mt-33.5 mb-33.5'>Orebi is one of the world’s leading ecommerce brands and is internationally recognized for celebrating the essence of classic Worldwide cool looking style.</h3>


        {/* description  */}

        <div className="flex gap-x-4">

          <div className="">
            <h3 className='font-orebi text-[25px] font-bold text-[#262626] mb-2.75'>Our Vision</h3>
            <p className='font-orebi text-[16px] text-[#767676] height-[30px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an   printer took a galley of type and scrambled it to make a type specimen book.</p>


          </div>

          <div className="">
            <h3 className='font-orebi text-[25px] font-bold text-[#262626] mb-2.75'>Our Story</h3>
            <p className='font-orebi text-[16px] text-[#767676] height-[30px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic.</p>


          </div>

          <div className="">
            <h3 className='font-orebi text-[25px] font-bold text-[#262626] mb-2.75'>Our Brands</h3>
            <p className='font-orebi text-[16px] text-[#767676] height-[30px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>


          </div>


        </div>

      </Container>

    </>
  )
}

export default About