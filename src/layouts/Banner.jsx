import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';
import bannerOne from '/src/assets/bannerOne.png'
import bannerTwo from '/src/assets/bannerTwo.png'
import bannerThree from '/src/assets/bannerThree.png'
import bannerFour from '/src/assets/bannerFour.png'
import Image from '../components/Common/Image';
import { Link } from 'react-router-dom';


const Banner = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      autoplay={{
        delay: 1000,                   // Time between transitions (in ms)
        disableOnInteraction: false,   // Keeps autoplay running after user swipes
        pauseOnMouseEnter: false,       // Pauses autoplay when mouse hovers over slider
      }}
      loop={true}                      // Optional: Enables continuous looping
      spaceBetween={0}
      slidesPerView={1}
      // navigation
      // pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide> <Link to={"/shop"} > <Image imageSrc={bannerOne} className={"w-full"} /> </Link> </SwiperSlide>
      <SwiperSlide><Link to={"/shop"} > <Image imageSrc={bannerTwo} className={"w-full"} /> </Link></SwiperSlide>
      <SwiperSlide><Link to={"/shop"} > <Image imageSrc={bannerThree} className={"w-full"} /> </Link></SwiperSlide>
      <SwiperSlide> <Link to={"/shop"} > <Image imageSrc={bannerFour} className={"w-full"} /> </Link></SwiperSlide>
      ...
    </Swiper>
  )
}

export default Banner


