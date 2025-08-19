import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Clock, MapPin, Phone, ChefHat, Award, Flame } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"

export default function HomePage() {
  const featuredItems = [
    {
      id: 1,
      name: "Signature Auf Burger",
      description: "Premium wagyu beef, aged cheddar, truffle aioli, arugula",
      price: 18.99,
      image: "/classic-beef-burger.png",
      category: "Signature",
      rating: 4.9,
      isSpecial: true,
    },
    {
      id: 2,
      name: "BBQ Smoke Stack",
      description: "Slow-smoked brisket, crispy onions, bourbon BBQ glaze",
      price: 16.99,
      image: "/bbq-bacon-burger-onion-rings.png",
      category: "Premium",
      rating: 4.8,
      isSpecial: false,
    },
    {
      id: 3,
      name: "Spicy Fire Burger",
      description: "Ghost pepper jack, jalapeños, chipotle mayo, avocado",
      price: 15.99,
      image: "/spicy-jalapeno-avocado-burger.png",
      category: "Spicy",
      rating: 4.7,
      isSpecial: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient">
          <div className="absolute inset-0 bg-[url('/gourmet-burger-hero.png')] bg-cover bg-center opacity-30" />
        </div>

        {/* Floating Elements */}
        <div
          className="absolute top-20 left-10 w-16 h-16 bg-primary/20 rounded-full blur-xl float-animation"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-secondary/20 rounded-full blur-xl float-animation"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-1/4 w-20 h-20 bg-primary/15 rounded-full blur-xl float-animation"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <div className="slide-in-up">
            <div className="flex items-center justify-center mb-6">
              <img src="/auf-burger-logo.png" alt="Auf Burger Logo" className="w-24 h-24 glow-effect" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Premium <span className="text-primary">Burger</span>
              <br />
              Experience
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-3xl mx-auto font-light">
              Crafted with passion, served with excellence. Every bite tells a story of premium ingredients and bold
              flavors.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/cart">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-lg font-semibold glow-effect"
                >
                  Order Now
                </Button>
              </Link>
              <Link href="/menu">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-black px-10 py-4 text-lg font-semibold bg-transparent"
                >
                  View Menu
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Featured</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Signature Creations</h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
              Our chef's masterpieces, crafted with the finest ingredients and innovative techniques
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <Card
                key={item.id}
                className={`overflow-hidden card-hover bg-card/50 backdrop-blur-sm border-border/50 ${item.isSpecial ? "ring-2 ring-primary/50" : ""}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <Badge
                    className={`absolute top-4 left-4 ${item.isSpecial ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
                  >
                    {item.category}
                  </Badge>
                  {item.isSpecial && (
                    <div className="absolute top-4 right-4">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                  )}
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
                    {item.category === "Spicy" && <Flame className="w-5 h-5 text-secondary" />}
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

          <div className="text-center mt-12">
            <Link href="/menu">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 bg-transparent"
              >
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Auf Burger</h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
              We're not just another burger joint. We're craftsmen dedicated to perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                <ChefHat className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Master Chefs</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our experienced chefs bring years of culinary expertise to every burger, ensuring perfection in every
                bite.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                <Award className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium Ingredients</h3>
              <p className="text-muted-foreground leading-relaxed">
                We source only the finest, locally-sourced ingredients to create burgers that exceed expectations.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                <Clock className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Fast Service</h3>
              <p className="text-muted-foreground leading-relaxed">
                Quick service without compromising quality. Fresh, hot burgers ready in minutes, not hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-background via-primary/5 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience Excellence?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've made Auf Burger their go-to destination for premium burgers.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/cart">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-lg font-semibold"
              >
                Start Your Order
              </Button>
            </Link>
            <Link href="/info">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-10 py-4 text-lg font-semibold bg-transparent"
              >
                Visit Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border/50 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src="/auf-burger-logo.png" alt="Auf Burger" className="w-10 h-10" />
                <span className="text-2xl font-bold">Auf Burger</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Premium burgers crafted with passion and served with excellence. Experience the difference quality
                makes.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/menu" className="block text-muted-foreground hover:text-primary transition-colors">
                  Menu
                </Link>
                <Link href="/info" className="block text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
                <Link href="/cart" className="block text-muted-foreground hover:text-primary transition-colors">
                  Order Online
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  (555) 123-BURG
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Downtown Location
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  10:00 AM - 11:00 PM
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Auf Burger. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
