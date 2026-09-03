import React from 'react'
import Map from '../layouts/Map'
import Container from '@/components/Container'
import Button from '@/components/Common/Button'

const Contact = () => {
  return (
    <>
      <Container className={"py-30.5"}>
        <div className="titlePart mb-30">
          <h1 className="font-orebi font-bold text-[#262626] text-[49px]">Contacts</h1>
          <p className='tex-[12px] text-[#767676] font-orebi'>{`Home  >  Contacts`}</p>
        </div>

        <div className="formPart font-orebi">
          <h2 className='font-bold text-[39px] text-[#262626] mb-10.5'>Fill up a Form</h2>
          <form action="">
            <div className="Name w-150.25 border-b-2 border-[#D8D8D8]">
              <h3 className='font-bold text-[#262626] text-[18px]'>Name</h3>
              <input placeholder="Your name here" className="text-[16px] text-[#767676] font-orebi w-full h-17.75 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none" type="text" />
            </div>

            <div className="Email w-150.25 border-b-2 border-[#D8D8D8] mt-5.75 mb-5.75">
              <h3 className='font-bold text-[#262626] text-[18px]'>Email</h3>
              <input placeholder="Your email here" className="text-[16px] text-[#767676] font-orebi w-full h-17.75 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none" type="email" />
            </div>


            <div className="Message w-150.25 border-b-2 border-[#D8D8D8] mb-7.5">
              <h3 className='font-bold text-[#262626] text-[18px]'>Message</h3>
            <textarea name="Message" id="" placeholder='Your message here' className='text-[16px] text-[#767676] font-orebi w-full h-17.75 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none'></textarea>
            </div>

            <Button className={"px-25 hover:px-25"}>Post</Button>
          </form>


          {/* <input id="footerinputname" type="text" placeholder="Your Name">
            <input id="footerinputemail" type="email" placeholder="Your Email">
              <textarea id="footerinputmessage">Message</textarea> */}


        </div>

        <Map />

      </Container>

    </>
  )
}

export default Contact