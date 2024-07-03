import React from "react";
import { Navigation, Pagination, Autoplay , A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from "next/image";

function HeroSlider() {
    return (
        <section className="container mh-50 py-5 gap-md-3 gap-1 d-flex justify-content-between">
            <div className="col-9">
                <Swiper
                    modules={[Navigation, Pagination, A11y, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop
                >
                    <SwiperSlide>
                        <Image
                            className="rounded"
                            src="/images/slider-1.1.jpg"
                            width={100}
                            height={100}
                            layout="responsive"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image
                            className="rounded"
                            src="/images/slider-2.1.jpg"
                            width={100}
                            height={100}
                            layout="responsive"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image
                            className="rounded"
                            src="/images/slider-3.1.jpg"
                            width={100}
                            height={100}
                            layout="responsive"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="col-3">
                <Image
                    className="rounded border border-2"
                    src="/images/slider-4.1.jpg"
                    width={100}
                    height={100}
                    layout="responsive"
                ></Image>
                <Image
                    className="rounded border border-2"
                    src="/images/slider-5.1.jpg"
                    width={100}
                    height={100}
                    layout="responsive"
                ></Image>
                <Image
                    className="rounded border border-2"
                    src="/images/slider-6.1.jpg"
                    width={100}
                    height={100}
                    layout="responsive"
                ></Image>
            </div>
        </section>
    );
}

export default HeroSlider;
