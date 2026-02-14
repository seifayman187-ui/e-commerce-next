import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {

    interface User {
        user : {
            name:string,
            email:string,
            role:string
        },
        token: string
    }

    interface Session {
        user : User['user']
    }

}
// دا كدا للtoken.user
declare module "next-auth/jwt" {

  interface JWT {
    user: User['user']
    // token: string
  }
}