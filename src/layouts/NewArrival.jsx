import Product from '@/components/Common/Product'
import Container from '@/components/Container'
import Flex from '@/components/Flex'
import React from 'react'
import productImageOne from '/src/assets/productImageOne.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';

const NewArrival = ({ className }) => {
    return (
        <>
            <div className={`${className}`}>
                <Container>
                    <h1 className='font-orebi font-bold text-[#262626] text-[39px] mb-11'>New Arrivals</h1>
                    {/* <Flex className={"gap-x-10"}>
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

        </Flex> */}


                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                        autoplay={{
                            delay: 1000,                   // Time between transitions (in ms)
                            disableOnInteraction: false,   // Keeps autoplay running after user swipes
                            pauseOnMouseEnter: false,       // Pauses autoplay when mouse hovers over slider
                        }}
                        loop={true}                      // Optional: Enables continuous looping
                        spaceBetween={40}
                        slidesPerView={4}
                        navigation={true}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                    >
                        <SwiperSlide>  <div className="w-full">
                            <Product productImage={productImageOne} badgeT={"New"} productName={"Basic Crew Neck Tee"} productPrice={"$44.00"} productCategory={"Black"} />
                        </div>
                        </SwiperSlide>


                        <SwiperSlide>  <div className="w-full">
                            <Product productImage={productImageOne} badgeT={"New"} productName={"Basic Crew Neck Tee"} productPrice={"$44.00"} productCategory={"Black"} />
                        </div>
                        </SwiperSlide>



                        <SwiperSlide>  <div className="w-full">
                            <Product productImage={productImageOne} badgeT={"New"} productName={"Basic Crew Neck Tee"} productPrice={"$44.00"} productCategory={"Black"} />
                        </div>
                        </SwiperSlide>


                        <SwiperSlide>  <div className="w-full">
                            <Product productImage={productImageOne} badgeT={"New"} productName={"Basic Crew Neck Tee"} productPrice={"$44.00"} productCategory={"Black"} />
                        </div>
                        </SwiperSlide>

                        <SwiperSlide>  <div className="w-full">
                            <Product productImage={productImageOne} badgeT={"New"} productName={"Basic Crew Neck Tee"} productPrice={"$44.00"} productCategory={"Black"} />
                        </div>
                        </SwiperSlide>

                        ...
                    </Swiper>


                </Container>
            </div>
        </>
    )
}

export default NewArrival