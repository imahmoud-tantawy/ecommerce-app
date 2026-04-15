export interface CartI {
  status: string;
  message: string;
  numOfCartItems: number;
  data: CartDataI;
}

export interface CartDataI {
  _id: string;
  cartOwner: string;
  products: CartProductI[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartProductI {
  _id: string;
  count: number;
  price: number;
  product: ProductI;
}

export interface ProductI {
  _id: string;
  id:string;
  title: string;
  slug:string;
  imageCover: string;
  quantity: number;
  sold?: number;
  price: number;
  ratingsAverage?: number;
category: categoryI;
  brand: brandI;
subcategoru:subcategoruI[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;

  [key: string]: any;
}

export interface categoryI {
  _id: string;
  name: string;
  image?: string;
  slug?: string;
}
export interface subcategoruI{
_id: string;
  name: string;
  image?: string;
  slug?: string;
}
export interface brandI {
  _id: string;
  name: string;
  image?: string;
  slug?: string;
}