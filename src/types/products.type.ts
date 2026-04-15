export interface productI {
  brand: brandId;
  category: brandId;
  createdAt: string;
  description: string;
  id: string;
  imageCover: string;
  images: string[];

  price: number;
  quantity: number;
  ratingsAverage: number;
  ratingsQuantity: number;

  slug: string;
  sold: number;
  subcategory: brandId;
  title: string;
  updatedAt: string;
  _id: string;
}

interface brandId {
  image: string;
  name: string;
  slug: string;
  _id: string;
}
