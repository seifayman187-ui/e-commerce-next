"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { clearCart, getCartData, removeFromCart, updateCart } from 'src/CartAction/CartAction'
import { Button } from 'src/components/ui/button'
import { CountContext } from 'src/CountProvider'
import { cart, Cartdata } from 'src/types/cart.type'
import { Trash2, Plus, Minus, Loader2, ShoppingBag } from 'lucide-react'

export default function Cart() {
  const [cart, setcart] = useState<cart | null>(null)
  const [currentId, setcurrentId] = useState<string | null>(null)
  const [cartloading, setcartloading] = useState(true)
  const [countDisable, setcountDisable] = useState(false)
  const { setCount } = useContext(CountContext)

  useEffect(() => {
    getAllCartData()
  }, [])

  async function getAllCartData() {
    setcartloading(true)
    const data: Cartdata = await getCartData()
   if (data.status === "success" && data.data) {
    setcart(data.data); 
  } else {
    setcart(null);
  }
    setcartloading(false)
  }

  async function deleteItem(id: string) {
    setcountDisable(true)
    const data = await removeFromCart(id)
    if (data.status === 'success') {
      toast.success('Product removed')
      setcart(data.data)
      const sum = data.data.products.reduce((total: number, item: any) => total + item.count, 0)
      setCount(sum)
    }
    setcountDisable(false)
  }

  async function clearAll() {
    const data = await clearCart()
    if (data.message === 'success') {
      toast.success('Cart cleared')
      setcart(null)
      setCount(0)
    }
  }

  async function updateCartCount(id: string, newCount: number) {
    if (newCount < 1) return deleteItem(id) // لو نزل عن 1 يحذف المنتج

    setcurrentId(id)
    setcountDisable(true)
    const data = await updateCart(id, newCount)
    if (data.status === 'success') {
      setcart(data.data)
      const sum = data.data.products.reduce((total: number, item: any) => total + item.count, 0)
      setCount(sum)
    }
    setcountDisable(false)
    setcurrentId(null)
  }

  if (cartloading) return (
    <div className='h-[60vh] flex flex-col justify-center items-center gap-4'>
      <Loader2 className='w-12 h-12 animate-spin text-main' />
      <p className='text-gray-500 animate-pulse'>Loading your cart...</p>
    </div>
  )

  return (
    <div className='container mx-auto my-10 px-4'>
      <div className='flex items-center gap-3 mb-8'>
         <ShoppingBag className='text-main w-8 h-8' />
         <h1 className='text-3xl font-black tracking-tight'>Your <span className='text-main'>Shopping Cart</span></h1>
      </div>

      {cart && cart.products.length > 0 ? (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          
          {/* List of Products (Table on Desktop, Cards on Mobile) */}
          <div className='lg:col-span-8 space-y-4'>
            {cart.products.map((item) => (
              <div key={item._id} className='flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm gap-4'>
                <div className='flex items-center gap-4 w-full sm:w-auto'>
                  <Image src={item.product.imageCover} width={80} height={80} className="w-20 h-20 object-cover rounded-xl" alt={item.product.title} />
                  <div className='flex-1'>
                    <h3 className='font-bold text-gray-900 dark:text-white line-clamp-1'>{item.product.title}</h3>
                    <p className='text-main font-bold'>{item.price} EGP</p>
                  </div>
                </div>

                <div className='flex items-center justify-between w-full sm:w-auto gap-6'>
                  {/* Quantity Controls */}
                  <div className='flex items-center bg-gray-50 dark:bg-gray-800 rounded-full px-2 py-1 border dark:border-gray-700'>
                    <button 
                      disabled={countDisable} 
                      onClick={() => updateCartCount(item.product._id, item.count - 1)}
                      className='p-1 hover:text-main disabled:opacity-50 transition-colors'
                    >
                      {item.count === 1 ? <Trash2 size={16} className='text-red-500' /> : <Minus size={16} />}
                    </button>
                    
                    <span className='w-10 text-center font-bold text-sm'>
                      {currentId === item.product._id ? <Loader2 size={14} className='animate-spin mx-auto' /> : item.count}
                    </span>

                    <button 
                      disabled={countDisable} 
                      onClick={() => updateCartCount(item.product._id, item.count + 1)}
                      className='p-1 hover:text-main disabled:opacity-50 transition-colors'
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button 
                    disabled={countDisable} 
                    onClick={() => deleteItem(item.product._id)}
                    className='text-gray-400 hover:text-red-500 transition-colors p-2'
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
            
            <Button onClick={clearAll} variant="ghost" className='text-red-500 hover:text-red-600 hover:bg-red-50 mt-4'>
              <Trash2 size={16} className='mr-2' /> Clear All Cart
            </Button>
          </div>

          {/* Summary Section */}
          <div className='lg:col-span-4'>
            <div className='bg-gray-50 dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 sticky top-24'>
              <h2 className='text-xl font-bold mb-6'>Order Summary</h2>
              <div className='space-y-4 mb-6'>
                <div className='flex justify-between text-gray-500'>
                  <span>Subtotal</span>
                  <span>{cart.totalCartPrice} EGP</span>
                </div>
                <div className='flex justify-between text-gray-500'>
                  <span>Shipping</span>
                  <span className='text-green-500 font-bold'>Free</span>
                </div>
                <div className='border-t pt-4 flex justify-between font-black text-xl'>
                  <span>Total</span>
                  <span className='text-main'>{cart.totalCartPrice} EGP</span>
                </div>
              </div>
              <Link href={'/checkoutsession/' + cart._id}>
                <Button className='w-full bg-main hover:bg-main/90 h-14 rounded-full text-lg font-bold shadow-lg shadow-main/20'>
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Cart View */
        <div className='text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-gray-700'>
          <ShoppingBag className='w-16 h-16 mx-auto text-gray-300 mb-4' />
          <h2 className='text-2xl font-bold text-gray-400'>Your cart is empty</h2>
          <p className='text-gray-500 mt-2 mb-8'>Looks like you haven't added anything to your cart yet.</p>
          <Link href='/products'>
            <Button className='bg-main px-8 rounded-full'>Go Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  )
}