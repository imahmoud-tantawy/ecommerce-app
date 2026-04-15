import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/commens/navbar";
import Footer from "@/components/commens/footer";
import { Toaster } from "sonner";
import AuthProvider from "@/provider/auth-provider";
import CartContextProvider from "@/provider/cart-provider";
import WishlistProvider from "@/provider/wishlist-provider";

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "Fresh Cart",
  description: "Modern e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${exo.className} antialiased`}>

        <AuthProvider>
          <CartContextProvider>
            <WishlistProvider>

              <Navbar />

              <div>
                {children}
              </div>

              <Toaster position="top-center" richColors />
              <Footer />

            </WishlistProvider>
          </CartContextProvider>
        </AuthProvider>

      </body>
    </html>
  );
}