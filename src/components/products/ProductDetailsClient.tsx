"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Star, Truck, ShieldCheck, RotateCcw, Clock, Share2, Heart, Minus, Plus, ShoppingCart, Zap, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react'
import { productI } from '@/types/products.type'
import AddToCartBtn from '../cart/AddToCartBtn'
import AddToWishlistButton from '../wishlist/AddToWishlistBtn'

interface Props {
  product: productI
}

export default function ProductDetailsClient({ product }: Props) {
  const [activeImage, setActiveImage] = useState(product.imageCover)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('details')

  const totalPrice = product.price * quantity

  const images = [product.imageCover, ...product.images]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
      
      {/* Left Side */}
      <div className="space-y-6">
        <div className="relative aspect-4/5 md:aspect-square rounded-[40px] overflow-hidden bg-gray-50 border border-gray-100 shadow-inner group">
          <Image
            src={activeImage}
            alt={product.title}
            fill
            priority
            className="object-contain p-8 md:p-12 transition-all duration-700 ease-in-out group-hover:scale-110"
          />
          <div className="absolute top-8 left-8 flex flex-col gap-2">
            <span className="bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl shadow-primary/20">
              {product.category.name}
            </span>
            <span className="bg-gray-900 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl">
              {product.brand.name}
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 px-2">
          {images.map((img, i) => (
            <button 
              key={i} 
              onClick={() => setActiveImage(img)}
              className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white border-2 transition-all duration-300 ${activeImage === img ? 'border-primary ring-4 ring-primary/10 scale-105 shadow-lg' : 'border-gray-100 hover:border-primary/50 grayscale hover:grayscale-0'}`}
            >
              <Image src={img} alt={`Gallery ${i}`} fill className="object-contain p-2" />
            </button>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col">
        <div className="space-y-6">
          <div className="space-y-3">
             <div className="flex items-center gap-2">
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">{product.category.name}</span>
                <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">Deals</span>
             </div>
             <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">
               {product.title}
             </h1>
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.ratingsAverage) ? 'fill-current' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-900">{product.ratingsAverage} <span className="text-gray-400 font-medium ml-1">(5 reviews)</span></span>
             </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-black text-gray-900">{product.price} EGP</span>
            <span className="px-2 py-0.5 bg-red-50 text-red-500 text-[10px] font-bold rounded uppercase">In Stock</span>
          </div>

          <p className="text-gray-500 leading-relaxed text-sm lg:text-base font-medium">
            {product.description}
          </p>

          <div className="p-8 bg-gray-50/50 rounded-[32px] border border-gray-100 space-y-8">
            <div className="flex items-center justify-between">
               <span className="text-gray-400 text-xs font-black uppercase tracking-widest">Quantity</span>
               <div className="flex items-center bg-white rounded-2xl border border-gray-100 p-1 shadow-sm">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-black text-gray-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
               </div>
               <span className="text-gray-400 text-[10px] font-bold">{product.quantity} available</span>
            </div>

            <div className="h-px bg-gray-100" />

            <div className="flex items-center justify-between font-black text-gray-900">
               <span className="text-sm uppercase tracking-widest text-gray-400">Total Price:</span>
               <span className="text-2xl text-primary">{totalPrice.toLocaleString()} EGP</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <AddToCartBtn prodId={product._id} count={quantity} isFullWidth={true} />
             <button className="h-14 bg-gray-900 hover:bg-black text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-gray-200 group active:scale-95">
               <Zap className="w-5 h-5 fill-amber-400 text-amber-400 group-hover:scale-125 transition-transform" />
               Buy Now
             </button>
          </div>

          <div className="flex items-center gap-4">
             <div className="flex-1">
                <AddToWishlistButton productId={product._id} isIconOnly={false} className="w-full h-12 rounded-2xl border-2 border-gray-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all font-black text-xs uppercase tracking-[0.2em] gap-3" />
             </div>
             <button className="h-12 w-12 rounded-2xl border-2 border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-all">
                <Share2 className="w-5 h-5" />
             </button>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4">
             <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                <Truck className="w-4 h-4 text-emerald-500" /> Free Delivery
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                <RotateCcw className="w-4 h-4 text-blue-500" /> 30 Days Return
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-500" /> Secure Payment
             </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 mt-16 space-y-12">
        <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar">
           {[
             { id: 'details', label: 'Product Details', icon: CheckCircle2 },
             { id: 'reviews', label: `Reviews (5)`, icon: Star },
             { id: 'shipping', label: 'Shipping & Returns', icon: Truck }
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`flex items-center gap-3 px-8 py-5 text-sm font-black uppercase tracking-widest transition-all relative shrink-0 ${activeTab === tab.id ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
             >
               <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-primary' : 'text-gray-300'}`} />
               {tab.label}
               {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full shadow-[0_-4px_10px_rgba(16,185,129,0.3)]" />}
             </button>
           ))}
        </div>

        <div className="grid grid-cols-1 gap-12">
           {activeTab === 'details' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-6">
                   <div>
                      <h3 className="text-xl font-black text-gray-900 mb-2">About this Product</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{product.description}</p>
                   </div>
                   <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                      <table className="w-full text-sm">
                         <tbody>
                            {[
                              { label: 'Category', value: product.category.name },
                              { label: 'Subcategory', value: product.subcategory.name },
                              { label: 'Brand', value: product.brand.name },
                              { label: 'Items Sold', value: `${product.sold}+ items` }
                            ].map((row, i) => (
                              <tr key={i} className={i % 2 === 0 ? 'bg-gray-50/50' : ''}>
                                 <td className="px-6 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-widest">{row.label}</td>
                                 <td className="px-6 py-4 font-black text-gray-700 text-right">{row.value}</td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>

                <div className="space-y-6">
                   <h3 className="text-xl font-black text-gray-900">Key Features</h3>
                   <div className="grid grid-cols-1 gap-4">
                      {[
                        'Premium Quality Product',
                        '100% Authentic Guarantee',
                        'Fast & Secure Packaging',
                        'Quality Tested'
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-primary/30 transition-colors group">
                           <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                              <CheckCircle2 className="w-5 h-5" />
                           </div>
                           <span className="font-bold text-gray-700">{feature}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'reviews' && (
             <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-50/50 p-8 rounded-[32px] border border-gray-100">
                   <div className="text-center md:border-r border-gray-200 md:pr-12">
                      <div className="text-6xl font-black text-gray-900 mb-2">{product.ratingsAverage}</div>
                      <div className="flex justify-center gap-1 text-amber-400 mb-2">
                         {[...Array(5)].map((_, i) => (
                           <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.ratingsAverage) ? 'fill-current' : 'text-gray-200'}`} />
                         ))}
                      </div>
                      <p className="text-xs font-bold text-gray-400 tracking-wider uppercase">Based on 5 reviews</p>
                   </div>
                   
                   <div className="flex-1 w-full space-y-3">
                      {[
                        { stars: 5, count: '25%' },
                        { stars: 4, count: '60%' },
                        { stars: 3, count: '25%' },
                        { stars: 2, count: '5%' },
                        { stars: 1, count: '5%' }
                      ].map((rating) => (
                        <div key={rating.stars} className="flex items-center gap-4">
                           <span className="w-12 text-[10px] font-black text-gray-400 uppercase tracking-tighter">{rating.stars} star</span>
                           <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: rating.count }} />
                           </div>
                           <span className="w-10 text-[10px] font-black text-gray-400 text-right">{rating.count}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="py-12 text-center space-y-6">
                   <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                      <Star className="w-10 h-10 text-gray-200" />
                   </div>
                   <div>
                      <h4 className="text-lg font-bold text-gray-900">Customer reviews will be displayed here.</h4>
                      <button className="text-primary font-black uppercase tracking-[0.2em] text-xs mt-4 hover:underline">Write a Review</button>
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'shipping' && (
             <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="p-8 rounded-[32px] bg-emerald-50/50 border border-emerald-100 space-y-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center">
                            <Truck className="w-6 h-6" />
                         </div>
                         <h3 className="text-xl font-black text-gray-900">Shipping Information</h3>
                      </div>
                      <ul className="space-y-4">
                         {[
                           'Free shipping on orders over 500 EGP',
                           'Standard delivery: 3-5 business days',
                           'Express delivery available (1-2 business days)',
                           'Track your order in real-time'
                         ].map((item, i) => (
                           <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                              <CheckCircle2 className="w-4 h-4 text-primary" /> {item}
                           </li>
                         ))}
                      </ul>
                   </div>

                   <div className="p-8 rounded-[32px] bg-blue-50/50 border border-blue-100 space-y-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center">
                            <RotateCcw className="w-6 h-6" />
                         </div>
                         <h3 className="text-xl font-black text-gray-900">Returns & Refunds</h3>
                      </div>
                      <ul className="space-y-4">
                         {[
                           '30-day hassle-free returns',
                           'Full refund or exchange available',
                           'Free return shipping on defective items',
                           'Easy online return process'
                         ].map((item, i) => (
                           <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                              <CheckCircle2 className="w-4 h-4 text-blue-500" /> {item}
                           </li>
                         ))}
                      </ul>
                   </div>
                </div>

                <div className="p-8 rounded-[32px] bg-gray-50/50 border border-gray-100 flex items-center gap-6">
                   <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-gray-400">
                      <ShieldCheck className="w-7 h-7" />
                   </div>
                   <div>
                      <h4 className="font-black text-gray-900">Buyer Protection Guarantee</h4>
                      <p className="text-sm text-gray-500 mt-1">Get a full refund if your order doesn't arrive or isn't as described. We ensure your shopping experience is safe and secure.</p>
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  )
}
