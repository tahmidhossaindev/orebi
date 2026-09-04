import React, { useState, useRef, useEffect } from 'react'
import Container from '../components/Container'
import Flex from '../components/Flex'
import { Link } from 'react-router-dom'
import Image from '../components/Common/Image'
import Logo from '/src/assets/logo.png'
import { FaBars } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { MdArrowDropDownCircle } from "react-icons/md";
import { useCartStore } from '../store/useCartStore'



const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const categoryRef = useRef(null)
    const cartCount = useCartStore((state) =>
        state.cart.reduce((total, item) => total + item.quantity, 0)
    )

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoryRef.current && !categoryRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleToggle = () => {
        setIsOpen((prev) => !prev)
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

                            {/* Shop by Category Wrapper */}
                            <div className="relative" ref={categoryRef}>
                                {/* Trigger Button */}
                                <div
                                    className="flex items-center gap-x-2 font-orebi cursor-pointer select-none"
                                    onClick={handleToggle}
                                >
                                    <FaBars className="text-[14px]  hover:text-[18px] duration-200 ease-in-out" />
                                    <h1 className="text-[14px] font-bold text-[#262626]  hover:text-[18px] duration-200 ease-in-out">Shop by Category</h1>
                                </div>

                                {/* Dropdown Menu */}
                                {isOpen && (
                                    <div className="absolute top-full left-0 mt-3 w-60 bg-white border border-[#F0F0F0] shadow-xl z-50">
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
                                )}
                            </div>





                            {/* search part */}
                            <div className="search w-150">
                                <input placeholder="Search Products" className="text-[14px] text-[#C4C4C4] font-orebi bg-white px-5 w-full h-12.5 outline-[#C4C4C4] focus:[#262626]" type="text" />
                            </div>

                            <div className="flex gap-x-5 items-center">
                                <div className="flex gap-x-1 items-center">
                                    <FaUserAlt className='text-[#262626] text-[16px] ' />
                                    <MdArrowDropDownCircle className='text-[#262626] text-[16px]' />
                                </div>

                                <Link to="/cart" className="relative flex items-center cursor-pointer p-1" aria-label="View Shopping Cart">
                                    <FaShoppingCart className='text-[#262626] text-[18px]' />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1.5 -right-2 bg-[#262626] text-white text-[10px] font-bold font-orebi rounded-full w-4 h-4 flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>

                            </div>

                        </Flex>
                    </div>
                </Container>
            </section>


        </>
    )
}

export default Header