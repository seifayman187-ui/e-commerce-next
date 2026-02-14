import React from 'react'
import { ProductItem, ProductDetails } from '@/types/productdetails.type';
import ProductDetailsCard from 'src/app/_Components/ProductDetailsCard/ProductDetailsCard';

export default async function page({params}:{params:{id:string}}) {
    const {id} = params

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`)
    const data:ProductDetails = await res.json()
    console.log(data);
    const product:ProductItem = data.data
    

    
  return (
    <div>
      <ProductDetailsCard product={product}/>
    </div>
  )
}
