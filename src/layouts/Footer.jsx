import React from 'react'
import Container from '../components/Container'
import Flex from '../components/Flex'
import { Link, Links } from 'react-router-dom'
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { MdOutlineWorkOutline } from "react-icons/md";
import Image from '../components/Common/Image';
import Logo from '/src/assets/logo.png'


const Footer = () => {
  return (
    <>
      <div className='bg-[#F5F5F3] py-13.75'>


        <Container>
          <Flex className={"justify-between items-center"}>
            <div className="flex gap-35.75">
              <div className="sectionOne">
                <h3 className="mb-5 text-[#262626] text-[16px] font-bold">MENU</h3>
                <ul className="space-y-2 font-orebi">
                  <li className="text-[14px] text-[#6D6D6D] hover:text-black hover:text-[16px] duration-150 ease-in-out"><Link to={"/"}>Home</Link></li>
                  <li className="text-[14px] text-[#6D6D6D] hover:text-black hover:text-[16px] duration-150 ease-in-out"><Link to={"/shop"}>Shop</Link></li>
                  <li className="text-[14px] text-[#6D6D6D] hover:text-black hover:text-[16px] duration-150 ease-in-out"><Link to={"/about"}>About</Link></li>
                  <li className="text-[14px] text-[#6D6D6D] hover:text-black hover:text-[16px] duration-150 ease-in-out"><Link to={"/contact"}>Contact</Link></li>
                  <li className="text-[14px] text-[#6D6D6D] hover:text-black hover:text-[16px] duration-150 ease-in-out"><Link to={"/journal"}>Journal</Link></li>
                </ul>
              </div>

              <div className="sectionTwo">
                <h3 className="mb-5 text-[#262626] text-[16px] font-bold">SHOP</h3>
                <ul className="space-y-2 font-orebi">
                  <li className="text-[14px] text-[#6D6D6D] hover:text-black hover:text-[16px] duration-150 ease-in-out"><Link to={"/shop"}>Category 1</Link></li>
                  <li className="text-[14px] text-[#6D6D6D] hover:text-black hover:text-[16px] duration-150 ease-in-out "><Link to={"/shop"}>Category 2</Link></li>
                  <li className="text-[14px] text-[#6D6D6D] hover:text-black hover:text-[16px] duration-150 ease-in-out "><Link to={"/shop"}>Category 3</Link></li>
                  <li className="text-[14px] text-[#6D6D6D] hover:text-black hover:text-[16px] duration-150 ease-in-out"><Link to={"/shop"}>Category 4</Link></li>
                  <li className="text-[14px] text-[#6D6D6D] hover:text-black hover:text-[16px] duration-150 ease-in-out"><Link to={"/shop"}>Category 5</Link></li>
                </ul>
              </div>

              <div className="sectionThree">
                <h3 className="mb-5 text-[#262626] text-[16px] font-bold">HELP</h3>
                <ul className="space-y-2 font-orebi">
                  <li className="text-[14px] text-[#6D6D6D] hover:text-black hover:text-[16px] duration-150 ease-in-out"><Link to={"/info"}>Privacy Policy</Link></li>
                  <li className="text-[14px] text-[#6D6D6D] hover:text-black hover:text-[16px] duration-150 ease-in-out"><Link to={"/info"}>Terms & Conditions </Link></li>
                  <li className="text-[14px] text-[#6D6D6D] hover:text-black hover:text-[16px] duration-150 ease-in-out"><Link to={"/info"}>Special E-shop</Link></li>
                  <li className="text-[14px] text-[#6D6D6D] hover:text-black hover:text-[16px] duration-150 ease-in-out"><Link to={"/info"}>Shipping</Link></li>
                  <li className="text-[14px] text-[#6D6D6D] hover:text-black hover:text-[16px] duration-150 ease-in-out"><Link to={"/info"}>Secure Payments</Link></li>
                </ul>
              </div>
            </div>

            {/* contact part */}

            <div className="font-orebi ">
              <a href="tel:+8801971698344"><h2 className="font-bold text-[#262626] text-[16px]">+8801971698344</h2></a>
              <a href="mailto:tahmidhossain345@gmail.com"><h2 className="font-bold text-[#262626] text-[16px] ">tahmidhossain345@gmail.com</h2></a>
              <p className='mt-5'>575 Crescent Ave. Quakertown, PA 18951</p>

            </div>

            {/* logo part */}

            <div className="logo">
              <Link to={"/"}>
                <Image className={"w-full"} imageSrc={Logo} imageAlt={"Logo.png"} />
              </Link>
            </div>

          </Flex>

          {/* icons part */}

          <Flex className={"justify-between items-center mt-17.5"}>
            <div className="flex gap-5 ">
              <Link to={"https://www.facebook.com/"} target="_blank"><FaFacebookF className="text-[22px] text-[#262626] hover:text-[27px] duration-150 ease-in-out" /></Link>
              <Link to={"https://www.linkedin.com/"} target="_blank"><FaLinkedinIn className="text-[24px] text-[#262626] hover:text-[27px] duration-150 ease-in-out" /></Link>
              <Link to={"https://www.instagram.com/"} target="_blank"><FaInstagram className="text-[24px]  text-[#262626] hover:text-[27px] duration-150 ease-in-out" /></Link>
              <Link to={"https://se9k.framer.website/"} target="_blank"><MdOutlineWorkOutline className="text-[24px] text-[#262626] hover:text-[27px] duration-150 ease-in-out" /> </Link>
            </div>
            <p className="text-[14px] text-[#6D6D6D] font-orebi ">2020 Orebi Minimal eCommerce Figma Template by Adveits, Developed by Tahmid Hossain</p>
          </Flex>

        </Container>

      </div>
    </>
  )
}

export default Footer