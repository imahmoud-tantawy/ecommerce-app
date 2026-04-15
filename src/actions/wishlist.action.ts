"use server"

import { getUserToken } from "@/lib/auth"
import { actionError } from "@/lib/action-response"

export async function addProductToWishlist(productId: string) {
  try {
    const token = await getUserToken()

    if (!token) {
      return actionError("Please login first.")
    }

    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
          token: token as string,
          "content-type": "application/json"
        }
      }
    )

    const data = await response.json()
    if (!response.ok) {
      return actionError(data?.message || "Failed to add product to wishlist.")
    }
    return { ...data, ok: true }
  } catch (error) {
    console.error("addProductToWishlist error:", error)
    return actionError("Unable to update wishlist right now.")
  }
}

export async function removeProductFromWishList(productId: string) {
  try {
    const token = await getUserToken()

    if (!token) {
      return actionError("Please login first.")
    }

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          token: token as string,
          "content-type": "application/json"
        }
      }
    )

    const data = await response.json()
    if (!response.ok) {
      return actionError(data?.message || "Failed to remove product from wishlist.")
    }
    return { ...data, ok: true }
  } catch (error) {
    console.error("removeProductFromWishList error:", error)
    return actionError("Unable to update wishlist right now.")
  }
}

export async function getWishList() {
  try {
    const token = await getUserToken()

    if (!token) {
      return actionError("Please login first.")
    }

    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        method: "GET",
        headers: {
          token: token as string
        }
      }
    )

    const data = await response.json()
    if (!response.ok) {
      return actionError(data?.message || "Failed to load wishlist.")
    }
    return { ...data, ok: true }
  } catch (error) {
    console.error("getWishList error:", error)
    return actionError("Unable to load wishlist right now.")
  }
}