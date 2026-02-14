import React from 'react'
import { Branddata, data } from 'src/types/brand.type'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link"; 

export default async function Category() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com";
  
  const res = await fetch(`${BASE_URL}/api/v1/categories`)
  const responseData: Branddata = await res.json()
  const CategoryList: data[] = responseData.data

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className='text-4xl my-8 font-extrabold tracking-tight dark:text-white'>
        Shop by <span className="text-main">Category</span>
      </h1>

      <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6'>
        {CategoryList.map((item) => {
          const { name, slug, image, _id } = item
          
          return (
            <Link href={`/category/${_id}`} key={_id} className="block group">
              <Card className="overflow-hidden border-none shadow-md bg-white dark:bg-gray-900 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                <CardHeader className="p-0">
                  <div className="relative w-full aspect-square">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay خفيف بيظهر وقت الهوفر */}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />
                  </div>
                </CardHeader>
                
                <CardContent className='p-4 text-center'>
                  <CardTitle className='text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 truncate'>
                    {name}
                  </CardTitle>
                  <span className='inline-block text-[10px] font-bold uppercase tracking-widest text-white bg-main px-3 py-1 rounded-full opacity-80'>
                    {slug}
                  </span>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}