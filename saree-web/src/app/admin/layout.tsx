'use client'

import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LayoutDashboard, PlusCircle, LogOut } from 'lucide-react'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push('/admin/login')
            }
            setLoading(false)
        }

        checkUser()
    }, [router, supabase])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>
    }

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/admin/dashboard" className="text-lg font-bold">
                            Admin Dashboard
                        </Link>
                        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
                            <Link href="/admin/dashboard" className="flex items-center gap-2 hover:text-primary">
                                <LayoutDashboard className="h-4 w-4" />
                                Overview
                            </Link>
                            <Link href="/admin/sarees/new" className="flex items-center gap-2 hover:text-primary">
                                <PlusCircle className="h-4 w-4" />
                                Add Saree
                            </Link>
                        </nav>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </header>
            <main className="flex-1 container py-8">
                {children}
            </main>
        </div>
    )
}
