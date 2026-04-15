import { productI } from "@/types/products.type";
import React from "react";
import Link from "next/link";
import { ChevronRight, Home, Package } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductDetailsClient from "@/components/products/ProductDetailsClient";
import ProductCard from "@/components/products/ProductCard";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  const response = await fetch(`${process.env.BASE_URL}/products/${productId}`, {
    next: { revalidate: 60 }
  });
  const data = await response.json();
  const product: productI = data.data;

  if (!product) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-8 bg-gray-50 px-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
           <Package className="w-12 h-12 text-gray-200" />
        </div>
        <div className="text-center">
           <h2 className="text-3xl font-bold text-gray-900">Product not found</h2>
           <p className="text-gray-500 mt-2">The product you are looking for might have been moved or removed.</p>
        </div>
        <Link href="/products" className="bg-primary hover:bg-emerald-700 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-xl shadow-primary/20">Back to shop</Link>
      </div>
    );
  }

  const relatedRes = await fetch(`${process.env.BASE_URL}/products?category[in]=${product.category._id}&limit=5`, {
    next: { revalidate: 60 }
  });
  const relatedData = await relatedRes.json();
  const relatedProducts: productI[] = (relatedData.data || []).filter((p: productI) => p._id !== productId);

  return (
    <main className="bg-white min-h-screen pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="py-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <Home className="w-3.5 h-3.5" />
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="w-3.5 h-3.5" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="w-3.5 h-3.5" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                   <Link href={`/categories/${product.category._id}`} className="hover:text-primary transition-colors">{product.category.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="w-3.5 h-3.5" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bold text-gray-900 line-clamp-1">{product.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <ProductDetailsClient product={product} />

        {relatedProducts.length > 0 && (
          <div className="mt-24 space-y-10">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
              <div className="flex items-center gap-4">
                 <div className="w-2 h-10 bg-primary rounded-full" />
                 <h2 className="text-3xl font-black text-gray-900 tracking-tight">You May Also <span className="text-primary">Like</span></h2>
              </div>
              <Link href={`/categories/${product.category._id}`} className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors font-bold uppercase tracking-widest text-xs">
                 See More
                 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct._id} product={relProduct} />
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
