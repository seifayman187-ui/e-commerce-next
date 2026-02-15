'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function MainSlider() {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    lazyLoad: 'progressive' as const, 
  };

  return (
    <div className="grid grid-cols-12 my-6 overflow-hidden">
      {/* الـ Slider الرئيسي */}
      <div className="col-span-12 md:col-span-9">
        <Slider {...settings}>
          <div>
            <Image 
              src="/image/slider-image-1.jpeg" 
              alt="img1" 
              width={800} 
              height={400} 
              priority 
              className="w-full h-96 object-cover"
            />
          </div>
          <div>
            <Image 
              src="/image/slider-image-2.jpeg" 
              alt="img2" 
              width={800} 
              height={400} 
              className="w-full h-96 object-cover"
            />
          </div>
          <div>
            <Image 
              src="/image/slider-image-3.jpeg" 
              alt="img3" 
              width={800} 
              height={400} 
              className="w-full h-96 object-cover"
            />
          </div>
        </Slider>
      </div>
      
      
      <div className="hidden md:block md:col-span-3">
        <Image 
          src="/image/slider-image-1.jpeg" 
          alt="img4" 
          width={400} 
          height={200} 
          className="w-full h-48 object-cover"
        />
        <Image 
          src="/image/slider-image-2.jpeg" 
          alt="img5" 
          width={400} 
          height={200} 
          className="w-full h-48 object-cover"
        />
      </div>
    </div>
  );
}