"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

async function getDecryptedSession() {
    const tokenName = process.env.NODE_ENV === 'production' 
        ? '__Secure-next-auth.session-token' 
        : "next-auth.session-token";

    const cookiesData = await cookies();
    const encryptedToken = cookiesData.get(tokenName)?.value;

    if (!encryptedToken) return null;

    try {
        return await decode({
            token: encryptedToken,
            secret: process.env.NEXTAUTH_SECRET!,
        });
    } catch (error) {
        console.error("JWT Decode Error:", error);
        return null;
    }
}

export async function getUserToken() {
    const session = await getDecryptedSession();
    return session?.token; 
}

export async function getUserId() {
    const session = await getDecryptedSession();
    return session?.sub; 
}
