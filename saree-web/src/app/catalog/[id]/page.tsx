import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowLeft, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

async function getSaree(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase.from("sarees").select("*").eq("id", id).single();
    if (error) return null;
    return data;
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const saree = await getSaree(params.id);

    if (!saree) {
        notFound();
    }

    const ownerPhone = process.env.NEXT_PUBLIC_OWNER_PHONE || "919876543210";
    const message = encodeURIComponent(
        `Hi! I want to buy this saree:\nSaree: ${saree.title}\nPrice: ₹${saree.price}\nPlease share payment details.`
    );
    const whatsappUrl = `https://wa.me/${ownerPhone}?text=${message}`;

    return (
        <div className="container py-8 md:py-12">
            <Link
                href="/catalog"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
            >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Collection
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                {/* Image Section */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
                    <img
                        src={saree.image_url}
                        alt={saree.title}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Details Section */}
                <div className="flex flex-col">
                    <div className="mb-2">
                        <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                            {saree.category}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold md:text-4xl mb-2">{saree.title}</h1>
                    <p className="text-2xl font-bold text-primary mb-6">₹{saree.price.toLocaleString("en-IN")}</p>

                    <div className="prose prose-sm text-muted-foreground mb-8">
                        <p>{saree.description}</p>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 text-sm">
                            <span className="font-semibold w-20">Material:</span>
                            <span>{saree.material}</span>
                        </div>
                        {/* Add more details if available in DB */}
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row mb-8">
                        <Button asChild size="lg" className="w-full sm:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white">
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="mr-2 h-5 w-5" />
                                Buy Now on WhatsApp
                            </a>
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t pt-8">
                        <div className="flex flex-col items-center text-center p-4 bg-secondary/20 rounded-lg">
                            <Truck className="h-6 w-6 mb-2 text-primary" />
                            <span className="text-sm font-medium">Fast Delivery</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 bg-secondary/20 rounded-lg">
                            <ShieldCheck className="h-6 w-6 mb-2 text-primary" />
                            <span className="text-sm font-medium">Quality Assured</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
