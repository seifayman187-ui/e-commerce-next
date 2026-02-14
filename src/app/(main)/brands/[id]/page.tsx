import React from 'react'
import Image from 'next/image'
import { product } from 'src/types/products.type'
import { Badge } from "@/components/ui/badge"
import ProductCard from 'src/app/_Components/ProductCard/ProductCard'

async function getBrandData(id: string) {
  const [brandRes, prodRes] = await Promise.all([
    fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`),
    fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
  ])
  const brandData = await brandRes.json()
  const prodData = await prodRes.json()
  return { brand: brandData.data, products: prodData.data }
}

export default async function BrandDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { brand, products } = await getBrandData(id)

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      
      <section className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center gap-12">
        
        {/* Image Box */}
        <div className="w-full md:w-1/3">
          <div className="relative aspect-square bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden p-6 shadow-inner">
            <Image 
              src={brand.image} 
              alt={brand.name} 
              fill 
              className="object-contain" // لضمان ظهور اللوجو كاملاً بدون قص
              priority
            />
          </div>
        </div>

        {/* Content Box */}
        <div className="w-full md:w-2/3 space-y-4 text-center md:text-left">
          <Badge className="bg-main/10 text-main hover:bg-main/20 border-none px-4 py-1 text-sm uppercase tracking-widest">
            Official Brand
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight">
            {brand.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
            Explore the exclusive collection from {brand.name}. We bring you the finest products with guaranteed quality and innovation.
          </p>
          <div className="pt-4">
            <Badge variant="outline" className="text-gray-400 border-gray-200 dark:border-gray-700 px-4 py-2 text-md">
              {products?.length || 0} Products Available
            </Badge>
          </div>
        </div>
      </section>

      {/* 2. Products Section (الجريد الخاص بالمنتجات) */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold dark:text-white">Brand Collection</h2>
          <div className="h-[2px] flex-1 bg-gray-100 dark:bg-gray-800"></div>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((item: product) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
            <p className="text-gray-400 text-xl font-medium">No products found for this brand yet.</p>
          </div>
        )}
      </section>

    </div>
  )
}