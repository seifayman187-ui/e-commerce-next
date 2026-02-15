'use server'

import { getUserToken } from "src/getToken"
import { Cartdata } from "src/types/cart.type"

export async function getCartData() {
    try {
        const token = await getUserToken()
        if (!token) return { status: "error", message: "User not authenticated" };

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
            headers: {
                token: token as string
            },
            
            cache: 'no-store' 
        })

        const data: Cartdata = await res.json()
        return data
    } catch (error) {
        return { status: "error", message: "Failed to fetch cart" }
    }
}

export async function addToCart(id: string) {
    const token = await getUserToken()
    if (!token) return { status: "error", message: "User not authenticated" };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
        method: "POST",
        headers: {
            token: token as string,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId: id })
    })
    return await res.json()
}

export async function removeFromCart(id: string) {
    const token = await getUserToken()
    if (!token) return { status: "error", message: "User not authenticated" };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`, {
        method: 'DELETE',
        headers: {
            token: token as string
        }
    })
    return await res.json()
}

export async function clearCart() {
    const token = await getUserToken()
    if (!token) return { status: "error", message: "User not authenticated" };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
        method: 'DELETE',
        headers: {
            token: token as string
        }
    })
    return await res.json()
}

export async function updateCart(id: string, count: number) {
    const token = await getUserToken()
    if (!token) return { status: "error", message: "User not authenticated" };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ count: count }),
        headers: {
            token: token as string,
            "Content-Type": "application/json"
        }
    })
    return await res.json()
}