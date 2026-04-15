import { removeProductFromCart, updateProductFromCart } from '@/actions/cart.action'
import { CartProductI } from '@/types/cart.type'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Spinner } from '../ui/spinner'
import { CartContext } from '@/provider/cart-provider'
import { Trash2 } from 'lucide-react'
import { isActionError } from '@/lib/action-response'

export default function CartItem({ item, setProducts }: { item: CartProductI, setProducts: (products: CartProductI[]) => void }) {
  // console.log(item)
  const [isLoading, setIsLoading] = useState(false)

  const [isLoadingUpdateInc, setIsLoadingUpdateInc] = useState(false)
  const [isLoadingUpdateDec, setIsLoadingUpdateDec] = useState(false)
  const { getCartData } = useContext(CartContext)

  const [productCounter, setProductCounter] = useState(0)
  useEffect(() => {
    setProductCounter(item.count)
  }, [item, setProducts])
  async function removeProduct(prodId: string) {
    try {
      setIsLoading(true)
      const response = await removeProductFromCart(prodId)
      if (isActionError(response)) {
        toast.error(response.message)
        return
      }
      toast.success(response.message || "Removed from cart")
      setProducts(response.data.products)
      getCartData()
    } catch (error) {
      toast.error("Unable to update your cart right now.")
    } finally {
      setIsLoading(false)
    }
  }

  async function updateCart(prodId: string, count: number) {
    try {
      if (count > productCounter) {
        setIsLoadingUpdateInc(true)

      } else {
        setIsLoadingUpdateDec(true)
      }
      const response = await updateProductFromCart(prodId, count);
      if (isActionError(response)) {
        toast.error(response.message)
        return
      }
      toast.success(response.message || "Cart updated")
      setProducts(response.data.products)
      getCartData()
    } catch (error) {
      toast.error("Unable to update your cart right now.")
    } finally {
      setIsLoadingUpdateInc(false)
      setIsLoadingUpdateDec(false)
    }
  }
  return (
    <>
      {/* Product Card */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all gap-6 group">
        <div className="flex items-center gap-6 w-full sm:w-auto">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-2xl shrink-0 relative overflow-hidden group-hover:bg-white transition-colors">
            <Image
              src={item.product?.imageCover || '/placeholder.png'}
              alt={item.product?.title || 'Product item'}
              fill
              className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
              sizes='200'
            />
          </div>

          <div className="grow">
            <h3 className="font-bold text-gray-900 text-lg sm:text-xl line-clamp-1 group-hover:text-primary transition-colors cursor-pointer">
              {item.product.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{item.product.brand.name}</span>
              <span className="text-gray-200">|</span>
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{item.product.category.name}</span>
            </div>

            <div className="flex items-center mt-4 border border-gray-100 rounded-xl w-fit bg-gray-50 overflow-hidden">
              <button
                disabled={isLoadingUpdateDec || productCounter <= 1}
                onClick={() => updateCart(item.product._id, productCounter - 1)}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-red-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed font-bold text-xl"
              >
                {isLoadingUpdateDec ? <Spinner className="size-3" /> : "-"}
              </button>
              <span className="w-12 text-center font-black text-gray-900 text-sm">{productCounter}</span>
              <button
                disabled={isLoadingUpdateInc}
                onClick={() => updateCart(item.product._id, productCounter + 1)}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed font-bold text-lg"
              >
                {isLoadingUpdateInc ? <Spinner className="size-3" /> : "+"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto sm:text-right gap-4">
          <div className="space-y-1">
            <p className="font-black text-2xl text-gray-900">{item.price} <span className="text-sm font-bold text-gray-400">EGP</span></p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-right">Unit Price: {item.price / productCounter} EGP</p>
          </div>

          <button
            disabled={isLoading}
            onClick={() => removeProduct(item.product._id)}
            className="w-10 h-10 sm:w-auto sm:px-4 sm:h-10 rounded-full sm:rounded-xl border border-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all flex items-center justify-center gap-2 group/remove"
          >
            {isLoading ? <Spinner className="size-3 text-red-500" /> : <Trash2 className='w-4 h-4' />}
            <span className="hidden sm:inline font-bold uppercase tracking-widest text-[10px]">Remove</span>
          </button>
        </div>
      </div>
    </>
  )
}
