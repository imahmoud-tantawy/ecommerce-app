"use client"
import { productI } from "@/types/products.type";
import Image from "next/image";
import Link from "next/link";
import { Star, Eye, RefreshCcw} from "lucide-react";
import AddToCartBtn from "@/components/cart/AddToCartBtn";
import AddToWishlistButton from "@/components/wishlist/AddToWishlistBtn";

interface ProductCardProps {
  product: productI;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-primary/20 transition-all duration-500 relative flex flex-col h-full">
      {/* Sidebar Actions */}
      <div className="absolute top-4 -right-12 group-hover:right-4 z-20 flex flex-col gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100">
        <Link
          href={`/products/${product._id}`}
          className="w-10 h-10 bg-white shadow-md border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-primary hover:bg-emerald-50 transition-all"
          title="Quick View"
        >
          <Eye className="w-5 h-5" />
        </Link>
        <button
          className="w-10 h-10 bg-white shadow-md border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-primary hover:bg-emerald-50 transition-all"
          title="Compare"
        >
          <RefreshCcw className="w-5 h-5" />
        </button>
        <AddToWishlistButton
          productId={product._id}
          isIconOnly={true}
          className="bg-white shadow-md border border-gray-100 w-10 h-10 hover:bg-emerald-50"
        />
      </div>

      {/* Product Image */}
      <Link href={`/products/${product._id}`}>
        <div className="relative h-56 w-full p-8 bg-gray-50/30">
          <Image
            src={product.imageCover || product.images[0]}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
            alt={product.title}
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <Link href={`/categories/${product.category?._id}`} className="text-[10px] uppercase font-bold text-primary tracking-wider mb-1 block">
            {product.category?.name}
          </Link>
          <Link href={`/products/${product._id}`}>
            <h3 className="font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-primary transition-colors text-sm">
              {product.title}
            </h3>
          </Link>

          {/* Ratings */}
          <div className="flex items-center gap-1 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-3 h-3 ${s <= Math.floor(product.ratingsAverage) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-400 font-medium ml-1">({product.ratingsAverage})</span>
          </div>
        </div>

        {/* Footer*/}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-lg font-bold text-gray-800">{product.price} <span className="text-[10px] font-normal text-gray-400">EGP</span></span>
          </div>
          <AddToCartBtn prodId={product._id} />
        </div>
      </div>
    </div>
  );
}
