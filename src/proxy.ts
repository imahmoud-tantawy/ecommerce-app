import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function proxy(request: NextRequest) {
const {pathname} = request.nextUrl
    // console.log(pathname ,"my request");
    
const token = await getToken({req : request});

const isAuthPages = ["/login" , "/register"].includes(pathname);
if(token && isAuthPages)
    return NextResponse.redirect(new URL('/products', request.url))

if(!token && !isAuthPages)
        return NextResponse.redirect(new URL('/login', request.url))


return NextResponse.next()

}
export const config = {
  matcher: [
    "/products",
    "/login",
    "/register",
    "/wishlist",
    "/cart",
    "/brands",
    "/checkout",
    "/allorders"
  ],
}