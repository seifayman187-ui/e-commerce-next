import React from 'react'
import Image from 'next/image'
import { product } from 'src/types/products.type'
import { Badge } from "@/components/ui/badge"
import ProductCard from 'src/app/_Components/ProductCard/ProductCard'
import { notFound } from 'next/navigation'

async function getBrandData(id: string) {
  try {
    const [brandRes, prodRes] = await Promise.all([
      fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`, { next: { revalidate: 3600 } }),
      fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`, { next: { revalidate: 3600 } })
    ])

    if (!brandRes.ok) return null;

    const brandData = await brandRes.json()
    const prodData = await prodRes.json()
    
    return { brand: brandData.data, products: prodData.data }
  } catch (error) {
    return null;
  }
}


export async function generateMetadata({ params }: { params: { id: string } }) {
  const data = await getBrandData(params.id);
  if (!data) return { title: 'Brand Not Found' };
  return {
    title: `${data.brand.name} | Collection`,
    description: `Explore the exclusive collection from ${data.brand.name}`
  };
}

export default async function BrandDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params
  const data = await getBrandData(id)

  
  if (!data) notFound();

  const { brand, products } = data;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 space-y-12 md:space-y-20">
      
    
      <section className="bg-white dark:bg-gray-950 rounded-[2.5rem] p-6 md:p-14 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center gap-10">
        
        
        <div className="w-full md:w-1/3 max-w-[300px]">
          <div className="relative aspect-square bg-white dark:bg-gray-800 rounded-3xl overflow-hidden p-6 shadow-inner border border-gray-50 dark:border-gray-700">
            <Image 
              src={brand.image} 
              alt={brand.name} 
              fill 
              className="object-contain p-4 transition-transform duration-700 hover:scale-110" 
              priority
            />
          </div>
        </div>

        {/* Brand Info */}
        <div className="w-full md:w-2/3 space-y-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Badge className="bg-main text-white hover:bg-main/90 border-none px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full">
              Verified Brand
            </Badge>
            <span className="text-gray-400 text-sm font-medium hidden md:inline">•</span>
            <span className="text-gray-500 font-semibold">{products?.length || 0} Items Total</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
            {brand.name}
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-base md:text-xl max-w-2xl leading-relaxed italic">
            "Elevating your lifestyle with {brand.name}'s signature quality and style."
          </p>
        </div>
      </section>

      {/* 2. Collection Header */}
      <section className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b pb-6 border-gray-100 dark:border-gray-800">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold dark:text-white tracking-tight">Full Collection</h2>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">New Arrivals & Best Sellers</p>
          </div>
        </div>

        
        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
            {products.map((item: product) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-gray-50 dark:bg-gray-900/50 rounded-[3rem] border-4 border-dotted border-gray-200 dark:border-gray-800">
            <div className="max-w-xs mx-auto space-y-4">
              <div className="text-5xl opacity-20 text-gray-400 font-black italic">Empty</div>
              <p className="text-gray-400 font-medium">We're currently updating the {brand.name} catalog. Check back soon!</p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}