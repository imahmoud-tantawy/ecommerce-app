import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User{
    id:string;
    user:UserDataI;
    token:string
  }
  interface UserDataI{
     name:string,
        email: string,
        role: string
  }
}




declare module "next-auth/jwt" {
  interface JWT {
    user:UserDataI;
    idToken?: string
  }
}