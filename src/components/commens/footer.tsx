import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, CreditCard, Headset, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (

    <footer className="bg-[#0f172a] text-gray-400 py-16">



      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-block bg-white px-4 py-2 rounded-xl shadow-lg">
              <div className="flex items-center gap-2">
                <div className="text-primary font-black">
                  <Image src="/images/logo.svg" alt="Logo" width={180} height={100} />

                </div>
              </div>
            </Link>

            <p className="text-sm leading-relaxed max-w-sm">
              FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
            </p>

            <div className="space-y-4">
              <a href="tel:+18001234567" className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">+1 (800) 123-4567</span>
              </a>
              <a href="mailto:support@freshcart.com" className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">support@freshcart.com</span>
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm">123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-8">Shop</h3>
              <ul className="space-y-4 text-sm">
                <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
                <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
                <li><Link href="/brands" className="hover:text-white transition-colors">Brands</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Electronics</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Men's Fashion</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Women's Fashion</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-8">Account</h3>
              <ul className="space-y-4 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">My Account</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Order History</Link></li>
                <li><Link href="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
                <li><Link href="/cart" className="hover:text-white transition-colors">Shopping Cart</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Sign In</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors">Create Account</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-8">Support</h3>
              <ul className="space-y-4 text-sm">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Shipping Info</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Track Order</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-8">Legal</h3>
              <ul className="space-y-4 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm">
            © 2026 FreshCart. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><CreditCard className="w-4 h-4" /> Visa</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span>Mastercard</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span>PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
