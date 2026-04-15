import { brandI } from "@/types/brands.type";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default async function Brands() {
  const response = await fetch(`${process.env.BASE_URL}/brands`, {
    cache: "no-store",
  });
  const data = await response.json();
  const brands: brandI[] = data.data;

  return (
    <main className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Our <span className="text-primary">Brands</span></h1>
          <p className="text-gray-500 mt-2">We partner with the best brands to bring you high-quality products.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <Link key={brand._id} href={`/brands/${brand._id}`}>
               <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center justify-center hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group h-48">
                  <div className="relative w-full h-full">
                    <Image
                      src={brand.image}
                      fill
                      className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                      alt={brand.name}
                    />
                  </div>
                  <h3 className="text-sm font-bold text-gray-400 group-hover:text-primary transition-colors mt-4 text-center">{brand.name}</h3>
               </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
