import { productI } from "@/types/products.type";
import React from "react";
import Link from "next/link";
import { PackageX } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";

export default async function CategoryDetails({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;

  if (!categoryId) {
    return (
      <main className="container mx-auto py-24 text-center">
        <p className="text-red-500 text-xl font-bold">Category ID is required.</p>
        <Link href="/categories" className="text-primary hover:underline mt-4 inline-block font-bold">Back to Categories</Link>
      </main>
    );
  }

  const response = await fetch(`${process.env.BASE_URL}/products?category[in]=${categoryId}`, { 
    next: { revalidate: 60 } 
  });
  const data = await response.json();
  const products: productI[] = data.data || [];

  const categoryName = products.length > 0 ? products[0].category.name : "Category Catalog";

  return (
    <main className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              {categoryName}
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Browse our selection of {categoryName} products.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 bg-primary/5 px-6 py-3 rounded-2xl border border-primary/10">
            <span className="text-primary font-black text-2xl">{products.length}</span>
            <span className="text-primary/60 font-bold uppercase tracking-widest text-[10px]">Items<br/>found</span>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="bg-gray-50 p-8 rounded-full mb-6">
              <PackageX className="w-16 h-16 text-gray-200" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">No Products Found</h2>
            <p className="text-gray-500 mt-2 mb-8 max-w-xs mx-auto">We couldn't find any products in this category at the moment. Please explore our other categories.</p>
            <Link href="/categories" className="bg-primary hover:bg-emerald-700 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-xl shadow-primary/20 active:scale-95">
              Browse All Categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
