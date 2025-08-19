"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Star, ArrowLeft, Plus, Minus, Flame, Leaf } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import Navbar from "@/components/navbar"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  ingredients: string[]
  allergens: string[]
  isSpicy?: boolean
  isVegetarian?: boolean
}

interface CartItem {
  productId: number
  name: string
  basePrice: number
  quantity: number
  size: string
  extras: string[]
  totalPrice: number
}

const products: Product[] = [
  {
    id: 1,
    name: "Signature Auf Burger",
    description: "Premium wagyu beef, aged cheddar, truffle aioli, arugula on brioche bun",
    price: 18.99,
    image: "/classic-beef-burger.png",
    category: "Signature",
    rating: 4.9,
    ingredients: ["Wagyu beef patty", "Aged cheddar", "Truffle aioli", "Fresh arugula", "Brioche bun"],
    allergens: ["Gluten", "Dairy", "Eggs"],
  },
  {
    id: 2,
    name: "BBQ Smoke Stack",
    description: "Slow-smoked brisket, crispy onions, bourbon BBQ glaze on toasted sesame bun",
    price: 16.99,
    image: "/bbq-bacon-burger-onion-rings.png",
    category: "Premium",
    rating: 4.8,
    ingredients: ["Slow-smoked brisket", "Crispy onions", "Bourbon BBQ sauce", "Sesame bun"],
    allergens: ["Gluten", "Soy"],
  },
  {
    id: 3,
    name: "Spicy Fire Burger",
    description: "Ghost pepper jack, jalapeños, chipotle mayo, avocado on jalapeño bun",
    price: 15.99,
    image: "/spicy-jalapeno-avocado-burger.png",
    category: "Spicy",
    rating: 4.7,
    ingredients: ["Beef patty", "Ghost pepper jack", "Fresh jalapeños", "Chipotle mayo", "Avocado", "Jalapeño bun"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    isSpicy: true,
  },
]

const extras = [
  { name: "Extra Cheese", price: 1.5 },
  { name: "Bacon", price: 2.0 },
  { name: "Avocado", price: 1.75 },
  { name: "Mushrooms", price: 1.25 },
  { name: "Onion Rings", price: 2.5 },
  { name: "Extra Patty", price: 4.0 },
]

const sizes = [
  { name: "Regular", price: 0 },
  { name: "Large", price: 3.0 },
  { name: "XL", price: 5.0 },
]

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = Number.parseInt(params.id as string)
  const product = products.find((p) => p.id === productId)

  const [selectedSize, setSelectedSize] = useState("Regular")
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/menu">
            <Button>Back to Menu</Button>
          </Link>
        </div>
      </div>
    )
  }

  const getSizePrice = () => {
    const size = sizes.find((s) => s.name === selectedSize)
    return size ? size.price : 0
  }

  const getExtrasPrice = () => {
    return selectedExtras.reduce((total, extraName) => {
      const extra = extras.find((e) => e.name === extraName)
      return total + (extra ? extra.price : 0)
    }, 0)
  }

  const getTotalPrice = () => {
    return (product.price + getSizePrice() + getExtrasPrice()) * quantity
  }

  const handleExtraChange = (extraName: string, checked: boolean) => {
    if (checked) {
      setSelectedExtras([...selectedExtras, extraName])
    } else {
      setSelectedExtras(selectedExtras.filter((name) => name !== extraName))
    }
  }

  const addToCart = () => {
    const cartItem: CartItem = {
      productId: product.id,
      name: product.name,
      basePrice: product.price,
      quantity,
      size: selectedSize,
      extras: selectedExtras,
      totalPrice: getTotalPrice(),
    }

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    const updatedCart = [...existingCart, cartItem]
    localStorage.setItem("cart", JSON.stringify(updatedCart))

    // Redirect to cart
    router.push("/cart")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link
          href="/menu"
          className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-6">
            <div className="aspect-square relative overflow-hidden rounded-2xl bg-muted">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-primary text-primary-foreground">{product.category}</Badge>
                {product.isSpicy && (
                  <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
                    <Flame className="w-3 h-3 mr-1" />
                    Spicy
                  </Badge>
                )}
                {product.isVegetarian && (
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                    <Leaf className="w-3 h-3 mr-1" />
                    Vegetarian
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Allergen Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {product.allergens.map((allergen, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {allergen}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details & Customization */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white">{product.name}</h1>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-white">{product.rating}</span>
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">{product.description}</p>
              <div className="text-3xl font-bold text-yellow-400">${product.price.toFixed(2)}</div>
            </div>

            {/* Size Selection */}
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white text-xl">Choose Size</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="space-y-4">
                  {sizes.map((size) => (
                    <div
                      key={size.name}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
                    >
                      <RadioGroupItem value={size.name} id={size.name} className="border-gray-600 text-yellow-400" />
                      <Label htmlFor={size.name} className="flex-1 cursor-pointer text-white">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{size.name}</span>
                          <span className="text-yellow-400 font-semibold">
                            {size.price > 0 ? `+$${size.price.toFixed(2)}` : "Included"}
                          </span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Extras */}
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white text-xl">Add Extras</CardTitle>
                <CardDescription className="text-gray-400">
                  Customize your burger with additional toppings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {extras.map((extra) => (
                    <div
                      key={extra.name}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
                    >
                      <Checkbox
                        id={extra.name}
                        checked={selectedExtras.includes(extra.name)}
                        onCheckedChange={(checked) => handleExtraChange(extra.name, checked as boolean)}
                        className="border-gray-600 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                      />
                      <Label htmlFor={extra.name} className="flex-1 cursor-pointer text-white">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{extra.name}</span>
                          <span className="text-yellow-400 font-semibold">+${extra.price.toFixed(2)}</span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quantity & Add to Cart */}
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700/50 shadow-xl">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <Label className="text-white text-lg font-semibold mb-4 block">Quantity</Label>
                    <div className="flex items-center justify-center space-x-6">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="border-gray-600 bg-gray-800/50 text-white hover:bg-gray-700 w-12 h-12"
                      >
                        <Minus className="w-5 h-5" />
                      </Button>
                      <span className="text-2xl font-bold text-white w-16 text-center bg-gray-800/50 py-2 px-4 rounded-lg">
                        {quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setQuantity(quantity + 1)}
                        className="border-gray-600 bg-gray-800/50 text-white hover:bg-gray-700 w-12 h-12"
                      >
                        <Plus className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="space-y-3 bg-gray-800/30 p-4 rounded-lg">
                    <div className="flex justify-between text-gray-300">
                      <span>Base Price:</span>
                      <span>${product.price.toFixed(2)}</span>
                    </div>
                    {getSizePrice() > 0 && (
                      <div className="flex justify-between text-gray-300">
                        <span>Size ({selectedSize}):</span>
                        <span>+${getSizePrice().toFixed(2)}</span>
                      </div>
                    )}
                    {getExtrasPrice() > 0 && (
                      <div className="flex justify-between text-gray-300">
                        <span>Extras:</span>
                        <span>+${getExtrasPrice().toFixed(2)}</span>
                      </div>
                    )}
                    {quantity > 1 && (
                      <div className="flex justify-between text-gray-300">
                        <span>Quantity:</span>
                        <span>× {quantity}</span>
                      </div>
                    )}
                    <Separator className="bg-gray-600" />
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-white">Total:</span>
                      <span className="text-yellow-400">${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={addToCart}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
