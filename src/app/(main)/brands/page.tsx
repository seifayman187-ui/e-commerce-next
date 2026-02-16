import React from 'react'
import { Branddata, data } from 'src/types/brand.type'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link"; 

export default async function Brands() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com";
  
  
  let BrandList: data[] = [];
  try {
    const res = await fetch(`${BASE_URL}/api/v1/brands`, {
      next: { revalidate: 86400 } 
    })

    if (res.ok) {
      const responseData: Branddata = await res.json()
      BrandList = responseData.data || []
    }
  } catch (error) {
    console.error("Brands fetching error:", error);
  }

  
  if (BrandList.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">No brands found at the moment.</p>
      </div>
    );
  }

  return (
    <section className="py-10 container mx-auto px-4">
      <div className="mb-10 text-center md:text-left">
        <h1 className='text-3xl md:text-4xl font-black tracking-tight dark:text-white'>
          Our <span className="text-main">Brands</span>
        </h1>
        <p className="text-gray-500 text-sm mt-2">Explore our wide range of world-class brands</p>
      </div>

      <div className='grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 md:gap-6'>
        {BrandList.map((item) => {
          const { name, slug, image, _id } = item
          
          return (
            <Link href={`/brands/${_id}`} key={_id} className="group">
              <Card className="h-full border border-gray-100 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <CardHeader className="p-3 md:p-4">
                  <div className="relative w-full aspect-square bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      // الـ sizes دي ممتازة جداً للـ Performance
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 15vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-110 p-2"
                      // إضافة priority لأول 6 صور عشان الـ LCP
                      priority={BrandList.indexOf(item) < 6}
                    />
                  </div>
                </CardHeader>
                
                <CardContent className="p-3 pt-0 text-center">
                  <p className='text-xs md:text-sm font-bold text-gray-900 dark:text-white truncate'>
                    {name}
                  </p>
                  <span className='hidden md:inline-block text-[9px] font-bold text-main bg-main/10 px-2 py-0.5 rounded uppercase mt-1'>
                    {slug}
                  </span>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}