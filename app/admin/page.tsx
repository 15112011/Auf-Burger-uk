"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, Star, DollarSign, Package, TrendingUp } from "lucide-react"
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

export default function AdminPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
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
  ])

  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    rating: "",
  })

  const categories = ["Signature", "Premium", "Gourmet", "Spicy", "Vegetarian"]

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      rating: "",
    })
  }

  const handleAdd = () => {
    if (!formData.name || !formData.price || !formData.category) return

    const newItem: MenuItem = {
      id: Math.max(...menuItems.map((item) => item.id)) + 1,
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      image: formData.image || "/placeholder.svg",
      category: formData.category,
      rating: Number.parseFloat(formData.rating) || 4.0,
    }

    setMenuItems([...menuItems, newItem])
    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      image: item.image,
      category: item.category,
      rating: item.rating.toString(),
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdate = () => {
    if (!editingItem || !formData.name || !formData.price || !formData.category) return

    const updatedItem: MenuItem = {
      ...editingItem,
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      image: formData.image || "/placeholder.svg",
      category: formData.category,
      rating: Number.parseFloat(formData.rating) || 4.0,
    }

    setMenuItems(menuItems.map((item) => (item.id === editingItem.id ? updatedItem : item)))
    resetForm()
    setEditingItem(null)
    setIsEditDialogOpen(false)
  }

  const handleDelete = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  const getStats = () => {
    const totalItems = menuItems.length
    const avgPrice = menuItems.reduce((sum, item) => sum + item.price, 0) / totalItems
    const avgRating = menuItems.reduce((sum, item) => sum + item.rating, 0) / totalItems
    const topCategory = categories.reduce((top, category) => {
      const count = menuItems.filter((item) => item.category === category).length
      const topCount = menuItems.filter((item) => item.category === top).length
      return count > topCount ? category : top
    }, categories[0])

    return { totalItems, avgPrice, avgRating, topCategory }
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Menu Management</h1>
            <p className="text-muted-foreground">Manage your restaurant's menu items</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 mt-4 md:mt-0">
                <Plus className="w-4 h-4 mr-2" />
                Add New Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-sm border-border/50">
              <DialogHeader>
                <DialogTitle>Add New Menu Item</DialogTitle>
                <DialogDescription>Create a new burger for your menu</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="add-name">Name</Label>
                  <Input
                    id="add-name"
                    placeholder="Burger name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background/50 border-border/50"
                  />
                </div>
                <div>
                  <Label htmlFor="add-description">Description</Label>
                  <Textarea
                    id="add-description"
                    placeholder="Describe the burger"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="bg-background/50 border-border/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="add-price">Price ($)</Label>
                    <Input
                      id="add-price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="add-rating">Rating</Label>
                    <Input
                      id="add-rating"
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      placeholder="4.0"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="add-category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="bg-background/50 border-border/50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-card/95 backdrop-blur-sm border-border/50">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="add-image">Image URL (optional)</Label>
                  <Input
                    id="add-image"
                    placeholder="/path/to/image.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="bg-background/50 border-border/50"
                  />
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button onClick={handleAdd} className="flex-1 bg-primary hover:bg-primary/90">
                    Add Item
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      resetForm()
                      setIsAddDialogOpen(false)
                    }}
                    className="flex-1 bg-transparent border-border/50"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalItems}</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Price</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${stats.avgPrice.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.avgRating.toFixed(1)}</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Category</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.topCategory}</div>
            </CardContent>
          </Card>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card key={item.id} className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 card-hover">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{item.category}</Badge>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-primary font-medium">{item.rating}</span>
                  </div>
                </div>
                <CardDescription className="text-muted-foreground leading-relaxed line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary">${item.price}</span>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                    className="flex-1 bg-transparent border-border/50 hover:bg-primary/10"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-red-400 hover:text-red-300 bg-transparent border-red-500/30 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-card/95 backdrop-blur-sm border-border/50">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Menu Item</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{item.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-transparent border-border/50">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-sm border-border/50">
            <DialogHeader>
              <DialogTitle>Edit Menu Item</DialogTitle>
              <DialogDescription>Update the details of this menu item</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  placeholder="Burger name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background/50 border-border/50"
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  placeholder="Describe the burger"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="bg-background/50 border-border/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="bg-background/50 border-border/50"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-rating">Rating</Label>
                  <Input
                    id="edit-rating"
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    placeholder="4.0"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="bg-background/50 border-border/50"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="bg-background/50 border-border/50">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 backdrop-blur-sm border-border/50">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  placeholder="/path/to/image.jpg"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="bg-background/50 border-border/50"
                />
              </div>
              <div className="flex space-x-2 pt-4">
                <Button onClick={handleUpdate} className="flex-1 bg-primary hover:bg-primary/90">
                  Update Item
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    resetForm()
                    setEditingItem(null)
                    setIsEditDialogOpen(false)
                  }}
                  className="flex-1 bg-transparent border-border/50"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
