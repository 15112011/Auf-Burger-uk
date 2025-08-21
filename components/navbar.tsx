"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, ShoppingCart, Search } from "lucide-react"
import Sidebar from "./sidebar"

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-30 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <img
                src="/auf-burger-logo.png"
                alt="Auf Burger Logo"
                className="w-12 h-12 object-contain"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
              />
              <span className="text-xl font-bold text-white hidden sm:block">Auf Burger</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-yellow-400 transition-colors font-medium">
                Home
              </Link>
              <Link href="/menu" className="text-white hover:text-yellow-400 transition-colors font-medium">
                Menu
              </Link>
              <Link href="/info" className="text-white hover:text-yellow-400 transition-colors font-medium">
                About
              </Link>
              <Link href="/cart" className="text-white hover:text-yellow-400 transition-colors font-medium">
                Cart
              </Link>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Search className="w-5 h-5 text-white" />
              </button>
              <Link href="/cart" className="p-2 rounded-lg hover:bg-white/10 transition-colors relative">
                <ShoppingCart className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
