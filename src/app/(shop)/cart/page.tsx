"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { clearCart, getCartData, removeFromCart, updateCart } from 'src/CartAction/CartAction'
import { Button } from 'src/components/ui/button'
import { CountContext } from 'src/CountProvider'
import { cart, Cartdata } from 'src/types/cart.type'

export default function Cart() {

  const[cart , setcart] = useState<cart>()
  const[currentId , setcurrentId] = useState<string>()
  const[cartloading, setcartloading]= useState(true)
  const[countload, setcountload]= useState(true)
  const[countDisable, setcountDisable]= useState(false)
  const {setCount} = useContext(CountContext)
 
useEffect(()=>{
  getAllCartData()
},[])

  async function getAllCartData(){
 setcartloading(true)
 const data:Cartdata = await  getCartData()
 setcart(data.data)
 setcartloading(false) 
  }

  async function deleteItem(id:string){
   const data = await removeFromCart(id)
  //  console.log(data);
   if(data.status == 'success'){
    toast.success('product deleted' , {position:'top-center'})
    // getAllCartData()
    setcart(data.data)
    const sum = data.data.products.reduce((total: number, item : {count: number}) => total + item.count, 0);
    setCount(sum)
   }

   
  }

  async function clearAll() {
    const data = await  clearCart()
    if(data.message == 'success'){
      toast.success('All Items Deleted' , {position:'top-center'})
      getAllCartData()
      setCount(0)
    }
  }

  async function updateCartCount(id:string , count: number) {
     setcurrentId(id)
     setcountload(true)
     setcountDisable(true)
    const data = await updateCart(id , count)
    if(data.status == 'success'){
      // getAllCartData() because i put loading in this fun
      setcart(data.data)
       const sum = data.data.products.reduce((total: number, item : {count: number}) => total + item.count, 0);
       setCount(sum) 
    }
     setcountload(false)
     setcountDisable(false)
  }

  return (
    <div className='container mx-auto my-10 px-5'>
      <h1 className='text-3xl font-bold'> Your Cart </h1>
      
      
      {cartloading ? 
      <div className='flex justify-center items-center fixed top-0 left-0 w-full h-full bg-gray-300/50 backdrop-blur-sm z-50'>
         <span className="loader"></span>
      </div> : 
        
       <>
       { cart?.totalCartPrice != 0 ? 
       <>
       <div className='flex justify-between items-center'>
        <h2 className='text-2xl my-5 text-red-600 dark:text-gray-200'> Total Price : {cart?.totalCartPrice}</h2>
        <Button onClick={clearAll} className='bg-red-500 p-5 rounded-2xl '>Clear All</Button>
      </div> 
       <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase  bg-gray-100 dark:bg-gray-700 dark:text-white">
            <tr className='text-center py-4  dark:text-white'>
              <th scope="col" className="px-16 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            { cart?.products.map((item)=>{
                return <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 ">
              <td className="p-4">
                <Image  src={item.product.imageCover} width={100} height={100}  className="w-16 md:w-32 max-w-full max-h-full rounded-2xl" alt={item.product.title}/>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.product.title}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <Button disabled = {countDisable} onClick={()=>updateCartCount(item.product._id , item.count -= 1)} className="cursor-pointer inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    {item.count == 1 ? <i className='fa-solid fa-trash'></i>
                    :<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                    }
                  </Button>
                  <div>
                    { countload && currentId == item.product._id ? <i className='fa-solid fa-spinner fa-spin'></i>
                      : <span>{item.count}</span>
                    }
                  </div>
                  <Button disabled = {countDisable} onClick={()=>updateCartCount(item.product._id , item.count += 1)} className="cursor-pointer inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </Button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.price}
              </td>
              <td className="px-6 py-4">
               <Button disabled = {countDisable} onClick={()=>{deleteItem(item.product._id)}} className='cursor-pointer bg-red-600 text-white'> <i className='fa-solid fa-trash'></i></Button>
              </td>
            </tr>
              })
            }

          </tbody>
          <tfoot className='text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-white text-xs uppercase'>
            <tr>
              <th colSpan={3} className='px-16 py-3'>
               total product price
              </th>
              <th colSpan={2} className='px-6 py-3'>
                {cart?.totalCartPrice}
              </th>
            </tr>
          </tfoot>
        </table>
      </div>

       <Button className='w-full bg-main my-5'>
          <Link href={'/checkoutsession/' + cart?._id} className='p-5 text-white'>CheckOutSession</Link>
        </Button>
 

       </>: 
        // empty cart
      <div id="alert-additional-content-2" className="my-8 p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
        <div className="flex items-center">
          <svg className="shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">The Cart is Empty</h3>
        </div>
        <div className="mt-2 mb-4 text-sm">
        The cart is empty , Please if you want to choose any product go back to home page .
         </div>
        <div className="flex">
          <Link href={'/products'}>
          <button type="button" className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-3 me-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
            <svg className="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
              <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
              Go Back
          </button>
          </Link>
          
        </div>
      </div>


       }
       </> }
      


    </div>
  )
}
