'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function ItemDetailsSlider({images}:{images: string[]}) {
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
    <div> 
        <Slider {...settings}>
        
               {
                images.map((image)=>{
                    return  <div key={image}>
                    <Image src={image} alt="img1" width={500} height={500} className="w-full h-96 object-cover"/>
                </div>
                    
                })
               }
                
            </Slider>
    </div>
  )
}
