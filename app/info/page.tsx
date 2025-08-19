import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Heart, Users, Award } from "lucide-react"
import Link from "next/link"

export default function InfoPage() {
  const workingHours = [
    { day: "Monday - Thursday", hours: "11:00 AM - 10:00 PM" },
    { day: "Friday - Saturday", hours: "11:00 AM - 11:00 PM" },
    { day: "Sunday", hours: "12:00 PM - 9:00 PM" },
  ]

  const socialLinks = [
    { name: "Instagram", icon: Instagram, url: "#", handle: "@aufburger" },
    { name: "Facebook", icon: Facebook, url: "#", handle: "Auf Burger Official" },
    { name: "Twitter", icon: Twitter, url: "#", handle: "@aufburger" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-xl">Auf Burger</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Menu
            </Link>
            <Link href="/info" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/order" className="text-muted-foreground hover:text-primary transition-colors">
              Order
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <Link href="/order">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Order Now
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/restaurant-interior.png')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Auf Burger</h1>
          <p className="text-lg md:text-xl text-white/90">Discover the story behind our passion for premium burgers</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
              <p className="mb-6">
                Founded in 2024, Auf Burger began as a dream to create the perfect burger experience. Our founders,
                passionate food enthusiasts, traveled across the country tasting burgers and learning from the best
                chefs to bring you something truly special.
              </p>
              <p className="mb-6">
                We believe that a great burger starts with great ingredients. That's why we source our beef from local
                farms, use artisanal buns baked fresh daily, and create our signature sauces in-house. Every burger is
                crafted with care and attention to detail.
              </p>
              <p>
                At Auf Burger, we're not just serving food – we're creating experiences. From our welcoming atmosphere
                to our commitment to quality, everything we do is designed to make your visit memorable.
              </p>
            </div>
          </div>

          {/* Values Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle>Quality First</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We use only the finest ingredients, sourced locally whenever possible, to ensure every bite is
                  exceptional.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle>Community Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We're proud to be part of the local community, supporting local farmers and creating jobs for our
                  neighbors.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  From our kitchen to your table, we maintain the highest standards in food preparation and customer
                  service.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="bg-muted py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground text-lg">
              Visit us, call us, or follow us on social media for the latest updates
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Location</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    123 Burger Street
                    <br />
                    Downtown District
                    <br />
                    City, State 12345
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>Phone</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    <a href="tel:+15551234287" className="hover:text-primary transition-colors">
                      (555) 123-BURG
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Call for takeout orders or reservations</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>Email</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    <a href="mailto:hello@aufburger.com" className="hover:text-primary transition-colors">
                      hello@aufburger.com
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">For inquiries and feedback</p>
                </CardContent>
              </Card>
            </div>

            {/* Working Hours & Social */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>Working Hours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {workingHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium">{schedule.day}</span>
                        <span className="text-muted-foreground">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> Kitchen closes 30 minutes before closing time
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                  <CardDescription>Stay updated with our latest news and special offers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{social.name}</p>
                              <p className="text-sm text-muted-foreground">{social.handle}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={social.url} target="_blank" rel="noopener noreferrer">
                              Follow
                            </a>
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Try Our Burgers?</h2>
          <p className="text-lg mb-8 text-primary-foreground/90">Visit us today or place an order online for pickup</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Order Online
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3 bg-transparent"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-xl">Auf Burger</span>
          </Link>
          <p className="text-sm text-background/70 mb-4">Premium burgers crafted with passion since 2024</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
            <Link href="/" className="hover:text-primary transition-colors">
              Menu
            </Link>
            <Link href="/order" className="hover:text-primary transition-colors">
              Order Online
            </Link>
            <span>📞 (555) 123-BURG</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
