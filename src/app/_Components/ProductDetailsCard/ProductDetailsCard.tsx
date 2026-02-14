
import React from 'react'
import { ProductItem } from 'src/types/productdetails.type'
import ItemDetailsSlider from '../ItemDetailsSlider/ItemDetailsSlider'
import AddCartBtn from '../ProductCard/AddCartBtn'



export default function ProductDetailsCard({product}:{product:ProductItem}) {
    const {title,price,category:{name} , ratingsAverage, _id,description,images} = product
  return (
    <div className='w-11/12 mx-auto my-5'>
      <div className='grid grid-cols-12 gap-10 items-center'>
        <div className='col-span-4'>
          
          <ItemDetailsSlider images={images}/>
        </div>
        <div className='col-span-8'>
          <h1 className='text-3xl font-bold'>{title}</h1>
          <p className='text-lg py-2'>{description}</p>
          <p className='text-lg py-2 text-main'>{name}</p>

          <div className='flex justify-between items-center my-11'>
            <span className='text-2xl font-bold'>{price} EGP</span>
            <span className='text-lg'><i className="fa-solid fa-star rating-color"></i> {ratingsAverage}</span>
          </div>
    
            <AddCartBtn id={_id}/>
        </div>



      </div>
    </div>
  )
}
