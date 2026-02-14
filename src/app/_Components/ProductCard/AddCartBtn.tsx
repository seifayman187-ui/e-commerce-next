"use client"
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'
import { addToCart } from 'src/CartAction/CartAction'
import { Button } from 'src/components/ui/button'
import { CountContext } from 'src/CountProvider'

export default  function AddCartBtn({id}:{id:string}) {

  const [loadingBtn, setLoadingBtn] = useState(false)

   const {setCount} = useContext(CountContext)
 async function addProduct(id:string){
   
  try{
     setLoadingBtn(true)
    const data =await addToCart(id)
   
    if(data.status == 'success'){
        toast.success(data.message , {position:'top-center'})
         const sum = data.data.products.reduce((total: number, item : {count: number}) => total + item.count, 0);
         setCount(sum)
    setLoadingBtn(false)
    }
    else toast.error('Some thing wrong happened', {position:'top-center'})
    
  }catch(err){
    toast.error('please log in first',{position:'top-center'})
  }

  }

  return (
    
    <Button onClick={()=>{addProduct(id)}} className="rounded-2xl bg-main w-full text-white hover:cursor-pointer my-0">
      {loadingBtn ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Add to Cart'}
      
      </Button>
  )
}
