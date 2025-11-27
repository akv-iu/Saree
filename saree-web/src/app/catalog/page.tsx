import { createClient } from "@/lib/supabase";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Filter } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export const revalidate = 0; // Disable caching for real-time updates

async function getSarees(category?: string) {
    const supabase = createClient();
    let query = supabase.from("sarees").select("*").order("created_at", { ascending: false });

    if (category) {
        query = query.eq("category", category);
    }

    const { data, error } = await query;
    if (error) {
        console.error("Error fetching sarees:", error);
        return [];
    }
    return data;
}

export default async function CatalogPage({
    searchParams,
}: {
    searchParams: { category?: string };
}) {
    const category = searchParams.category;
    const sarees = await getSarees(category);

    const categories = ["Silk", "Cotton", "Banarasi", "Georgette", "Chiffon"];

    return (
        <div className="container py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters (Desktop) */}
                <aside className="hidden md:block w-64 space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Categories</h3>
                        <div className="space-y-2">
                            <Link
                                href="/catalog"
                                className={`block text-sm ${!category ? "font-bold text-primary" : "text-muted-foreground hover:text-primary"
                                    }`}
                            >
                                All Sarees
                            </Link>
                            {categories.map((c) => (
                                <Link
                                    key={c}
                                    href={`/catalog?category=${c}`}
                                    className={`block text-sm ${category === c ? "font-bold text-primary" : "text-muted-foreground hover:text-primary"
                                        }`}
                                >
                                    {c}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <Separator />
                    {/* Add more filters here like Price, Material etc. */}
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold">
                            {category ? `${category} Sarees` : "All Sarees"}
                            <span className="ml-2 text-sm font-normal text-muted-foreground">
                                ({sarees.length} items)
                            </span>
                        </h1>

                        {/* Mobile Filter Sheet */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="sm" className="md:hidden">
                                    <Filter className="mr-2 h-4 w-4" /> Filters
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <SheetHeader>
                                    <SheetTitle>Filters</SheetTitle>
                                    <SheetDescription>Refine your search</SheetDescription>
                                </SheetHeader>
                                <div className="mt-8 space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Categories</h3>
                                        <div className="space-y-2">
                                            <Link href="/catalog" className="block text-sm font-medium">
                                                All Sarees
                                            </Link>
                                            {categories.map((c) => (
                                                <Link
                                                    key={c}
                                                    href={`/catalog?category=${c}`}
                                                    className="block text-sm text-muted-foreground"
                                                >
                                                    {c}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {sarees.length === 0 ? (
                        <div className="text-center py-16 text-muted-foreground">
                            No sarees found in this category.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sarees.map((saree) => (
                                <Link key={saree.id} href={`/catalog/${saree.id}`}>
                                    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                                        <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                                            <img
                                                src={saree.image_url}
                                                alt={saree.title}
                                                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                                            />
                                        </div>
                                        <CardContent className="p-4 flex-1">
                                            <div className="text-sm text-muted-foreground mb-1">{saree.category}</div>
                                            <h3 className="font-semibold text-lg line-clamp-1">{saree.title}</h3>
                                            <p className="text-lg font-bold mt-2">₹{saree.price.toLocaleString("en-IN")}</p>
                                        </CardContent>
                                        <CardFooter className="p-4 pt-0">
                                            <Button className="w-full">View Details</Button>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
