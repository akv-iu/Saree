import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Edit, Plus, Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";

export const revalidate = 0;

async function getSarees() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("sarees")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching sarees:", error);
        return [];
    }
    return data;
}

export default async function AdminDashboard() {
    const sarees = await getSarees();

    async function deleteSaree(formData: FormData) {
        "use server";
        const id = formData.get("id") as string;
        const supabase = createClient();

        // Delete image first (optional, but good practice)
        // For simplicity, we'll just delete the record for now

        const { error } = await supabase.from("sarees").delete().eq("id", id);
        if (error) {
            console.error("Error deleting saree:", error);
        }
        revalidatePath("/admin/dashboard");
        revalidatePath("/catalog");
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Manage Sarees</h1>
                <Link href="/admin/sarees/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add New Saree
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sarees.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No sarees found. Add one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            sarees.map((saree) => (
                                <TableRow key={saree.id}>
                                    <TableCell>
                                        <img
                                            src={saree.image_url}
                                            alt={saree.title}
                                            className="h-12 w-12 rounded object-cover"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{saree.title}</TableCell>
                                    <TableCell>{saree.category}</TableCell>
                                    <TableCell>₹{saree.price.toLocaleString("en-IN")}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/sarees/${saree.id}/edit`}>
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <form action={deleteSaree}>
                                                <input type="hidden" name="id" value={saree.id} />
                                                <Button variant="ghost" size="icon" className="text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
