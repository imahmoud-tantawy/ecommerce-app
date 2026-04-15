"use client"

import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { Heart } from 'lucide-react'
import { addProductToWishlist } from '@/actions/wishlist.action'
import { toast } from 'sonner'
import { Spinner } from '../ui/spinner'
import { WishlistContext } from '@/provider/wishlist-provider'
import { cn } from '@/lib/utils'
import { isActionError } from '@/lib/action-response'

export default function AddToWishlistButton({ 
  productId, 
  isIconOnly = false,
  className 
}: { 
  productId: string, 
  isIconOnly?: boolean,
  className?: string
}) {

  const [isLoading, setIsLoading] = useState(false)
  const { refreshWishlist } = useContext(WishlistContext)

  async function handleAdd() {
    if (!productId) return

    try {
      setIsLoading(true)

      const response = await addProductToWishlist(productId)
      if (isActionError(response)) {
        toast.error(response.message)
        return
      }

      if (response.status === "success") {
        toast.success(response.message || "Added to wishlist ❤️")
        await refreshWishlist()
      } else {
        toast.error(response.message || "Failed to add to wishlist")
      }

    } catch (error) {
      toast.error("Unable to update wishlist right now.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isIconOnly) {
    return (
      <button
        disabled={isLoading || !productId}
        onClick={handleAdd}
        className={cn(
          "p-2 rounded-full hover:bg-red-50 transition-colors group disabled:opacity-50 h-fit",
          className
        )}
        title="Add to wishlist"
      >
        {isLoading ? (
          <Spinner className="w-5 h-5" />
        ) : (
          <Heart className="w-6 h-6 text-gray-400 group-hover:text-red-500 group-active:scale-110 transition-all" />
        )}
      </button>
    )
  }

  return (
    <Button
      disabled={isLoading || !productId}
      onClick={handleAdd}
      className={cn("grow cursor-pointer flex items-center gap-2", className)}
    >
      {isLoading ? (
        <>
          <Spinner />
          Adding...
        </>
      ) : (
        <>
          <Heart className="w-4 h-4" />
          Add To Wishlist
        </>
      )}
    </Button>
  )
}
