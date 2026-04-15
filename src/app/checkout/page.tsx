import React from 'react'
import { getCart } from '@/actions/cart.action'
import { CartI } from '@/types/cart.type'
import { ChevronRight, Home, ShoppingCart, ShoppingBag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import { redirect } from 'next/navigation'
import { isActionError } from '@/lib/action-response'

export const dynamic = "force-dynamic"

export default async function CheckoutPage() {
  let cart: CartI | undefined = undefined;
  let shouldRedirect = false;

  try {
    const response = await getCart();
    if (isActionError(response)) {
      shouldRedirect = true;
    } else {
      cart = response;
    }
  } catch (error) {
    console.error("Checkout page error:", error);
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    redirect('/login');
  }

  if (!cart || cart.numOfCartItems === 0) {
    redirect('/cart');
  }

  return (
    <main className="bg-gray-50/50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        
        <nav className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link href="/cart" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <ShoppingCart className="w-3.5 h-3.5" />
            Cart
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-gray-900 flex items-center gap-1.5">
            <ShoppingBag className="w-3.5 h-3.5" />
            Checkout
          </span>
        </nav>

        {/*Header Section*/}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
               <ShoppingBag className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">Complete Your Order</h1>
              <p className="text-gray-500 mt-2 font-medium">Review your items and complete your purchase securely</p>
            </div>
          </div>
          
          <Link 
            href="/cart" 
            className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors font-bold uppercase tracking-widest text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
        </div>

        <CheckoutForm cart={cart} />

      </div>
    </main>
  )
}
