'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function ItemDetailsSlider({ images }: { images: string[] }) {
  const settings = {
    arrows: false,
    dots: true,
    infinite: images?.length > 1, 
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dotsClass: "slick-dots custom-dots", 
  };

  return (
    <div className="product-details-slider rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"> 
      <Slider {...settings}>
        {images?.map((image, index) => (
          <div key={index} className="outline-none">
            <div className="relative w-full aspect-square md:aspect-[4/5]">
              <Image 
                src={image} 
                alt={`product-image-${index}`} 
                fill
                priority={index === 0} 
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-contain p-2" 
              />
            </div>
          </div>
        ))}
      </Slider>

      
      <style jsx global>{`
        .custom-dots {
          bottom: 10px !important;
        }
        .custom-dots li button:before {
          color: #0aad0a !important; /* لون الـ main بتاعك */
          font-size: 10px;
        }
      `}</style>
    </div>
  );
}