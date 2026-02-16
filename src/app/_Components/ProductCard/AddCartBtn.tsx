"use client"
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'
import { addToCart } from 'src/CartAction/CartAction'
import { Button } from 'src/components/ui/button'
import { CountContext } from 'src/CountProvider'
import { useRouter } from 'next/navigation' 

export default function AddCartBtn({id}:{id:string}) {
  const [loadingBtn, setLoadingBtn] = useState(false)
  const { setCount } = useContext(CountContext)
  const router = useRouter()

  async function addProduct(id: string) {
    try {
      setLoadingBtn(true)
      const data = await addToCart(id)

      if (data?.status === 'success') {
        toast.success(data.message, { position: 'top-center' })
        
        
        const products = data?.data?.products || []
        const sum = products.reduce((total: number, item: {count: number}) => total + item.count, 0)
        setCount(sum)
      } else {
      
        toast.error('Session expired. Please login again.')
        router.push('/login') 
      }
    } catch (err: any) {
     
      console.error("Cart Error:", err)
      toast.error('Please login to add items to your cart')
      router.push('/login') 
    } finally {
      setLoadingBtn(false)
    }
  }

  return (
    <Button 
      onClick={(e) => {
        e.stopPropagation(); 
        addProduct(id)
      }} 
      disabled={loadingBtn}
      className="rounded-2xl bg-main w-full text-white hover:cursor-pointer transition-all active:scale-95"
    >
      {loadingBtn ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Add to Cart'}
    </Button>
  )
}