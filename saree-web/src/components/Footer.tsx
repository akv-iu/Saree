import Link from 'next/link'

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container py-8 md:py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">SareeStore</h3>
                        <p className="text-sm text-muted-foreground">
                            Celebrating the elegance of Indian tradition with our handpicked collection of sarees.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/catalog" className="text-muted-foreground hover:text-primary">
                                    All Sarees
                                </Link>
                            </li>
                            <li>
                                <Link href="/catalog?category=Silk" className="text-muted-foreground hover:text-primary">
                                    Silk Collection
                                </Link>
                            </li>
                            <li>
                                <Link href="/catalog?category=Cotton" className="text-muted-foreground hover:text-primary">
                                    Cotton Collection
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <p className="text-sm text-muted-foreground">
                            Email: hello@sareestore.com<br />
                            Phone: +91 98765 43210
                        </p>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} SareeStore. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
