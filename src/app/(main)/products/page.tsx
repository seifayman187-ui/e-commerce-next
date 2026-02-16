import React from 'react'
import ProductCard from 'src/app/_Components/ProductCard/ProductCard'
import { product, ProductData } from 'src/types/products.type'

export default async function ProductsPage() {
  
  
  let ProductList: product[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`, {
      next: { revalidate: 3600 } 
    });

    if (res.ok) {
      const data: ProductData = await res.json();
      ProductList = data.data || [];
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  
  if (ProductList.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-500">No products found.</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between my-8 gap-4">
        <div>
          <h1 className='text-3xl md:text-5xl font-black tracking-tighter dark:text-white'>
            All <span className="text-main">Products</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base mt-1 italic">Discover our latest collection and top deals</p>
        </div>
        
        <div className="h-[2px] flex-1 bg-gray-100 dark:bg-gray-800 mx-8 hidden lg:block opacity-50"></div>
        
        <div className="text-sm font-bold text-gray-400">
          Showing {ProductList.length} items
        </div>
      </div>

      
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6'>
        {ProductList.map((item, index) => (
          <ProductCard 
            key={item._id} 
            item={item} 
            
          />
        ))}
      </div>

      <div className="mt-16 text-center border-t pt-8 border-gray-100 dark:border-gray-800">
        <p className="text-gray-400 text-sm">You&apos;ve reached the end of the catalog.</p>
      </div>
    </div>
  )
}