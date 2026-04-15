"use client"
import React, { useContext, useState } from 'react'
import { addProducToCart } from '@/actions/cart.action';
import { toast } from 'sonner';
import { Spinner } from '../ui/spinner';
import { CartContext } from '@/provider/cart-provider';
import { isActionError } from '@/lib/action-response';

import { Plus } from 'lucide-react'

export default function AddToCartBtn({ prodId, count = 1, isFullWidth = false }: { prodId: string, count?: number, isFullWidth?: boolean }) {
  const [isLoading, setIsLoading] = useState(false)
  const { getCartData } = useContext(CartContext)
  async function addToCart(productId: string) {

    try {
      setIsLoading(true)
      const response = await addProducToCart(productId)
      if (isActionError(response)) {
        toast.error(response.message)
        return
      }
      toast.success(response.message || "Added to cart")
      getCartData()
    } catch (error) {
      toast.error("Unable to add this product right now.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isFullWidth) {
    return (
      <button
        disabled={isLoading}
        onClick={() => addToCart(prodId)}
        className="w-full h-12 rounded-xl flex items-center justify-center gap-2 transition bg-primary text-white hover:bg-emerald-700 disabled:opacity-70 font-bold active:scale-95 shadow-lg shadow-primary/10"
      >
        {isLoading ? <Spinner className="size-4 text-white" /> : <Plus className="w-5 h-5" />}
        <span>Add to Cart</span>
      </button>
    )
  }

  return (
    <button
      disabled={isLoading}
      onClick={() => addToCart(prodId)}
      className="h-10 w-10 rounded-full flex items-center justify-center transition bg-primary text-white hover:bg-primary/90 disabled:opacity-70 active:scale-90"
    >
      {isLoading ? <Spinner className="size-4 text-white" /> : <Plus className="w-5 h-5" />}
    </button>
  )
}

