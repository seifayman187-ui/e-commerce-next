'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    arrows:false,
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    
      <div className="grid grid-cols-12 my-6">
       
        <div className="col-span-9">
            <Slider {...settings}>
        
                <div>
                    <Image src="/image/slider-image-1.jpeg" alt="img1" width={500} height={500} className="w-full h-96 object-cover"/>
                </div>
                <div>
                    <Image src="/image/slider-image-2.jpeg" alt="img2" width={500} height={500} className="w-full h-96 object-cover"/>
                </div>
                <div>
                    <Image src="/image/slider-image-3.jpeg" alt="img3" width={500} height={500} className="w-full h-96 object-cover"/>
                </div>
            </Slider>
        </div>
        
        <div className="col-span-3">
           <Image src="/image/slider-image-1.jpeg" alt="img4" width={500} height={500} className="w-full h-48 object-cover"/>
           <Image src="/image/slider-image-2.jpeg" alt="img5" width={500} height={500} className="w-full h-48 object-cover"/>
        </div>
      </div>
    
  );
}