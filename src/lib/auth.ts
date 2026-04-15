import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function getUserToken(){
const cookieStore = await cookies()
const sessionToken =
  cookieStore.get("__Secure-next-auth.session-token")?.value ??
  cookieStore.get("next-auth.session-token")?.value ??
  cookieStore.get("__Secure-authjs.session-token")?.value ??
  cookieStore.get("authjs.session-token")?.value

if (!sessionToken) return null

const token = await decode({ token: sessionToken, secret: process.env.AUTH_SECRET! })
return (token?.token as string | undefined) ?? null
}