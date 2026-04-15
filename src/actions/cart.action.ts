"use server"
import { getUserToken } from "@/lib/auth"
import { actionError } from "@/lib/action-response"

export async function addProducToCart(productId: string) {
    try {
        const token = await getUserToken()
        if (!token) {
            return actionError("Please login first.")
        }
        const response = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
            method: "POST",
            body: JSON.stringify({ productId }),
            headers: {
                token: token as string,
                "content-type": "application/json"
            }
        })
        const data = await response.json()
        if (!response.ok) {
            return actionError(data?.message || "Failed to add product to cart.")
        }
        return { ...data, ok: true }
    } catch (error) {
        console.error("addProducToCart error:", error)
        return actionError("Unable to add product to cart right now.")
    }
}

export async function getCart() {
    try {
        const token = await getUserToken()
        if (!token) {
            return actionError("Please login first.")
        }
        const response = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
            method: "GET",
            headers: {
                token: token as string,
                "content-type": "application/json"
            }
        })
        const data = await response.json()
        if (!response.ok) {
            return actionError(data?.message || "Failed to load your cart.")
        }
        return { ...data, ok: true }
    } catch (error) {
        console.error("getCart error:", error)
        return actionError("Unable to load your cart right now.")
    }
}

export async function removeProductFromCart(productId: string) {
    try {
        const token = await getUserToken()
        if (!token) {
            return actionError("Please login first.")
        }
        const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
            method: "DELETE",
            headers: {
                token: token as string,
                "content-type": "application/json"
            }
        })
        const data = await response.json()
        if (!response.ok) {
            return actionError(data?.message || "Failed to remove product from cart.")
        }
        return { ...data, ok: true }
    } catch (error) {
        console.error("removeProductFromCart error:", error)
        return actionError("Unable to update your cart right now.")
    }
}


export async function updateProductFromCart(productId: string , count:number) {
    try {
        const token = await getUserToken()
        if (!token) {
            return actionError("Please login first.")
        }
        const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
            method: "PUT",
            body: JSON.stringify({ count }),
            headers: {
                token: token as string,
                "content-type": "application/json"
            }
        })
        const data = await response.json()
        if (!response.ok) {
            return actionError(data?.message || "Failed to update cart item.")
        }
        return { ...data, ok: true }
    } catch (error) {
        console.error("updateProductFromCart error:", error)
        return actionError("Unable to update your cart right now.")
    }
}

export async function clearCart() {
    try {
        const token = await getUserToken();
        if (!token) {
            return actionError("Please login first.")
        }
        const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
            method: "DELETE",
            headers: {
                token: token as string,
                "content-type": "application/json"
            }
        })
        const data = await response.json()
        if (!response.ok) {
            return actionError(data?.message || "Failed to clear cart.")
        }
        return { ...data, ok: true }
    } catch (error) {
        console.error("clearCart error:", error)
        return actionError("Unable to clear your cart right now.")
    }
}