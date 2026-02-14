'use server'

import { getUserId, getUserToken } from "src/getToken"


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com";
const APP_URL = process.env.NEXT_URL || "http://localhost:3000";

export async function creditOrder(cartId: string, shippingData: {details:string , phone:string , city: string}) {
    const token = await getUserToken()
    if(token){
        // عدلنا السطر ده عشان نضمن وجود الروابط كاملة
        const res = await fetch(`${BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${APP_URL}`, {
        method: 'POST',
        headers:{
            token: token as string,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            shippingAddress: shippingData // تأكد إن الـ API مستني shippingAddress مش shippingData
        })
        })
        const data = await res.json()
        return data 
    }
}

export async function cashOrder(cartId: string, shippingData: {details:string , phone:string , city: string}) {
    const token = await getUserToken()
    if(token){
        const res = await fetch(`${BASE_URL}/api/v1/orders/${cartId}`, {
        method: 'POST',
        headers:{
            token: token as string,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            shippingAddress: shippingData // ملاحظة: الـ API بتاع Route بيحتاج الكلمة دي كدة بالظبط
        })
        })
        const data = await res.json()
        return data 
    }
}

export async function getUserOrders(){
    const userId = await getUserId()
    if(userId){
        const res = await fetch(`${BASE_URL}/api/v1/orders/user/${userId}`, {
        method: 'GET',
        headers:{
            "Content-Type":"application/json"}
        })
        const data = await res.json()
        return data 
    }
}