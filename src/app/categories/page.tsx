import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface CategoryI {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

export default async function Categories() {
  const response = await fetch(`${process.env.BASE_URL}/categories`, {
    next: { revalidate: 60 }
  });
  const data = await response.json();
  const categories: CategoryI[] = data.data || [];

  return (
    <main className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Shop by <span className="text-primary">Category</span></h1>
          <p className="text-gray-500 mt-2">Explore our wide range of products across different categories.</p>
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
    </main>
  )
}
