"use client"
import { getCart } from '@/actions/cart.action'
import { isActionError } from '@/lib/action-response'
import { CartI } from '@/types/cart.type'
import { useSession } from 'next-auth/react'
import React, { createContext, useEffect, useState } from 'react'

interface CartContextI{
  nOfCartItems:number
  isLoading:boolean
  getCartData:()=>void
}
export const CartContext = createContext<CartContextI>({
  nOfCartItems:0,
  isLoading:false,
  getCartData:()=>{}
})
export default function CartContextProvider({children}:{children:React.ReactNode}) {

  const [nOfCartItems, setnOfCartItems] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { status } = useSession()
 async function getCartData(){

  try {
    setIsLoading(true)
     const response = await getCart()
     if (isActionError(response)) {
      setnOfCartItems(0)
      return
     }
     const cartResponse = response as CartI

     const totalItems = cartResponse.data.products.reduce((acc: number, counter) => acc + counter.count, 0)
  setnOfCartItems(totalItems)
  } catch {
    setnOfCartItems(0)
  }finally{
    setIsLoading(false)
  }
 
}
useEffect(() => {
if (status === "authenticated") {
  getCartData()
  return
}

if (status === "unauthenticated") {
  setnOfCartItems(0)
}
}, [status])
  return (
    <>
    <CartContext.Provider value={{nOfCartItems , isLoading , getCartData}}>

    {children}
    </CartContext.Provider>
    
    
    </>
  )
}
