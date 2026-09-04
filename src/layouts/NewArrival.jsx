import React, { useEffect } from 'react'
import Product from '@/components/Common/Product'
import Container from '@/components/Container'
import { useProductStore } from '@/store/useProductStore'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/scrollbar'

const NewArrival = ({ className }) => {
    const { products, isLoading, error, fetchProducts } = useProductStore()

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    const arrivalProducts = products.slice(0, 8)

    return (
        <div className={`${className}`}>
            <Container>
                <h1 className='font-orebi font-bold text-[#262626] text-[39px] mb-11'>New Arrivals</h1>

                {isLoading && arrivalProducts.length === 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="animate-pulse">
                                <div className="bg-[#F5F5F3] h-80 w-full mb-5.5 rounded-sm"></div>
                                <div className="h-5 bg-[#E5E5E5] w-3/4 mb-2 rounded-sm"></div>
                                <div className="h-4 bg-[#E5E5E5] w-1/3 rounded-sm"></div>
                            </div>
                        ))}
                    </div>
                ) : error && arrivalProducts.length === 0 ? (
                    <div className="text-center py-10 font-orebi">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button
                            onClick={() => fetchProducts(true)}
                            className="bg-[#262626] text-white px-6 py-2.5 font-bold hover:bg-black transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                        autoplay={{
                            delay: 700,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        loop={arrivalProducts.length > 4}
                        spaceBetween={40}
                        slidesPerView={1}
                        breakpoints={{
                            480: { slidesPerView: 2, spaceBetween: 20 },
                            768: { slidesPerView: 3, spaceBetween: 30 },
                            1024: { slidesPerView: 4, spaceBetween: 40 },
                        }}
                        navigation={true}
                    >
                        {arrivalProducts.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div className="w-full">
                                    <Product product={product} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </Container>
        </div>
    )
}

export default NewArrival