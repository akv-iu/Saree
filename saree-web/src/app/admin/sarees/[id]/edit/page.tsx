import { createClient } from "@/lib/supabase";
import { SareeForm } from "@/components/SareeForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

async function getSaree(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase.from("sarees").select("*").eq("id", id).single();
    if (error) return null;
    return data;
}

export default async function EditSareePage({ params }: { params: { id: string } }) {
    const saree = await getSaree(params.id);

    if (!saree) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Edit Saree</h1>
            <SareeForm initialData={saree} isEdit />
        </div>
    );
}
