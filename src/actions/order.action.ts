"use server"
import { getUserToken } from "@/lib/auth"
import { actionError } from "@/lib/action-response"
import { headers } from "next/headers"

import { jwtDecode } from "jwt-decode"

function parseBaseUrl(value?: string | null) {
    if (!value) return null
    try {
        const url = new URL(value.startsWith("http") ? value : `https://${value}`)
        return url.origin
    } catch {
        return null
    }
}

function isLocalOrigin(origin: string) {
    return origin.includes("localhost") || origin.includes("127.0.0.1")
}

async function getBaseUrl() {
    const isProd = process.env.NODE_ENV === "production"
    const envCandidates = [
        process.env.APP_URL,
        process.env.NEXTAUTH_URL,
        process.env.NEXT_PUBLIC_APP_URL,
        process.env.VERCEL_PROJECT_PRODUCTION_URL,
        process.env.VERCEL_URL
    ]

    for (const candidate of envCandidates) {
        const parsed = parseBaseUrl(candidate)
        if (!parsed) continue
        if (isProd && isLocalOrigin(parsed)) continue
        return parsed
    }

    const requestHeaders = await headers()
    const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? ""
    const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https")
    const requestOrigin = parseBaseUrl(`${protocol}://${host}`)

    if (requestOrigin && (!isProd || !isLocalOrigin(requestOrigin))) return requestOrigin
    return "http://localhost:3000"
}

export async function createCashOrder(cartId: string, shippingAddress: { details: string, phone: string, city: string }) {
    try {
        const token = await getUserToken()
        if (!token) return actionError("Please login first.")

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
            method: "POST",
            body: JSON.stringify({ shippingAddress }),
            headers: {
                token: token as string,
                "content-type": "application/json"
            }
        })
        const data = await response.json()
        if (!response.ok) {
            return actionError(data?.message || "Failed to create your order.")
        }
        return { ...data, ok: true }
    } catch (error) {
        console.error("createCashOrder error:", error)
        return actionError("Unable to place your order right now.")
    }
}

export async function createCheckoutSession(cartId: string, shippingAddress: { details: string, phone: string, city: string }) {
    try {
        const token = await getUserToken()
        if (!token) return actionError("Please login first.")

        const baseUrl = await getBaseUrl()

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(baseUrl)}`, {
            method: "POST",
            body: JSON.stringify({ shippingAddress }),
            headers: {
                token: token as string,
                "content-type": "application/json"
            }
        })
        const data = await response.json()
        if (!response.ok) {
            return actionError(data?.message || "Failed to create checkout session.")
        }
        return { ...data, ok: true }
    } catch (error) {
        console.error("createCheckoutSession error:", error)
        return actionError("Unable to continue to payment right now.")
    }
}

export async function getUserOrders() {
    try {
        const token = await getUserToken()
        if (!token) return actionError("Please login first.")

        const decoded: { id: string } = jwtDecode(token as string)
        const userId = decoded.id

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json()
        if (!response.ok) {
            return actionError(data?.message || "Failed to load your orders.")
        }
        if (Array.isArray(data)) return data
        return data.data || []
    } catch (error) {
        console.error("getUserOrders error:", error)
        return actionError("Unable to load your orders right now.")
    }
}
