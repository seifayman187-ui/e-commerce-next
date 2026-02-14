'use server'

import { getUserToken } from "src/getToken"
import { Cartdata } from "src/types/cart.type"

export async function getCartData (){

    const token = await getUserToken()
    if(!token){
        throw new Error("User not authenticated")
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,{
        headers:{
            token: token as string
        }
    })

    const data:Cartdata = await res.json()
    return data
}

export async function addToCart (id:string){
    const token = await getUserToken()
    if(!token){
        throw new Error("User not authenticated")
    }
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,{
        method:"POST",
        headers:{
            token: token as string,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            productId:id
        })
    })
    const data = await res.json()
    return data
}
export async function removeFromCart (id:string){
    const token = await getUserToken()
     if(!token){
        throw new Error("User not authenticated")
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,{
        method:'delete',
        headers:{
            token: token as  string
        }
    })
    const data = await res.json()
    return data ;
}

export async function clearCart() {
    const token = await getUserToken()
     if(!token){
        throw new Error("User not authenticated")
    }
     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,{
        method:'delete',
        headers:{
            token: token as string
        }
    })
    const data = await res.json()
    return data ;
    
}

export async function updateCart(id:string, count:number) {
    const token = await getUserToken()
     if(!token){
        throw new Error("some thing went wrong")
    }
     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,{
        method:'put',
        body:JSON.stringify({
            
            count:count
        }),
        headers:{
            token: token as string ,
            "Content-Type":"application/json"
        }
    })
    const data = await res.json()
    return data ;
    
}

