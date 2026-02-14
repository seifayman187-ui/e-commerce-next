import React from 'react'
import { Branddata, data } from 'src/types/brand.type'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link"; 

export default async function Brands() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com";
  
  const res = await fetch(`${BASE_URL}/api/v1/brands`)
  const responseData: Branddata = await res.json()
  const BrandList: data[] = responseData.data

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className='text-4xl font-black tracking-tight dark:text-white'>
          Our <span className="text-main">Brands</span>
        </h1>
      </div>

      <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-6'>
        {BrandList.map((item) => {
          const { name, slug, image, _id } = item
          
          return (
            <Link href={`/brands/${_id}`} key={_id} className="group">
              <Card className="border-none shadow-sm bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 border border-gray-100 dark:border-gray-800">
                <CardHeader className="p-4">
                  
                  <div className="relative w-full aspect-square bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden p-4">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </CardHeader>
                
                <CardContent className="p-4 pt-0">
                  <div className="text-center space-y-2">
                    <p className='text-sm font-bold text-gray-900 dark:text-white truncate'>
                      {name}
                    </p>
                    <span className='inline-block text-[10px] font-bold text-main bg-main/10 px-2 py-0.5 rounded-md uppercase tracking-tighter'>
                      {slug}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}