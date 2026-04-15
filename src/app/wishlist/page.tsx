"use client"
import { getWishList } from '@/actions/wishlist.action'
import WishlistItem from '@/components/wishlist/wishlist-item'
import { Spinner } from '@/components/ui/spinner'
import { WishlistProductI } from '@/types/wishlist.type'
import { Heart } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { WishlistContext } from '@/provider/wishlist-provider'
import { Button } from '@/components/ui/button'
import { isActionError } from '@/lib/action-response'
import { toast } from 'sonner'

export default function Wishlist() {

  const [products, setProducts] = useState<WishlistProductI[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { refreshWishlist } = useContext(WishlistContext)

  async function fetchWishlist() {
    try {
      setIsLoading(true)

      const response = await getWishList()
      if (isActionError(response)) {
        toast.error(response.message)
        setProducts([])
        return
      }

      const data = response?.data || []

      setProducts(data)

    } catch (error) {
      toast.error("Unable to load wishlist right now.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  if (isLoading) {
    return (
      <div className='h-[70vh] flex items-center justify-center'>
        <Spinner className="size-10 text-primary" />
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className='h-[70vh] flex flex-col items-center justify-center gap-6'>
        <div className="bg-white p-8 rounded-full shadow-sm border">
          <Heart className="w-16 h-16 text-gray-200" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Your wishlist is empty</h2>
          <p className="text-gray-500 mt-2">Add items that you like to your wishlist.</p>
        </div>
        <Link href="/products">
          <Button className="rounded-full px-8 py-6 h-auto text-lg">
            Go To Shopping
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">

        <header className="mb-10">
          <h1 className="text-3xl font-black text-gray-900">My Wishlist</h1>
          <p className="text-gray-500 mt-1">
            There are <span className="text-primary font-bold">{products.length}</span> items in your wishlist
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {products.map(product => (
            <WishlistItem
              key={product._id}
              item={product}
              setProducts={setProducts}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
