"use client"
import Link from "next/link"
import { X, Home, Menu, Info, ShoppingCart } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/menu", icon: Menu, label: "Menu" },
    { href: "/info", icon: Info, label: "About Us" },
    { href: "/cart", icon: ShoppingCart, label: "Cart" }, // Changed from Order to Cart
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-40 sidebar-overlay lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 z-50 h-full w-80 sidebar transform transition-transform duration-300 ease-in-out lg:hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <img
                src="/auf-burger-logo.png"
                alt="Auf Burger"
                className="w-12 h-12 object-contain"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
              />
              <span className="text-xl font-bold text-white">Auf Burger</span>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-yellow-400/10 hover:to-yellow-500/10 transition-all duration-200 group active:scale-95"
                  >
                    <item.icon className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                    <span className="text-white group-hover:text-yellow-400 font-medium transition-colors">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-white/10 pt-6">
            <div className="text-center text-gray-400 text-sm bg-white/5 rounded-lg p-4">
              <p className="text-gray-300 font-medium">Open Daily</p>
              <p className="text-yellow-400 font-bold text-lg mt-1">10:00 AM - 11:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
