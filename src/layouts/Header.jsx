import React, { useRef } from 'react'
import Container from '../components/Container'
import Flex from '../components/Flex'
import { Link } from 'react-router-dom'
import Image from '../components/Common/Image'
import Logo from '/src/assets/logo.png'
import { FaBars } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { MdArrowDropDownCircle } from "react-icons/md";



const Header = () => {

    let dropRef = useRef(null)

    let handleDrop = ()=>{
        if (dropRef.current.style.display == 'block') {
            dropRef.current.style.display = 'none'
        } else {
            dropRef.current.style.display = 'block'
        }
    }


    return (
        <>

            {/* main menu */}

            <section >
                <Container>
                    <div className="py-7">
                        <Flex className={""}>
                            <div className="logo">
                                <Link to={"/"}>
                                    <Image className={"w-full"} imageSrc={Logo} imageAlt={"Logo.png"} />
                                </Link>
                            </div>
                            <div className="menu ml-112.5">
                                <ul className="flex gap-x-7.75 text-[#767676] font-orebi text-[14px]">
                                    <li className="hover:text-[#262626] hover:text-[16px] ease-in-out hover:font-bold duration-200"><Link to={"/"}>Home</Link></li>
                                    <li className="hover:text-[#262626]  hover:text-[16px]  ease-in-out hover:font-bold duration-200"><Link to={"/shop"}>Shop</Link></li>
                                    <li className="hover:text-[#262626]  hover:text-[16px]  ease-in-out hover:font-bold duration-200"><Link to={"/about"}>About</Link></li>
                                    <li className="hover:text-[#262626]  hover:text-[16px]  ease-in-out hover:font-bold duration-200"><Link to={"/contact"}>Contacts </Link></li>
                                </ul>
                            </div>
                        </Flex>
                    </div>
                </Container>
            </section>


            {/* second header part */}

            <section className="bg-[#F5F5F3]">
                <Container className={'relative'} >
                    <div className="py-6">
                        <Flex className={"items-center justify-between"}>


                            {/* shop by category 
                            <div className="flex items-center gap-x-2 font-orebi hover:font-bold duration-200 ease-in-out" onClick={handleDrop}>
                                <FaBars />
                                <h1>Shop By Category</h1>
                            </div>

                            <div className="absolute bg-white bottom-[-50%] p-4  hidden" ref={dropRef}>
                                <ul>
                                    <li><Link to={"/shop"}><h3>hi</h3></Link></li>
                                    <li><Link to={"/shop"}><h3>hi</h3></Link></li>
                                    <li><Link to={"/shop"}><h3>hi</h3></Link></li>
                                    <li><Link to={"/shop"}><h3>hi</h3></Link></li>
                                </ul>
                            </div> */}

{/* Shop by Category Wrapper */}
        <div className="relative">
          {/* Trigger Button */}
          <div
            className="flex items-center gap-x-2 font-orebi cursor-pointer select-none"
            onClick={handleDrop}
          >
            <FaBars className="text-[14px]" />
            <h1 className="text-[14px] font-bold text-[#262626]">Shop by Category</h1>
          </div>

          {/* Dropdown Menu */}
          <div
            className="absolute top-full left-0 mt-3 w-60 bg-white border border-[#F0F0F0] shadow-xl z-50 hidden"
            ref={dropRef}
          >
            <ul className="divide-y divide-[#F0F0F0] text-[14px] text-[#262626] font-orebi">
              <li>
                <Link to="/shop" className="block px-6 py-3.5 hover:font-bold hover:pl-8 transition-all duration-200">
                  Desktop
                </Link>
              </li>
              <li>
                <Link to="/shop" className="block px-6 py-3.5 hover:font-bold hover:pl-8 transition-all duration-200">
                  Laptop
                </Link>
              </li>
              <li>
                <Link to="/shop" className="block px-6 py-3.5 hover:font-bold hover:pl-8 transition-all duration-200">
                  Component
                </Link>
              </li>
              <li>
                <Link to="/shop" className="block px-6 py-3.5 hover:font-bold hover:pl-8 transition-all duration-200">
                  Power
                </Link>
              </li>
              <li>
                <Link to="/shop" className="block px-6 py-3.5 hover:font-bold hover:pl-8 transition-all duration-200">
                  Phone
                </Link>
              </li>
              <li>
                <Link to="/shop" className="block px-6 py-3.5 hover:font-bold hover:pl-8 transition-all duration-200">
                  Office Equipment
                </Link>
              </li>
              <li>
                <Link to="/shop" className="block px-6 py-3.5 hover:font-bold hover:pl-8 transition-all duration-200">
                  Security
                </Link>
              </li>
              <li>
                <Link to="/shop" className="block px-6 py-3.5 hover:font-bold hover:pl-8 transition-all duration-200">
                  Network
                </Link>
              </li>
              <li>
                <Link to="/shop" className="block px-6 py-3.5 hover:font-bold hover:pl-8 transition-all duration-200">
                  Software
                </Link>
              </li>
                  <li>
                <Link to="/shop" className="block px-6 py-3.5 hover:font-bold hover:pl-8 transition-all duration-200">
                  Server & Storage
                </Link>
              </li>
            </ul>
          </div>
        </div>





                            {/* search part */}
                            <div className="search w-150">
                                <input placeholder="Search Products" className="text-[14px] text-[#C4C4C4] font-orebi bg-white px-5 w-full h-12.5 outline-[#C4C4C4] focus:[#262626]" type="text" />
                            </div>

                            <div className="flex gap-x-5">
                                <div className="flex gap-x-1">
                                    <FaUserAlt className='text-[#262626] text-[16px] ' />
                                    <MdArrowDropDownCircle className='text-[#262626] text-[16px]' />
                                </div>

                                <FaShoppingCart className='text-[#262626] text-[16px]' />

                            </div>

                        </Flex>
                    </div>
                </Container>
            </section>


        </>
    )
}

export default Header