'use server'

import { getUserToken } from "src/getToken"

export async  function addToWish(id:string){

    const token = await getUserToken()
    if(!token){
        throw new Error("User not authenticated")
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,{
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

export async function getWishData() {
    const token = await getUserToken()
    if(token){
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,{
            headers:{
                token: token as string,
            }
        })
        const data = await res.json()
        return data
    } 
    
}
export async function removeWish(id:string) {
    const token = await getUserToken()
    if(token){
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`,{
            method:'delete',
            headers:{
                token: token as string,
            }
        })
        const data = await res.json()
        return data
    } 
    
}

