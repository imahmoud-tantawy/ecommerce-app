"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function HeroSlider() {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="relative h-125 overflow-hidden">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full h-full">

        <CarouselContent className="flex">

          {/* Slide 1 */}
          <CarouselItem className="basis-full shrink-0">
            <div className="relative w-full h-125">
              <Image src="/images/hero-1.jpg" alt="hero" fill priority className="object-cover" />
              <div className="absolute inset-0 bg-emerald-600/70"></div>

              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-19 text-white">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">Fast & Free Delivery</h2>
                  <p className="mb-6 text-lg">Same day delivery available</p>

                  <div className="flex gap-4">
                    <Link href="/products" className="bg-white text-purple-500 px-6 py-3 rounded-lg font-bold">Order Now</Link>
                    <Link href="/products" className="border border-white px-6 py-3 rounded-lg font-bold">Delivery Info</Link>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* Slide 2 */}
          <CarouselItem className="basis-full shrink-0">
            <div className="relative w-full h-125">
              <Image src="/images/hero-1.jpg" alt="hero" fill className="object-cover" />
              <div className="absolute inset-0 bg-green-700/70"></div>

              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-19 text-white">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">Fresh Products Delivered <br />
                    to your Door</h2>
                  <p className="mb-6 text-lg">Get 20% for your first order</p>
                  <div className="flex gap-4">

                    <Link href="/products" className="bg-white text-green-800 px-6 py-3 rounded-lg font-bold">Shop Now</Link>
                    <Link href="/products" className="border border-white px-6 py-3 rounded-lg font-bold">View Deals</Link>
                  </div>

                </div>
              </div>
            </div>
          </CarouselItem>

          {/* Slide 3 */}
          <CarouselItem className="basis-full shrink-0">
            <div className="relative w-full h-125">
              <Image src="/images/hero-1.jpg" alt="hero" fill className="object-cover" />
              <div className="absolute inset-0 bg-emerald-800/70"></div>

              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-19 text-white">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">Premium Quality <br /> Guaranteed</h2>
                  <p className="mb-6 text-lg">Fresh from farm to your table</p>
                  <div className="flex gap-4">

                    <Link href="/products" className="bg-white text-blue-700 px-6 py-3 rounded-lg font-bold">Shop Now</Link>
                    <Link href="/products" className="border border-white px-6 py-3 rounded-lg font-bold">Learn More</Link>
                  </div>                </div>
              </div>
            </div>
          </CarouselItem>

        </CarouselContent>

        {/* 🔘 Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-3 rounded-full transition-all ${current === i ? "bg-white w-6" : "bg-white/50 w-3"
                }`}
            />
          ))}
        </div>

        {/* ⬅️➡️ Arrows */}
        <CarouselPrevious className="left-4 z-20 w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30" />
        <CarouselNext className="right-4 z-20 w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30" />
      </Carousel>
    </section>
  )
}