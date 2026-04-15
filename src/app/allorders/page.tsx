import React from 'react'
import { getUserOrders } from '@/actions/order.action'
import { OrderI } from '@/types/order.type'
import { ChevronRight, Home, Package, Calendar, MapPin, CreditCard, Banknote, ChevronDown, ShoppingBag, ArrowRight } from 'lucide-react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { isActionError } from '@/lib/action-response'

export const dynamic = "force-dynamic"

export default async function AllOrdersPage() {
  let orders: OrderI[] = [];
  let shouldRedirect = false;

  try {
     const response = await getUserOrders()
     if (isActionError(response)) {
      shouldRedirect = true;
     } else {
      orders = response
     }
  } catch (error) {
     console.error("AllOrders page error:", error);
     shouldRedirect = true;
  }

  if (shouldRedirect) {
    redirect('/login');
  }

  return (
    <main className="bg-gray-50/50 min-h-screen py-10">
      <div className="container mx-auto px-4">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-gray-900 flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5" />
            My Orders
          </span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Package className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">My Orders</h1>
              <p className="text-gray-500 mt-1 font-medium italic">Track and manage your {orders.length} orders</p>
            </div>
          </div>

          <Link
            href="/products"
            className="group flex items-center gap-3 px-6 py-3.5 bg-white hover:bg-primary hover:text-white rounded-2xl text-gray-900 font-black text-sm transition-all shadow-sm border border-gray-100"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 overflow-hidden group"
              >
                <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8 lg:items-center">

                  {/* Item Preview */}
                  <div className="relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gray-50 border border-gray-100 p-4 flex items-center justify-center overflow-hidden">
                      <Image
                        src={order.cartItems[0]?.product.imageCover || "/placeholder.png"}
                        alt="Order item"
                        width={128}
                        height={128}
                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    {order.cartItems.length > 1 && (
                      <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-black border-4 border-white shadow-lg">
                        +{order.cartItems.length - 1}
                      </div>
                    )}
                  </div>

                  {/* Order Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${order.isPaid ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${order.isPaid ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                        {order.isPaid ? 'Paid & On the way' : 'On the way'}
                      </span>
                      <span className="text-gray-300 text-xs"># {order.id}</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                      <div className="space-y-1">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" /> Date
                        </p>
                        <p className="text-sm font-bold text-gray-700">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter flex items-center gap-1.5">
                          <ShoppingBag className="w-3 h-3" /> Items
                        </p>
                        <p className="text-sm font-bold text-gray-700">{order.cartItems.reduce((acc, item) => acc + item.count, 0)} items</p>
                      </div>
                      <div className="space-y-1 col-span-2 md:col-span-1">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" /> Delivery to
                        </p>
                        <p className="text-sm font-bold text-gray-700 truncate capitalize">{order.shippingAddress.city}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status & Price */}
                  <div className="lg:text-right space-y-4 lg:min-w-50">
                    <div className="flex lg:justify-end">
                      <div className="p-3 bg-gray-50 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        {order.paymentMethodType === 'card' ? <CreditCard className="w-6 h-6" /> : <Banknote className="w-6 h-6" />}
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-gray-900">{order.totalOrderPrice} <span className="text-xs text-gray-400 font-bold ml-1">EGP</span></p>
                    </div>
                    <button className="flex items-center gap-2 lg:ml-auto text-gray-400 hover:text-primary transition-colors font-black text-xs uppercase tracking-widest px-4 py-2 hover:bg-primary/5 rounded-xl">
                      Details
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-16 text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-gray-200" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">No orders found</h2>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">You haven't placed any orders yet. Explore our products and start shopping!</p>
              <Link href="/products" className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                Browse Products
              </Link>
            </div>
          )}
        </div>

      </div>
    </main>
  )
}
