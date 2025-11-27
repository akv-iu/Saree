import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const categories = [
    {
      title: "Silk Sarees",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2574&auto=format&fit=crop",
      href: "/catalog?category=Silk",
    },
    {
      title: "Cotton Sarees",
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop",
      href: "/catalog?category=Cotton",
    },
    {
      title: "Banarasi",
      image: "https://images.unsplash.com/photo-1583391733958-e023765f350a?q=80&w=2574&auto=format&fit=crop",
      href: "/catalog?category=Banarasi",
    },
  ];

  const featuredSarees = [
    {
      id: 1,
      title: "Royal Blue Kanjivaram",
      price: 12999,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2574&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Red Banarasi Silk",
      price: 8999,
      image: "https://images.unsplash.com/photo-1583391733958-e023765f350a?q=80&w=2574&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Green Cotton Handloom",
      price: 2499,
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=2574&auto=format&fit=crop",
    },
  ];

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-black/5">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2574&auto=format&fit=crop"
            alt="Hero Banner"
            style={{ objectPosition: 'center top' }}
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="container relative z-10 flex h-full flex-col items-start justify-center text-white">
          <h1 className="mb-4 text-5xl font-bold leading-tight md:text-7xl">
            Timeless Elegance <br /> Woven in Tradition
          </h1>
          <p className="mb-8 max-w-lg text-lg text-gray-200">
            Discover our exquisite collection of handpicked sarees, crafted for every occasion.
          </p>
          <Link href="/catalog">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full">
              Shop Collection
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container">
        <h2 className="mb-8 text-3xl font-bold text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.title} href={category.href} className="group block overflow-hidden rounded-lg relative aspect-[4/5]">
              <img
                src={category.image}
                alt={category.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold">{category.title}</h3>
                <span className="flex items-center gap-2 text-sm font-medium mt-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Collection</h2>
          <Link href="/catalog">
            <Button variant="link" className="text-primary">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {featuredSarees.map((saree) => (
            <Card key={saree.id} className="overflow-hidden border-none shadow-none group">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
                  <img
                    src={saree.image}
                    alt={saree.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{saree.title}</h3>
                <p className="text-muted-foreground">₹{saree.price.toLocaleString('en-IN')}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
