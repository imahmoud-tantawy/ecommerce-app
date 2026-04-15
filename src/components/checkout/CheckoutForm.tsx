"use client"
import React, { useState } from 'react'
import { CartI } from '@/types/cart.type'
import { MapPin, Phone, Building2, CreditCard, Banknote, ShieldCheck, ArrowLeft, Loader2, CheckCircle2, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'
import { createCashOrder, createCheckoutSession } from '@/actions/order.action'
import { useRouter } from 'next/navigation'
import { isActionError } from '@/lib/action-response'

interface CheckoutFormProps {
  cart: CartI
}

export default function CheckoutForm({ cart }: CheckoutFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash')

  const [formData, setFormData] = useState({
    city: '',
    details: '',
    phone: ''
  })

  const [errors, setErrors] = useState({
    city: '',
    details: '',
    phone: ''
  })

  const validate = () => {
    let isValid = true
    const newErrors = { city: '', details: '', phone: '' }

    if (formData.city.length < 2) {
      newErrors.city = 'City name must be at least 2 characters'
      isValid = false
    }
    if (formData.details.length < 10) {
      newErrors.details = 'Address details must be at least 10 characters'
      isValid = false
    }
    const phoneRegex = /^01[0125][0-9]{8}$/
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid Egyptian phone number'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  async function handlePlaceOrder() {
    if (!validate()) return

    setLoading(true)
    try {
      if (paymentMethod === 'cash') {
        const res = await createCashOrder(cart.data._id, formData)
        if (isActionError(res)) {
          toast.error(res.message)
        } else if (res.status === 'success') {
          toast.success('Order placed successfully!')
          router.push('/allorders') 
        } else {
          toast.error(res.message || 'Failed to place order')
        }
      } else {
        const res = await createCheckoutSession(cart.data._id, formData)
        if (isActionError(res)) {
          toast.error(res.message)
        } else if (res.status === 'success') {
          window.location.href = res.session.url
        } else {
          toast.error(res.message || 'Failed to create checkout session')
        }
      }
    } catch (error) {
      toast.error('Unable to place your order right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-8">

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-primary px-6 py-4 flex items-center gap-3 text-white">
            <div className="p-2 bg-white/20 rounded-lg">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold">Shipping Address</h2>
              <p className="text-xs text-white/80">Where should we deliver your order?</p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 text-blue-700">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <p className="text-xs font-medium">Delivery Information: Please ensure your address is accurate for smooth delivery</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">City *</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="e.g. Cairo, Alexandria, Giza"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 ${errors.city ? 'border-red-500' : 'border-gray-50'} bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium`}
                  />
                </div>
                {errors.city && <p className="text-xs text-red-500 font-medium ml-2">{errors.city}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 ${errors.phone ? 'border-red-500' : 'border-gray-50'} bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-300 pointer-events-none hidden md:block">Egyptian numbers only</span>
                </div>
                {errors.phone && <p className="text-xs text-red-500 font-medium ml-2">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Street Address *</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                <textarea
                  rows={3}
                  placeholder="Street name, building number, floor, apartment..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className={`w-full pl-11 pr-4 py-4 rounded-2xl border-2 ${errors.details ? 'border-red-500' : 'border-gray-50'} bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium resize-none`}
                />
              </div>
              {errors.details && <p className="text-xs text-red-500 font-medium ml-2">{errors.details}</p>}
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-emerald-600 px-6 py-4 flex items-center gap-3 text-white">
            <div className="p-2 bg-white/20 rounded-lg">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold">Payment Method</h2>
              <p className="text-xs text-white/80">Choose how you'd like to pay</p>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div
              onClick={() => setPaymentMethod('cash')}
              className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all cursor-pointer group ${paymentMethod === 'cash' ? 'border-primary bg-emerald-50/50' : 'border-gray-100 hover:border-gray-200'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === 'cash' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
                  <Banknote className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Cash on Delivery</h3>
                  <p className="text-xs text-gray-500 mt-1">Pay when your order arrives at your doorstep</p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === 'cash' ? 'border-primary bg-primary' : 'border-gray-200'}`}>
                {paymentMethod === 'cash' && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
            </div>

            <div
              onClick={() => setPaymentMethod('card')}
              className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all cursor-pointer group ${paymentMethod === 'card' ? 'border-primary bg-emerald-50/50' : 'border-gray-100 hover:border-gray-200'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === 'card' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Pay Online</h3>
                  <p className="text-xs text-gray-500 mt-1">Secure payment with Credit/Debit Card via Stripe</p>
                  <div className="flex gap-2 mt-2">
                    <div className="w-7 h-4 bg-gray-100 rounded text-[8px] flex items-center justify-center font-bold text-gray-400 uppercase tracking-tighter">Visa</div>
                    <div className="w-7 h-4 bg-gray-100 rounded text-[8px] flex items-center justify-center font-bold text-gray-400 uppercase tracking-tighter">MCard</div>
                  </div>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary' : 'border-gray-200'}`}>
                {paymentMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-50 rounded-xl flex items-center gap-3 text-emerald-700">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <p className="text-xs font-medium">Secure & Encrypted: Your payment info is protected with 256-bit SSL encryption</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 translate-y-0">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden sticky top-24">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-black text-gray-900 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              Order Summary
            </h2>
            <span className="bg-primary/10 text-primary text-[10px] font-black px-2.5 py-1 rounded-full">{cart.numOfCartItems} Items</span>
          </div>

          <div className="p-6">
            <div className="space-y-4 max-h-75 overflow-y-auto pr-2 custom-scrollbar mb-6">
              {cart.data.products.map((item) => (
                <div key={item._id} className="flex gap-4 group">
                  <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={64}
                      height={64}
                      className="object-contain w-full h-full p-2 group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 truncate">{item.product.title}</h4>
                    <p className="text-[10px] text-gray-400 font-medium mt-1">{item.count} × {item.price} EGP</p>
                    <p className="text-xs font-black text-primary mt-1">{item.count * item.price} EGP</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-50">
              <div className="flex justify-between items-center text-sm font-medium text-gray-500">
                <span>Subtotal</span>
                <span className="text-gray-900">{cart.data.totalCartPrice} EGP</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium text-gray-500">
                <span>Shipping</span>
                <span className="text-emerald-500 font-black uppercase text-xs tracking-wider">Free</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-lg font-black text-gray-900">Total</span>
                <span className="text-xl font-black text-primary">{cart.data.totalCartPrice} EGP</span>
              </div>
            </div>

            <button
              disabled={loading}
              onClick={handlePlaceOrder}
              className="w-full h-14 rounded-2xl bg-gray-900 hover:bg-black text-white font-black text-lg transition-all shadow-xl shadow-gray-200 mt-8 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Place Order
                </>
              )}
            </button>

            <div className="grid grid-cols-3 gap-2 mt-6">
              <div className="flex flex-col items-center p-2 rounded-xl bg-gray-50 gap-1 opacity-60">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-[8px] font-black uppercase tracking-tighter text-gray-500">Secure</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-xl bg-gray-50 gap-1 opacity-60">
                <Loader2 className="w-4 h-4 text-primary" />
                <span className="text-[8px] font-black uppercase tracking-tighter text-gray-500">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-xl bg-gray-50 gap-1 opacity-60">
                <ArrowLeft className="w-4 h-4 text-blue-500" />
                <span className="text-[8px] font-black uppercase tracking-tighter text-gray-500">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
