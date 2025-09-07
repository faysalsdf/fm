"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, User, Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AuthModal } from "@/components/auth/auth-modal"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(3)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/images/fmosweb-logo.png" alt="FMOSWEB" width={120} height={40} className="h-8 w-auto" />
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-amber-600 font-medium">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-amber-600 font-medium">
                Products
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-amber-600 font-medium">
                Categories
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-amber-600 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-amber-600 font-medium">
                Contact
              </Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hidden md:flex" onClick={() => setIsAuthModalOpen(true)}>
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>

              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Mobile menu button */}
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-lg"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>

                <nav className="flex flex-col space-y-2">
                  <Link href="/" className="text-gray-700 hover:text-amber-600 font-medium py-2">
                    Home
                  </Link>
                  <Link href="/products" className="text-gray-700 hover:text-amber-600 font-medium py-2">
                    Products
                  </Link>
                  <Link href="/categories" className="text-gray-700 hover:text-amber-600 font-medium py-2">
                    Categories
                  </Link>
                  <Link href="/about" className="text-gray-700 hover:text-amber-600 font-medium py-2">
                    About
                  </Link>
                  <Link href="/contact" className="text-gray-700 hover:text-amber-600 font-medium py-2">
                    Contact
                  </Link>
                  <Button variant="ghost" className="justify-start p-2" onClick={() => setIsAuthModalOpen(true)}>
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </Button>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
