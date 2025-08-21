"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Star, Search, Filter, Flame, Leaf } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceFilter, setPriceFilter] = useState("All")

  const menuItems = [
    {
      id: 1,
      name: "Signature Auf Burger",
      description: "Premium wagyu beef, aged cheddar, truffle aioli, arugula",
      price: 18.99,
      image: "/classic-beef-burger.png",
      category: "Signature",
      rating: 4.9,
      isSpicy: false,
      isVegetarian: false,
    },
    {
      id: 2,
      name: "BBQ Smoke Stack",
      description: "Slow-smoked brisket, crispy onions, bourbon BBQ glaze",
      price: 16.99,
      image: "/bbq-bacon-burger-onion-rings.png",
      category: "Premium",
      rating: 4.8,
      isSpicy: false,
      isVegetarian: false,
    },
    {
      id: 3,
      name: "Spicy Fire Burger",
      description: "Ghost pepper jack, jalapeños, chipotle mayo, avocado",
      price: 15.99,
      image: "/spicy-jalapeno-avocado-burger.png",
      category: "Spicy",
      rating: 4.7,
      isSpicy: true,
      isVegetarian: false,
    },
    {
      id: 4,
      name: "Garden Supreme",
      description: "Plant-based patty, avocado, sprouts, vegan aioli",
      price: 14.99,
      image: "/vegetarian-burger.png",
      category: "Vegetarian",
      rating: 4.6,
      isSpicy: false,
      isVegetarian: true,
    },
    {
      id: 5,
      name: "Double Stack Beast",
      description: "Two beef patties, double cheese, bacon, special sauce",
      price: 21.99,
      image: "/double-stack-bacon-burger.png",
      category: "Premium",
      rating: 4.8,
      isSpicy: false,
      isVegetarian: false,
    },
    {
      id: 6,
      name: "Classic Cheeseburger",
      description: "Beef patty, American cheese, lettuce, tomato, pickles",
      price: 12.99,
      image: "/classic-beef-burger.png",
      category: "Classic",
      rating: 4.5,
      isSpicy: false,
      isVegetarian: false,
    },
  ]

  const categories = ["All", "Signature", "Premium", "Classic", "Spicy", "Vegetarian"]
  const priceRanges = ["All", "Under $15", "$15-$20", "Over $20"]

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesPrice =
      priceFilter === "All" ||
      (priceFilter === "Under $15" && item.price < 15) ||
      (priceFilter === "$15-$20" && item.price >= 15 && item.price <= 20) ||
      (priceFilter === "Over $20" && item.price > 20)

    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Menu</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our complete collection of premium burgers, each crafted with passion and served with excellence.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-card/30 backdrop-blur-sm border-y border-border/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search burgers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-primary text-primary-foreground" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Price Filter */}
            <div className="flex gap-2">
              <Filter className="w-4 h-4 text-muted-foreground mt-2" />
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="bg-background border border-border rounded-md px-3 py-1 text-sm"
              >
                {priceRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No burgers found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                  setPriceFilter("All")
                }}
                className="mt-4"
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  Showing {filteredItems.length} of {menuItems.length} burgers
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item, index) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden card-hover bg-card/50 backdrop-blur-sm border-border/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className="bg-primary/90 text-primary-foreground">{item.category}</Badge>
                        {item.isSpicy && (
                          <Badge className="bg-secondary/90 text-secondary-foreground">
                            <Flame className="w-3 h-3 mr-1" />
                            Spicy
                          </Badge>
                        )}
                        {item.isVegetarian && (
                          <Badge className="bg-green-600/90 text-white">
                            <Leaf className="w-3 h-3 mr-1" />
                            Veggie
                          </Badge>
                        )}
                      </div>

                      <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span className="text-white font-medium">{item.rating}</span>
                        </div>
                      </div>
                    </div>

                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-bold flex items-center gap-2">
                        {item.name}
                        {item.isSpicy && <Flame className="w-5 h-5 text-secondary" />}
                        {item.isVegetarian && <Leaf className="w-5 h-5 text-green-500" />}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-primary">${item.price}</span>
                        <Link href={`/product/${item.id}`}>
                          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
