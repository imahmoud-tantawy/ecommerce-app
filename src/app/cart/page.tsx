"use client"
import { clearCart, getCart } from '@/actions/cart.action';
import CartItem from '@/components/cart/cart-item';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { CartI, CartDataI, CartProductI } from '@/types/cart.type';
import { Trash2 } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link';
import { CartContext } from '@/provider/cart-provider';
import { isActionError } from '@/lib/action-response';
import { toast } from 'sonner';

export default function Cart() {
  const [cartData, setCartData] = useState<CartDataI | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingClear, setIsLoadingClear] = useState(false)
  const { getCartData } = useContext(CartContext)

  const products = cartData?.products || []

  async function getAllProductCart() {
    try {
      setIsLoading(true)
      const response = await getCart()
      if (isActionError(response)) {
        toast.error(response.message)
        setCartData(null)
        return
      }
      setCartData(response.data)
    } catch (error) {
      toast.error("Unable to load your cart right now.")
    } finally {
      setIsLoading(false)
    }
  }

  async function clearOurCart() {
    try {
      setIsLoadingClear(true)
      const response = await clearCart()
      setCartData(response.data)
      getCartData()
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingClear(false)
    }
  }

  function handleSetProducts(newProducts: CartProductI[]) {
    if (cartData) {
      setCartData({ ...cartData, products: newProducts })
    }
  }

  useEffect(() => {
    getAllProductCart();
  }, [])

  // console.log(myTohen);

  if (isLoading) {
    return (
      <div className='h-screen flex items-center flex-col gap-6 justify-center bg-primary'>
        <div className="flex items-center gap-1.5 animate-pulse">
          <div className='flex items-center justify-center text-white'>
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L19.5 9H26.5L21 14.5L23 21.5L16 18L9 21.5L11 14.5L5.5 9H12.5L16 2Z" fill="currentColor" />
            </svg>
          </div>
          <span className='text-3xl font-bold text-white tracking-tight'>Fresh <span className="text-white/80">Cart</span></span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Spinner className='size-8 text-white' />
          <p className="text-sm font-medium text-white/60 animate-bounce">Loading your cart...</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className='h-[70vh] flex items-center flex-col gap-8 justify-center bg-gray-50 px-4'>
        <div className="w-24 h-24 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center">
          <Trash2 className="w-12 h-12 text-gray-200" />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Your Cart is Empty</h2>
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">Looks like you haven't added anything to your cart yet. Start shopping and explore our products!</p>
        </div>
        <Link href="/products" className="bg-primary hover:bg-emerald-700 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-xl shadow-primary/20 active:scale-95">
          Start Shopping
        </Link>
      </div>
    )
  }

  const totalItems = products.reduce((acc, curr) => acc + curr.count, 0)
  const totalPrice = products.reduce((acc, curr) => acc + (curr.price * curr.count), 0)

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900">Shopping Cart</h1>
            <p className="text-gray-500 mt-2 font-medium">There are <span className="text-primary font-bold">{products.length}</span> unique items in your cart</p>
          </div>
          <button
            onClick={() => clearOurCart()}
            className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors font-bold uppercase tracking-widest text-xs"
          >
            {isLoadingClear ? <Spinner className="size-4" /> : <Trash2 className='w-4 h-4' />}
            <span>Clear Cart</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 space-y-6">
            {products && products.map((item: CartProductI) => (
              <CartItem key={item._id} item={item} setProducts={handleSetProducts} />
            ))}
          </div>

          {/*Right Side*/}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 h-fit space-y-8 sticky top-32">
              <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="text-gray-900">{cartData?.totalCartPrice || 0} EGP</span>
                </div>

                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Shipping</span>
                  <span className="text-emerald-500 font-bold uppercase text-xs tracking-wider">Free</span>
                </div>

                <div className="border-t border-gray-100 pt-6 flex justify-between">
                  <span className="text-xl font-bold text-gray-900">Total Price</span>
                  <span className="text-2xl font-black text-primary">{cartData?.totalCartPrice || 0} EGP</span>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <Link href="/checkout" className="block w-full">
                  <Button className="w-full h-14 rounded-2xl bg-gray-900 hover:bg-black text-white font-black text-lg transition-all shadow-xl active:scale-[0.98]">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link href="/products" className="block w-full">
                  <Button variant="outline" className="w-full h-14 rounded-2xl border-2 border-gray-100 hover:bg-gray-50 text-gray-600 font-bold text-lg transition-all">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center gap-4 pt-6 opacity-30">
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

