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

async function getCategories() {
  // استخدمنا الرابط مباشر عشان نضمن إنه ميضربش في الـ Build
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`, {
    next: { revalidate: 86400 }
  })

  // لو الـ API فيه مشكلة، نرجع مصفوفة فاضية بدل ما الـ Build يقع
  if (!res.ok) {
    return [];
  }

  const responseData: Branddata = await res.json()
  return responseData.data;
}

export default async function Category() {
  const CategoryList = await getCategories();

  // تأمين إضافي لو الداتا مجاتش
  if (!CategoryList || CategoryList.length === 0) {
    return <div className="text-center py-20">No categories found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className='text-4xl my-8 font-extrabold tracking-tight dark:text-white'>
        Shop by <span className="text-main">Category</span>
      </h1>

      <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6'>
        {CategoryList.map((item: data) => {
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