'use client'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import WishSlider from 'src/app/_Components/WishSlider/WishSlider'
import { item, Wishlistdata } from 'src/types/wishlist.type'
import { getWishData, removeWish } from 'src/WishlistAction/WishlistAction'
import { WishContext } from 'src/WishProvider'

export default function Wishlist() {

  const [wishlist , setwishlist] = useState<item[]>()
  const [wishloading , setwishloading] = useState(true)
  const {setWishCount} = useContext(WishContext)

  useEffect(()=>{
    getWishlistData()
  },[])
 async function getWishlistData(){
    setwishloading(true)
    const data:Wishlistdata = await getWishData()
    setwishlist(data.data)
    setwishloading(false)
    const sum = data.count;
    setWishCount(sum);
    
  }

  async function remove(id:string){
    const data = await removeWish(id)
  
    if(data.status == 'success'){
      toast.success(data.message , {position:'top-center'})
      getWishlistData()
      const sum = data.count;
      setWishCount(sum);
    }else{
      toast.error('Some thing wrong happened', {position:'top-center'})
    }
    
  }

 
  return (
    <div className='min-h-screen'>
      {
        wishloading ? 
        <div className='flex justify-center items-center fixed top-0 left-0 w-full h-full bg-gray-300/50 backdrop-blur-sm z-50'>
          <span className="loader"></span>
        </div>
        : 
        <>
        <div className='container max-w-6xl mx-auto my-5'>
          <h1 className='text-3xl font-bold my-5 '>Your Wishlist </h1>
          {
            wishlist?.map((item)=>{
              const {_id ,imageCover , images ,description ,title ,ratingsAverage, slug , price} = item
              return (
                <div key={_id} className='grid grid-cols-12 gap-10 items-center my-5 border-b pb-5'>
                  <div className='col-span-4'>
                    
                   <WishSlider photos={images}/>
                  </div>
                  <div className='col-span-8'>
                    <h1 className='text-3xl font-bold'>{title}</h1>
                    <p className='text-lg py-2'>{description}</p>
                    <p className='text-lg py-2 text-main'>{slug}</p>

                    <div className='flex justify-between items-center my-5'>
                      <span className='text-2xl font-bold'>{price} EGP</span>
                      <span className='text-lg'><i className="fa-solid fa-star rating-color"></i> {ratingsAverage}</span>
                    </div>
                    <button onClick={() => remove(_id)} className=' bg-red-500 text-white px-4 py-2 rounded-md float-end hover:cursor-pointer'>Remove</button>
                    <div className='clear-both'></div>
                  </div>
                </div>
              )
            })
          }


        </div>
        </>
      }
    </div>
  )
}
