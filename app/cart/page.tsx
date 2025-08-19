"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Trash2, Receipt, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"

interface CartItem {
  productId: number
  name: string
  basePrice: number
  quantity: number
  size: string
  extras: string[]
  totalPrice: number
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showReceipt, setShowReceipt] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    notes: "",
  })

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCart(savedCart)
  }, [])

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(index)
      return
    }

    const newCart = cart.map((item, i) => {
      if (i === index) {
        const unitPrice = item.totalPrice / item.quantity
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: unitPrice * newQuantity,
        }
      }
      return item
    })
    updateCart(newCart)
  }

  const removeItem = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index)
    updateCart(newCart)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const generateReceipt = () => {
    if (cart.length === 0) return
    setShowReceipt(true)
  }

  const resetOrder = () => {
    setCart([])
    setShowReceipt(false)
    setCustomerInfo({ name: "", phone: "", notes: "" })
    localStorage.removeItem("cart")
  }

  if (showReceipt) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="container mx-auto px-4 py-8 max-w-md">
          <Card className="bg-gray-900/95 backdrop-blur-sm border-gray-700 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <img src="/auf-burger-logo.png" alt="Auf Burger" className="w-12 h-12 rounded-lg" />
                <span className="font-bold text-xl text-white">Auf Burger</span>
              </div>
              <p className="text-sm text-gray-300">123 Burger Street, Downtown</p>
              <p className="text-sm text-gray-300">(555) 123-BURG</p>
              <Separator className="my-4 bg-gray-700" />
              <div className="flex items-center justify-center space-x-2">
                <Receipt className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold text-white">ORDER RECEIPT</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {customerInfo.name && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">Customer: {customerInfo.name}</p>
                  {customerInfo.phone && <p className="text-sm text-gray-300">Phone: {customerInfo.phone}</p>}
                </div>
              )}

              <Separator className="bg-gray-700" />

              <div className="space-y-3">
                {cart.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-white">{item.name}</p>
                        <p className="text-xs text-gray-300">
                          {item.size} • Qty: {item.quantity}
                        </p>
                        {item.extras.length > 0 && (
                          <p className="text-xs text-gray-300">Extras: {item.extras.join(", ")}</p>
                        )}
                      </div>
                      <p className="font-medium text-sm text-yellow-400">${item.totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-gray-700" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-300">Subtotal:</span>
                  <span className="text-sm text-white">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-300">Tax (8.5%):</span>
                  <span className="text-sm text-white">${(getTotalPrice() * 0.085).toFixed(2)}</span>
                </div>
                <Separator className="bg-gray-700" />
                <div className="flex justify-between font-bold">
                  <span className="text-white">Total:</span>
                  <span className="text-yellow-400">${(getTotalPrice() * 1.085).toFixed(2)}</span>
                </div>
              </div>

              {customerInfo.notes && (
                <>
                  <Separator className="bg-gray-700" />
                  <div>
                    <p className="text-sm font-medium mb-1 text-white">Special Instructions:</p>
                    <p className="text-sm text-gray-300">{customerInfo.notes}</p>
                  </div>
                </>
              )}

              <Separator className="bg-gray-700" />

              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-white">Order #{Math.floor(Math.random() * 1000) + 100}</p>
                <p className="text-xs text-gray-300">
                  {new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}
                </p>
                <p className="text-xs text-gray-300">Estimated pickup: 15-20 minutes</p>
              </div>

              <div className="bg-yellow-400/10 border border-yellow-400/30 p-3 rounded-lg text-center">
                <p className="text-sm font-medium text-yellow-400">Show this receipt to the cashier</p>
                <p className="text-xs text-gray-300 mt-1">Thank you for choosing Auf Burger!</p>
              </div>

              <Button
                onClick={resetOrder}
                className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white border-gray-600"
                variant="outline"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                New Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Cart</h1>
            <p className="text-muted-foreground">
              {cart.length === 0 ? "Your cart is empty" : `${getTotalItems()} items in cart`}
            </p>
          </div>
          <Link href="/menu">
            <Button variant="outline" className="bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-muted-foreground/50" />
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add some delicious burgers to get started!</p>
            <Link href="/menu">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Browse Menu
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0" />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>Size: {item.size}</p>
                          {item.extras.length > 0 && <p>Extras: {item.extras.join(", ")}</p>}
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <Button size="sm" variant="destructive" onClick={() => removeItem(index)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">${item.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Customer Information */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white text-lg">Customer Information</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-300 font-medium mb-2 block">
                          Name *
                        </Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                          className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-gray-300 font-medium mb-2 block">
                          Phone (optional)
                        </Label>
                        <Input
                          id="phone"
                          placeholder="Your phone number"
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                          className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20"
                        />
                      </div>
                      <div>
                        <Label htmlFor="notes" className="text-gray-300 font-medium mb-2 block">
                          Special Instructions (optional)
                        </Label>
                        <Textarea
                          id="notes"
                          placeholder="Any special requests..."
                          value={customerInfo.notes}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                          rows={3}
                          className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20 resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  {/* Price Summary */}
                  <div className="space-y-3 bg-gray-800/30 p-4 rounded-lg">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal:</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Tax (8.5%):</span>
                      <span>${(getTotalPrice() * 0.085).toFixed(2)}</span>
                    </div>
                    <Separator className="bg-gray-600" />
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-white">Total:</span>
                      <span className="text-yellow-400">${(getTotalPrice() * 1.085).toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={generateReceipt}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!customerInfo.name.trim()}
                  >
                    <Receipt className="w-5 h-5 mr-2" />
                    Generate Receipt
                  </Button>

                  <p className="text-xs text-gray-400 text-center">Show the receipt to the cashier for pickup</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
