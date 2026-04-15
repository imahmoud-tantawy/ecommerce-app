import { ProductI } from "./cart.type";

export interface WishlistI {
  status: string;
  message: string;
  numOfWishlistItems?: number;
  data: WishlistDataI;
}

export interface WishlistDataI {
  _id: string;
  wishlistOwner: string;
  products: WishlistProductI[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface WishlistProductI extends ProductI {
}