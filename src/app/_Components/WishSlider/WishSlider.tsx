'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function WishSlider({ photos }: { photos: string[] }) {
  const settings = {
    arrows: false,
    dots: false, 
    infinite: photos?.length > 1,
    speed: 600, 
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true, 
  };

  
  if (!photos || photos.length === 0) return null;

  return (
    <div className="rounded-xl overflow-hidden shadow-sm"> 
      <Slider {...settings}>
        {photos.map((photo, index) => (
          <div key={index} className="outline-none">
            <div className="relative w-full h-48 md:h-56 bg-gray-50 dark:bg-gray-800">
              <Image 
                
                src={photo.startsWith('http') ? photo : `https://ecommerce.routemisr.com/Route-Academy-products/${photo}`} 
                alt={`wishlist-img-${index}`} 
                fill
                sizes="(max-width: 768px) 30vw, 15vw" 
                className="object-contain p-2" 
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}