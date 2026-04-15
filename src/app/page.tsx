import { productI } from "@/types/products.type";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, Truck, ShieldCheck, RotateCcw, Headset, Flame, Sparkles, Mail, Leaf, Tag, Smartphone, Apple } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import HeroSlider from "@/components/HeroSlider";
import Features from "@/components/commens/Features";

interface CategoryI {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

export default async function Home() {
  const productsResponse = await fetch(`${process.env.BASE_URL}/products?limit=10`, {
    next: { revalidate: 60 }
  });
  const productsData = await productsResponse.json();
  const products: productI[] = productsData.data || [];

  const categoriesResponse = await fetch(`${process.env.BASE_URL}/categories`, {
    next: { revalidate: 60 }
  });
  const categoriesData = await categoriesResponse.json();
  const categories: CategoryI[] = categoriesData.data || [];

  return (
    <main className="bg-white min-h-screen">

      <HeroSlider />
      {/*Features Section*/}
      <Features />

      {/*Shop by Category */}
      <section className="py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900"></h2>
            <Link href="/categories" className="text-xl  text-green-400 hover:text-primary transition-colors flex items-center gap-1 group">
              View All Categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h1 className="text-3xl font-bold text-gray-900">Shop by <span className="text-primary">Category</span></h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {categories.map((category) => (
                <Link key={category._id} href={`/categories/${category._id}`}>
                  <div className="bg-white border border-gray-100 rounded-3xl p-6 text-center hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group">
                    <div className="aspect-square relative mb-6 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 group-hover:border-primary/30">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="font-bold text-gray-700 group-hover:text-primary transition-colors text-sm">{category.name}</h3>
                    <p className="text-[10px] text-gray-400 mt-1 font-medium group-hover:text-gray-600 transition-colors uppercase tracking-widest">Explore Items</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*Hero Section*/}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative rounded-[2rem] overflow-hidden group p-8 md:p-12 min-h-87.5 flex flex-col justify-center">
              <div className="absolute inset-0 bg-linear-to-br from-[#008a4e] via-[#01a75d] to-[#01a75d] transition-transform duration-700 group-hover:scale-105"></div>

              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl transition-transform duration-700 group-hover:scale-110"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full translate-y-1/4 -translate-x-1/4 blur-xl"></div>

              <div className="relative z-10 text-white">
                <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-semibold w-fit mb-6">
                  <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                  Deal of the Day
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
                  Fresh Organic Fruits
                </h2>
                <p className="text-white/80 text-sm md:text-base mb-8 max-w-75">
                  Get up to 40% off on selected organic fruits
                </p>

                <div className="flex items-center gap-4 mb-8 flex-wrap">
                  <span className="text-4xl md:text-5xl font-black tracking-tight">40% OFF</span>
                  <span className="text-white/90 text-sm font-medium bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
                    Use code: <span className="text-white font-bold ml-1">ORGANIC40</span>
                  </span>
                </div>

                <Link href="/products" className="inline-flex items-center gap-2 bg-white text-[#008a4e] px-8 py-4 rounded-2xl font-bold text-sm hover:scale-105 transition-all active:scale-95 shadow-xl shadow-black/10">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative rounded-[2rem] overflow-hidden group p-8 md:p-12 min-h-87.5 flex flex-col justify-center">
              <div className="absolute inset-0 bg-linear-to-br from-[#ff8a00] via-[#ff5c33] to-[#ff2d55] transition-transform duration-700 group-hover:scale-105"></div>

              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl transition-transform duration-700 group-hover:scale-110"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full translate-y-1/4 -translate-x-1/4 blur-xl"></div>

              <div className="relative z-10 text-white">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-semibold w-fit mb-6">
                  <Sparkles className="w-4 h-4 text-white/90" />
                  New Arrivals
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
                  Exotic Vegetables
                </h2>
                <p className="text-white/80 text-sm md:text-base mb-8 max-w-75">
                  Discover our latest collection of premium vegetables
                </p>

                <div className="flex items-center gap-4 mb-8 flex-wrap">
                  <span className="text-4xl md:text-5xl font-black tracking-tight">25% OFF</span>
                  <span className="text-white/90 text-sm font-medium bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
                    Use code: <span className="text-white font-bold ml-1">FRESH25</span>
                  </span>
                </div>

                <Link href="/products" className="inline-flex items-center gap-2 bg-white text-[#ff5c33] px-8 py-4 rounded-2xl font-bold text-sm hover:scale-105 transition-all active:scale-95 shadow-xl shadow-black/10">
                  Explore Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Featured Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Popular <span className="text-primary">Products</span></h2>
              <p className="text-gray-500 mt-2">Organic, fresh and healthy products delivered to your door.</p>
            </div>
            <div className="flex gap-2">
              <Link href="/products" className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all">All</Link>
              <Link href="/categories" className="hidden sm:block px-6 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all">Category</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/products" className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-primary/20 active:scale-95">
              Load More Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/*Newsletter Section */}
      <section className="py-14 px-4">
        <div className="container mx-auto relative overflow-hidden rounded-[3rem] border border-emerald-100/50 bg-emerald-50/40 p-10 md:p-16">

          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-emerald-200/30 blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">

            <div className="text-center lg:text-left space-y-10">

              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <Mail className="w-7 h-7" />
                </div>

                <div>
                  <h4 className="text-primary font-bold uppercase tracking-widest text-xs">
                    Newsletter
                  </h4>
                  <p className="text-gray-500 text-sm">50,000+ subscribers</p>
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                Get Fresh Updates <br />
                <span className="text-primary italic">Delivered Free</span>
              </h2>

              <p className="text-gray-500 text-lg max-w-xl mx-auto lg:mx-0">
                Weekly recipes, seasonal offers & exclusive member perks.
              </p>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {[
                  { icon: Leaf, text: "Fresh Picks Weekly" },
                  { icon: Truck, text: "Free Delivery Codes" },
                  { icon: Tag, text: "Members Deals" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:border-primary/20 transition"
                  >
                    <item.icon className="w-4 h-4 text-primary" />
                    {item.text}
                  </div>
                ))}
              </div>

              {/* Form */}
              <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto lg:mx-0 bg-white p-2 rounded-2xl border border-gray-100 shadow-lg">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="flex-1 px-5 py-3 rounded-xl focus:outline-none text-gray-800 placeholder:text-gray-400"
                />
                <button className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-emerald-700 transition flex items-center justify-center gap-2">
                  Subscribe <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <p className="text-gray-400 text-sm">
                ✨ Unsubscribe anytime. No spam.
              </p>
            </div>

            <div className="lg:justify-self-end w-full max-w-sm">
              <div className="relative rounded-[2.5rem] bg-[#111827] text-white p-8 overflow-hidden border border-white/5">

                <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 blur-3xl rounded-full" />

                <div className="relative space-y-8">

                  <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Mobile App
                  </span>

                  <h3 className="text-2xl font-bold">
                    Shop Faster on App
                  </h3>

                  <p className="text-gray-400 text-sm">
                    Get exclusive deals & 15% off first order.
                  </p>

                  <div className="space-y-3">
                    <Link href="#" className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition">
                      <Apple className="w-6 h-6" />
                      <div>
                        <p className="text-[10px] text-gray-400">Download on</p>
                        <p className="font-bold">App Store</p>
                      </div>
                    </Link>

                    <Link href="#" className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition">
                      <Smartphone className="w-6 h-6" />
                      <div>
                        <p className="text-[10px] text-gray-400">Get it on</p>
                        <p className="font-bold">Google Play</p>
                      </div>
                    </Link>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center gap-3">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm">
                      <span className="text-white font-bold">4.9</span> • 100K+ downloads
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}