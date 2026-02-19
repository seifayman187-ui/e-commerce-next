'use client'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import WishSlider from 'src/app/_Components/WishSlider/WishSlider'
import { item, Wishlistdata } from 'src/types/wishlist.type'
import { getWishData, removeWish } from 'src/WishlistAction/WishlistAction'
import { WishContext } from 'src/WishProvider'

export default function Wishlist() {
 
  const [wishlist , setwishlist] = useState<item[]>([])
  const [wishloading , setwishloading] = useState(true)

 
  const context = useContext(WishContext)
  const setWishCount = context?.setWishCount || (() => {})

  async function getWishlistData(){
    try {
      setwishloading(true)
      const data: Wishlistdata = await getWishData()
      
      setwishlist(data?.data || []) 
      setWishCount(data?.count || 0) 
    } catch (error) {
      console.error("Error fetching wishlist:", error)
    } finally {
      setwishloading(false)
    }
  }

  useEffect(() => {
    getWishlistData()
  }, [])

  async function remove(id: string) {
    try {
      const data = await removeWish(id)
  
      if (data?.status === 'success') {
        toast.success(data.message, { position: 'top-center' })
        
       
        setwishlist((prev) => prev.filter((item) => item._id !== id))
        
      
        setWishCount(data.count || 0)
      } else {
        toast.error('Something went wrong', { position: 'top-center' })
      }
    } catch (error) {
      toast.error('Network error')
    }
  }

  return (
    <div className='min-h-screen'>
      {wishloading ? (
        <div className='flex justify-center items-center fixed inset-0 bg-gray-300/50 backdrop-blur-sm z-50'>
          <span className="loader"></span>
        </div>
      ) : (
        <div className='container max-w-6xl mx-auto my-5 px-4'>
          <h1 className='text-3xl font-bold my-5'>Your Wishlist</h1>
          
          {wishlist && wishlist.length > 0 ? (
            wishlist.map((item) => {
              const { _id, images, description, title, ratingsAverage, slug, price } = item
              return (
                <div key={_id} className='grid grid-cols-12 gap-5 md:gap-10 items-center my-5 border-b pb-5'>
                  <div className='col-span-12 md:col-span-4'>
                    <WishSlider photos={images} />
                  </div>
                  <div className='col-span-12 md:col-span-8'>
                    <h2 className='text-2xl md:text-3xl font-bold'>{title}</h2>
                    <p className='text-gray-600 py-2'>{description}</p>
                    <p className='text-main font-semibold'>{slug}</p>

                    <div className='flex justify-between items-center my-5'>
                      <span className='text-2xl font-bold text-red-600'>{price} EGP</span>
                      <span className='text-lg'>
                        <i className="fa-solid fa-star rating-color mr-1"></i> 
                        {ratingsAverage}
                      </span>
                    </div>
                    <button 
                      onClick={() => remove(_id)} 
                      className='bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors float-end'
                    >
                      Remove
                    </button>
                    <div className='clear-both'></div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl text-gray-500">Your wishlist is empty</h2>
              <Link href="/products" className="text-main underline mt-3 inline-block">Explore Products</Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}