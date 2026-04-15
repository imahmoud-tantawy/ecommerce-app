"use client"

import { getWishList } from '@/actions/wishlist.action'
import { isActionError } from '@/lib/action-response'
import { useSession } from 'next-auth/react'
import React, { createContext, useEffect, useState } from 'react'

interface WishlistContextType {
  totalItems: number
  isLoading: boolean
  refreshWishlist: () => Promise<void>
}

export const WishlistContext = createContext<WishlistContextType>({
  totalItems: 0,
  isLoading: false,
  refreshWishlist: async () => {}
})

export default function WishlistProvider({ children }: { children: React.ReactNode }) {

  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { status } = useSession()

  async function refreshWishlist() {
    try {
      setIsLoading(true)

      const response = await getWishList()
      if (isActionError(response)) {
        setTotalItems(0)
        return
      }

      const products = response?.data || []

      setTotalItems(products.length)

    } catch (error) {
      setTotalItems(0) 
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      refreshWishlist()
      return
    }

    if (status === "unauthenticated") {
      setTotalItems(0)
    }
  }, [status])

  return (
    <WishlistContext.Provider value={{ totalItems, isLoading, refreshWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}