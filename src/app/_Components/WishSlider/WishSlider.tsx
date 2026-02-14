'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function WishSlider({photos}:{photos: string[]}) {
    const settings = {
    arrows:false,
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div> 
        <Slider {...settings}>
        
               {
                photos.map((photo)=>{
                    return  <div key={photo}>
                    <Image src={`https://ecommerce.routemisr.com/Route-Academy-products/${photo}`} alt="img1" width={500} height={500} className="w-full h-50 object-cover rounded-2xl"/>
                </div>
                    
                })
               }
                
            </Slider>
    </div>
  )
}
