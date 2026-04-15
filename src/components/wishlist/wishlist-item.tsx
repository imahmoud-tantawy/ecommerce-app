"use client"

import { removeProductFromWishList } from '@/actions/wishlist.action'
import { WishlistProductI } from '@/types/wishlist.type'
import { ProductI } from '@/types/cart.type'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'
import { Spinner } from '../ui/spinner'
import { WishlistContext } from '@/provider/wishlist-provider'
import { Trash2 } from 'lucide-react'
import { isActionError } from '@/lib/action-response'

import AddToCartBtn from '../cart/AddToCartBtn'

export default function WishlistItem({
  item,
  setProducts
}: {
  item: WishlistProductI,
  setProducts: React.Dispatch<React.SetStateAction<WishlistProductI[]>>
}) {

  const [isRemoving, setIsRemoving] = useState(false)
  const { refreshWishlist } = useContext(WishlistContext)

  // The GET /wishlist endpoint always returns a populated ProductI object.
  // We cast once here so every access below is safe and clean.
  async function handleRemove() {
    try {
      setIsRemoving(true)

      const response = await removeProductFromWishList(item._id)
      if (isActionError(response)) {
        toast.error(response.message)
        return
      }

      if (response.status === "success") {
        toast.success(response.message || "Removed from wishlist")

        // ✅ Update local state directly
        setProducts(prev =>
          prev.filter(p => p._id !== item._id)
        )

        await refreshWishlist()
      } else {
        toast.error(response.message || "Failed to remove item")
      }

    } catch (error) {
      toast.error("Unable to update wishlist right now.")
    } finally {
      setIsRemoving(false)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all gap-6 group">

      <div className="flex items-center gap-6 w-full sm:w-auto">
        <div className="w-24 h-24 sm:w-32 sm:h-32 relative flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden group-hover:bg-white transition-colors">
          <Image
            src={item.imageCover}
            alt={item.title}
            fill
            className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="flex-grow">
          <h3 className="font-bold text-gray-900 text-lg sm:text-xl line-clamp-1 group-hover:text-primary transition-colors cursor-pointer">{item.title}</h3>
          <div className="flex items-center gap-2 mt-1">
             <span className="text-primary font-bold text-lg">{item.price} EGP</span>
             <span className="text-gray-300 text-xs">|</span>
             <span className="text-gray-500 text-xs font-medium uppercase tracking-tighter">In Stock</span>
          </div>
          <button
            onClick={handleRemove}
            disabled={isRemoving}
            className="text-gray-400 text-xs mt-4 flex items-center gap-2 hover:text-red-500 transition-colors group/trash"
          >
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/trash:bg-red-50 transition-colors">
               {isRemoving ? <Spinner className="size-3" /> : <Trash2 className="w-4 h-4" />}
            </div>
            <span className="font-bold uppercase tracking-widest">Remove Item</span>
          </button>
        </div>
      </div>

      <div className="w-full sm:w-auto sm:min-w-[180px]">
        <AddToCartBtn prodId={item._id} isFullWidth={true} />
      </div>

    </div>
  )
}