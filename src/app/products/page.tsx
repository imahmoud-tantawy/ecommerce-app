import { productI } from "@/types/products.type";
import React from "react";
import ProductCard from "@/components/products/ProductCard";

export default async function Products() {
  const response = await fetch(`${process.env.BASE_URL}/products`, {
    next: { revalidate: 60 }
  });
  const data = await response.json();
  const products: productI[] = data.data || [];

  return (
    <main className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All <span className="text-primary">Products</span></h1>
            <p className="text-gray-500 mt-1">Found {products.length} products for you.</p>
          </div>
          
          <div className="flex gap-2">
             <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Avg. Rating</option>
             </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center w-full col-span-full bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400 text-xl font-medium">No products found matching your criteria.</p>
            </div>
          ) : (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}

