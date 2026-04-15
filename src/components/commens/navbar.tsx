"use client"
import Link from 'next/link'
import { Heart, ShoppingCart, UserRound, Search, ChevronDown, Headset, Menu, Truck, Gift, Phone, Mail, User, UserPlus, X, Package } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '@/provider/cart-provider'
import { WishlistContext } from '@/provider/wishlist-provider'
import { Spinner } from '../ui/spinner'
import Image from 'next/image'

export default function Navbar() {
  const { data: session } = useSession();
  const { nOfCartItems, isLoading } = useContext(CartContext)
  const { totalItems, isLoading: isWishlistLoading } = useContext(WishlistContext)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [categories, setCategories] = useState<{ _id: string, name: string }[]>([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data.data || []))
      .catch(err => console.error(err))
  }, [])

  function handleLogout() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <>
      <div className="hidden lg:block text-sm border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-10">
            <div className="flex items-center gap-6 text-gray-500">
              <span className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-primary" />
                <span>Free Shipping on Orders 500 EGP</span>
              </span>
              <span className="flex items-center gap-2">
                <Gift className="w-3.5 h-3.5 text-primary" />
                <span>New Arrivals Daily</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-gray-500">
                <a href="tel:+18001234567" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                  <span>+1 (800) 123-4567</span>
                </a>
                <a href="mailto:support@freshcart.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  <span>support@freshcart.com</span>
                </a>
              </div>
              <span className="w-px h-4 bg-gray-200"></span>
              {session ? (
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 font-medium">Hi, {session.user?.name}</span>
                  <Link href="/allorders" className="flex items-center gap-1.5 text-gray-600 hover:text-primary transition-colors">
                    <Package className="w-3.5 h-3.5" />
                    <span>My Orders</span>
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-1.5 text-gray-600 hover:text-primary transition-colors ml-2">
                    <User className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link className="flex items-center gap-1.5 text-gray-600 hover:text-primary transition-colors" href="/login">
                    <User className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </Link>
                  <Link className="flex items-center gap-1.5 text-gray-600 hover:text-primary transition-colors" href="/register">
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-100 lg:hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className={`absolute right-0 top-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl transition-transform duration-500 ease-out transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                    <Menu className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-black text-gray-900">Menu</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-white hover:text-red-500 rounded-xl transition-all duration-300 shadow-sm border border-gray-100 bg-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pt-6 px-4 pb-12 space-y-8 custom-scrollbar">

                {/* Search */}
                <div className="relative group p-1">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gray-400 group-focus-within:text-primary transition-colors">
                    <Search className="w-5 h-5" />
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="space-y-2">
                  <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Navigation</p>
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between px-5 py-4 rounded-2xl text-gray-700 hover:text-primary hover:bg-primary/5 font-bold transition-all group">
                    <span>Home</span>
                    <ChevronDown className="w-4 h-4 -rotate-90 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                  <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between px-5 py-4 rounded-2xl text-gray-700 hover:text-primary hover:bg-primary/5 font-bold transition-all group">
                    <span>Shop All</span>
                    <ChevronDown className="w-4 h-4 -rotate-90 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                  <Link href="/categories" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between px-5 py-4 rounded-2xl text-gray-700 hover:text-primary hover:bg-primary/5 font-bold transition-all group">
                    <span>Categories</span>
                    <ChevronDown className="w-4 h-4 -rotate-90 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                  <Link href="/brands" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between px-5 py-4 rounded-2xl text-gray-700 hover:text-primary hover:bg-primary/5 font-bold transition-all group">
                    <span>Brands</span>
                    <ChevronDown className="w-4 h-4 -rotate-90 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                  <Link href="/allorders" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between px-5 py-4 rounded-2xl text-gray-700 hover:text-primary hover:bg-primary/5 font-bold transition-all group">
                    <span>My Orders</span>
                    <ChevronDown className="w-4 h-4 -rotate-90 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </div>

                <div className="h-px bg-gray-100 mx-4"></div>

                {/* User Section */}
                <div className="space-y-4">
                  <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Account</p>
                  {session ? (
                    <div className="space-y-3 px-1">
                      <div className="px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
                          {session.user?.name?.[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Welcome back</p>
                          <p className="font-black text-gray-900 truncate">{session.user?.name}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 text-red-500 bg-red-50/50 hover:bg-red-50 border border-red-100 rounded-2xl transition-all font-black text-sm"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 px-1">
                      <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center h-14 rounded-2xl bg-gray-100 text-gray-900 font-black text-sm hover:bg-gray-200 transition-all">Login</Link>
                      <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center h-14 rounded-2xl bg-primary text-white font-black text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">Sign Up</Link>
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-8 border-t border-gray-100 px-2 space-y-4">
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Call Us</p>
                      <p className="text-sm font-bold text-gray-700">+1 (800) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Email</p>
                      <p className="text-sm font-bold text-gray-700 truncate">support@freshcart.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-b border-gray-100 lg:border-none">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 lg:h-18 gap-4 lg:gap-8">
              <Link className="shrink-0 flex items-center gap-1.5" href="/">
                <div className='flex items-center justify-center text-primary'>
                  <Image src="/images/logo.svg" alt="Logo" width={180} height={100} />
                </div>
              </Link>

              <form className="hidden lg:flex flex-1 max-w-xl mx-8">
                <div className="relative w-full">
                  <input type="text" placeholder="Search for products..." className="w-full px-5 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm" />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <nav className="hidden xl:flex items-center gap-6">
                <Link className="text-gray-700 hover:text-primary font-medium transition-colors" href="/">Home</Link>
                <Link className="text-gray-700 hover:text-primary font-medium transition-colors" href="/products">Shop</Link>

                <div className="relative group">
                  <button className="flex items-center gap-1.5 text-gray-700 hover:text-primary font-medium transition-colors py-2 cursor-pointer">
                    Categories
                    <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white border border-gray-100 rounded-lg shadow-xl py-2 min-w-55">
                      {categories
                        .filter(cat => ['Electronics', "Women's Fashion", "Men's Fashion", 'Beauty & Health'].includes(cat.name))
                        .map(cat => (
                          <Link key={cat._id} className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-emerald-50 transition-colors" href={`/categories/${cat._id}`}>{cat.name}</Link>
                        ))}
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <Link className="block px-4 py-2 text-sm font-bold text-primary hover:bg-emerald-50 transition-colors" href="/categories">All Categories</Link>
                      </div>
                    </div>
                  </div>
                </div>

                <Link className="text-gray-700 hover:text-primary font-medium transition-colors" href="/brands">Brands</Link>
              </nav>

              <div className="flex items-center gap-1 lg:gap-2">
                <Link className="hidden lg:flex items-center gap-2 pr-3 mr-2 border-r border-gray-200 hover:opacity-80 transition-opacity" href="/contact">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <Headset className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-xs">
                    <div className="text-gray-400">Support</div>
                    <div className="font-semibold text-gray-700">24/7 Help</div>
                  </div>
                </Link>

                <Link className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group" title="Wishlist" href="/wishlist">
                  <Heart className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                  <span className="absolute top-0 right-0 bg-primary text-white min-w-4.5 h-4.5 flex items-center justify-center rounded-full text-[10px] p-0 border-2 border-white">
                    {isWishlistLoading ? <Spinner className="size-2 text-white" /> : totalItems}
                  </span>
                </Link>

                <Link className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group" title="Cart" href="/cart">
                  <ShoppingCart className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                  <span className="absolute top-0 right-0 bg-primary text-white min-w-4.5 h-4.5 flex items-center justify-center rounded-full text-[10px] p-0 border-2 border-white">
                    {isLoading ? <Spinner className="size-2 text-white" /> : nOfCartItems}
                  </span>
                </Link>

                {!session && (
                  <Link className="hidden lg:flex items-center gap-2 ml-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white text-sm font-semibold transition-colors shadow-sm shadow-primary/20" href="/login">
                    <UserRound className="w-4 h-4" />
                    Sign In
                  </Link>
                )}

                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden ml-1 w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center transition-colors">
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
