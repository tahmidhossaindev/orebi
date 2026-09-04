import React from 'react'
import Container from '../components/Container'
import Button from '../components/Common/Button'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <>
      <Container>
        <div className="py-10.75">
          <h1 className="text-[#262626] font-orebi text-[200px] font-bold">404</h1>
          <p className="pb-12.5 text-[#767676] text-[18px] leading-7.5 font-orebi pr-157.5 ">The page you were looking for couldn't be found. The page could be removed or you misspelled the word while searching for it. Maybe try a search?</p>

          <div className="search w-150.25 pb-12.5">
            <input placeholder="Type to search" className="text-[18px] text-[#767676] font-orebi bg-white px-5 w-full h-17.75 outline-[#C4C4C4] border-[#C9C9C9] border-2" type="text" />
          </div>

          <Link to={"/"}> <Button>Back To Home</Button> </Link>


        </div>

      </Container>

    </>
  )
}

export default Error