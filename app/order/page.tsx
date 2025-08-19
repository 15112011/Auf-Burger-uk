"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Star, Receipt, ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
}

interface CartItem extends MenuItem {
  quantity: number
}

export default function OrderPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showReceipt, setShowReceipt] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    notes: "",
  })

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Classic Auf Burger",
      description: "Premium beef patty, aged cheddar, lettuce, tomato, special sauce",
      price: 12.99,
      image: "/classic-beef-burger.png",
      category: "Signature",
      rating: 4.8,
    },
    {
      id: 2,
      name: "BBQ Bacon Deluxe",
      description: "Smoky BBQ sauce, crispy bacon, onion rings, pepper jack cheese",
      price: 15.99,
      image: "/bbq-bacon-burger-onion-rings.png",
      category: "Premium",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Mushroom Swiss",
      description: "Sautéed mushrooms, Swiss cheese, caramelized onions, truffle aioli",
      price: 14.49,
      image: "/placeholder-6pow3.png",
      category: "Gourmet",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Spicy Jalapeño",
      description: "Jalapeños, pepper jack, spicy mayo, avocado, crispy onions",
      price: 13.99,
      image: "/spicy-jalapeno-avocado-burger.png",
      category: "Spicy",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Veggie Supreme",
      description: "Plant-based patty, avocado, sprouts, tomato, vegan mayo",
      price: 11.99,
      image: "/vegetarian-burger.png",
      category: "Vegetarian",
      rating: 4.5,
    },
    {
      id: 6,
      name: "Double Stack",
      description: "Two beef patties, double cheese, bacon, special sauce",
      price: 18.99,
      image: "/double-stack-bacon-burger.png",
      category: "Premium",
      rating: 4.8,
    },
  ]

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem,
        )
      }
      return prevCart.filter((cartItem) => cartItem.id !== itemId)
    })
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
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
  }

  if (showReceipt) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Receipt */}
        <div className="container mx-auto px-4 py-8 max-w-md">
          <Card className="bg-gray-900/95 backdrop-blur-sm border-gray-700 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <img src="/auf-burger-logo.png" alt="Auf Burger" className="w-12 h-12 object-contain" />
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
              {/* Customer Info */}
              {customerInfo.name && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">Customer: {customerInfo.name}</p>
                  {customerInfo.phone && <p className="text-sm text-gray-300">Phone: {customerInfo.phone}</p>}
                </div>
              )}

              <Separator className="bg-gray-700" />

              {/* Order Items */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-white">{item.name}</p>
                      <p className="text-xs text-gray-300">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-sm text-yellow-400">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <Separator className="bg-gray-700" />

              {/* Order Summary */}
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Items */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Order Online</h1>
              <p className="text-muted-foreground text-lg">Select your favorite burgers and add them to your cart</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuItems.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-card/50 backdrop-blur-sm border-border/50"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-yellow-400 text-black font-medium">
                      {item.category}
                    </Badge>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">{item.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-yellow-400">${item.price}</span>
                      <Button
                        onClick={() => addToCart(item)}
                        size="sm"
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Your Order</span>
                </CardTitle>
                <CardDescription>
                  {cart.length === 0 ? "Your cart is empty" : `${getTotalItems()} items in cart`}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Add some delicious burgers to get started!</p>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="space-y-4 max-h-64 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate text-white">{item.name}</p>
                            <p className="text-sm text-yellow-400 font-semibold">${item.price}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeFromCart(item.id)}
                              className="w-8 h-8 p-0 bg-gray-700 border-gray-600 hover:bg-gray-600"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium text-white">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addToCart(item)}
                              className="w-8 h-8 p-0 bg-gray-700 border-gray-600 hover:bg-gray-600"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="bg-gray-700" />

                    {/* Customer Information */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-white">Customer Information</h4>
                      <div className="space-y-2">
                        <div>
                          <Label htmlFor="name" className="text-sm text-gray-300">
                            Name
                          </Label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                            className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-sm text-gray-300">
                            Phone (optional)
                          </Label>
                          <Input
                            id="phone"
                            placeholder="Your phone number"
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                            className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="notes" className="text-sm text-gray-300">
                            Special Instructions (optional)
                          </Label>
                          <Textarea
                            id="notes"
                            placeholder="Any special requests..."
                            value={customerInfo.notes}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                            rows={2}
                            className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-400 resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-gray-700" />

                    {/* Order Summary */}
                    <div className="space-y-2 bg-gray-800/30 p-4 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Subtotal:</span>
                        <span className="text-white">${getTotalPrice().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Tax (8.5%):</span>
                        <span className="text-white">${(getTotalPrice() * 0.085).toFixed(2)}</span>
                      </div>
                      <Separator className="bg-gray-600" />
                      <div className="flex justify-between font-bold">
                        <span className="text-white">Total:</span>
                        <span className="text-yellow-400">${(getTotalPrice() * 1.085).toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      onClick={generateReceipt}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3"
                      disabled={!customerInfo.name.trim()}
                    >
                      <Receipt className="w-4 h-4 mr-2" />
                      Generate Receipt
                    </Button>

                    <p className="text-xs text-gray-400 text-center">Show the receipt to the cashier for pickup</p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
