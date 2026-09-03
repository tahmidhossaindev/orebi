import React from 'react'
import Banner from '../layouts/Banner'
import Container from '@/components/Container'

const Home = () => {
  return (
    <>
    <Banner/>
    <div className="bg-white border-2 border-[#F0F0F0] py-7">
      <Container>
      <div className="flex justify-between">

        <div className="flex gap-x-3.75">
          <h3>2</h3>
          <p>Two years warranty</p>
        </div>
       
        <div className="flex gap-x-3.75">
          <h3>2</h3>
          <p>Two years warranty</p>
        </div>
       
        <div className="flex gap-x-3.75">
          <h3>2</h3>
          <p>Two years warranty</p>
        </div>


      </div>
      </Container>
    </div>
    </>
  )
}

export default Home