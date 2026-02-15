'use server'

import { getUserToken } from "src/getToken"

export async function addToWish(id: string) {
    const token = await getUserToken()
    if (!token) return { status: "fail", message: "User not authenticated" };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`, {
        method: "POST",
        headers: {
            token: token as string,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId: id })
    })
    return await res.json()
}

export async function getWishData() {
    const token = await getUserToken()
    if (!token) return { status: "fail", message: "No token found" };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`, {
        
        cache: 'no-store', 
        headers: {
            token: token as string,
        }
    })
    return await res.json()
}

export async function removeWish(id: string) {
    const token = await getUserToken()
    if (!token) return { status: "fail", message: "No token found" };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`, {
        method: 'DELETE', 
        headers: {
            token: token as string,
        }
    })
    return await res.json()
}