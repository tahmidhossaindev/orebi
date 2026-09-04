import React from 'react'
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
                <Container>
                    <div className="py-6">
                        <Flex className={"items-center justify-between"}>


                            {/* shop by category  */}
                            <div className="flex items-center gap-x-2 font-orebi hover:font-bold duration-200 ease-in-out ">
                                <FaBars />
                                <h1>Shop By Category</h1>
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