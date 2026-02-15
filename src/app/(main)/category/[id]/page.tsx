import React from 'react'
import Image from 'next/image'
import { product } from 'src/types/products.type'
import ProductCard from 'src/app/_Components/ProductCard/ProductCard'
import { Badge } from "@/components/ui/badge"
import { notFound } from 'next/navigation'

async function getData(id: string) {
  try {
    const [catRes, prodRes] = await Promise.all([
      fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, { next: { revalidate: 3600 } }),
      fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`, { next: { revalidate: 3600 } })
    ])

    if (!catRes.ok) return null;

    const catData = await catRes.json()
    const prodData = await prodRes.json()
    return { category: catData.data, products: prodData.data }
  } catch (error) {
    return null;
  }
}

export default async function CategoryDetails({ params }: { params: { id: string } }) {
  const data = await getData(params.id)

  if (!data || !data.category) {
    notFound(); 
  }

  const { category, products } = data;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 space-y-12 md:space-y-16">
      
      
      <section className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        
        <div className="w-full md:w-1/3 max-w-[350px]">
          <div className="relative aspect-square bg-gray-50 dark:bg-gray-800 rounded-3xl overflow-hidden shadow-inner border border-gray-100 dark:border-gray-700">
            <Image 
              src={category.image} 
              alt={category.name} 
              fill 
              className="object-cover md:object-contain transition-transform duration-500 hover:scale-105" 
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>

        
        <div className="w-full md:w-2/3 space-y-4 text-center md:text-left">
          <Badge className="bg-main text-white hover:bg-main/90 border-none px-4 py-1 text-xs uppercase tracking-widest font-bold">
            Category
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            {category.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
            Discover our curated collection of <span className="text-main font-semibold">{category.name}</span>. 
            We provide high-quality items designed to meet your every need.
          </p>
          <div className="pt-2">
            <Badge variant="outline" className="text-gray-400 border-gray-200 dark:border-gray-700 px-4 py-1.5 text-sm font-medium">
              {products.length} Products Available
            </Badge>
          </div>
        </div>
      </section>

      
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white whitespace-nowrap">Category Products</h2>
            <div className="h-[1px] w-full bg-gray-100 dark:bg-gray-800 hidden md:block"></div>
          </div>
        </div>

        {products.length > 0 ? (
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
            {products.map((item: product) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-gray-800">
            <div className="space-y-3">
               <p className="text-gray-400 text-xl font-medium">Coming Soon!</p>
               <p className="text-gray-500 text-sm">We're currently stocking up on new items for this category.</p>
            </div>
          </div>
        )}
      </section>

    </div>
  )
}