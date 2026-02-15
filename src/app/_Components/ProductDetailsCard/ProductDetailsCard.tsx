import React from 'react'
import { ProductItem } from 'src/types/productdetails.type'
import ItemDetailsSlider from '../ItemDetailsSlider/ItemDetailsSlider'
import AddCartBtn from '../ProductCard/AddCartBtn'
import { Star } from 'lucide-react' 

export default function ProductDetailsCard({product}:{product:ProductItem}) {
    const {title, price, category:{name}, ratingsAverage, _id, description, images} = product

    return (
        <div className='container mx-auto px-4 py-8 md:py-12'>
            
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start'>
                
                
                <div className='col-span-1 lg:col-span-5 w-full'>
                    <div className='sticky top-28'> 
                        <ItemDetailsSlider images={images}/>
                    </div>
                </div>

                
                <div className='col-span-1 lg:col-span-7 flex flex-col justify-center'>
                    <nav className='flex mb-4 text-sm text-gray-500 uppercase tracking-widest'>
                        <span className='text-main font-bold'>{name}</span>
                    </nav>

                    <h1 className='text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight'>
                        {title}
                    </h1>

                    <p className='text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed border-l-4 border-main pl-4'>
                        {description}
                    </p>

                    <div className='flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl mb-8'>
                        <div className='flex flex-col'>
                            <span className='text-sm text-gray-500 uppercase'>Price</span>
                            <span className='text-3xl font-black text-gray-900 dark:text-white'>
                                {price} <span className='text-sm font-medium'>EGP</span>
                            </span>
                        </div>
                        
                        <div className='flex flex-col items-end'>
                            <span className='text-sm text-gray-500 uppercase'>Rating</span>
                            <div className='flex items-center gap-1 bg-white dark:bg-gray-900 px-3 py-1 rounded-full shadow-sm mt-1'>
                                <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                                <span className='font-bold'>{ratingsAverage}</span>
                            </div>
                        </div>
                    </div>
            
                    
                    <div className='w-full transform transition-all active:scale-95'>
                        <AddCartBtn id={_id}/>
                    </div>

                    <div className='mt-8 grid grid-cols-3 gap-4 border-t pt-8 text-center text-xs text-gray-500'>
                        <div className='flex flex-col items-center gap-2'>
                            <div className='p-2 bg-main/10 rounded-full'><i className="fa-solid fa-truck-fast text-main text-lg"></i></div>
                            Fast Delivery
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                            <div className='p-2 bg-main/10 rounded-full'><i className="fa-solid fa-shield-halved text-main text-lg"></i></div>
                            Secure Payment
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                            <div className='p-2 bg-main/10 rounded-full'><i className="fa-solid fa-rotate-left text-main text-lg"></i></div>
                            Original Product
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}