"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters."),
    price: z.coerce.number().min(1, "Price must be greater than 0."),
    material: z.string().min(2, "Material is required."),
    description: z.string().min(10, "Description must be at least 10 characters."),
    category: z.string().min(1, "Category is required."),
    image: z.any().optional(), // We'll handle image validation manually for now
});

interface SareeFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export function SareeForm({ initialData, isEdit = false }: SareeFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            price: initialData?.price || "",
            material: initialData?.material || "",
            description: initialData?.description || "",
            category: initialData?.category || "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            let imageUrl = initialData?.image_url;

            // Handle Image Upload
            const imageFile = values.image?.[0];
            if (imageFile) {
                const fileExt = imageFile.name.split(".").pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const { error: uploadError, data } = await supabase.storage
                    .from("sarees")
                    .upload(fileName, imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from("sarees")
                    .getPublicUrl(fileName);

                imageUrl = publicUrl;
            }

            if (!imageUrl && !isEdit) {
                throw new Error("Image is required for new sarees");
            }

            const sareeData = {
                title: values.title,
                price: values.price,
                material: values.material,
                description: values.description,
                category: values.category,
                image_url: imageUrl,
            };

            if (isEdit) {
                const { error } = await supabase
                    .from("sarees")
                    .update(sareeData)
                    .eq("id", initialData.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from("sarees").insert([sareeData]);
                if (error) throw error;
            }

            router.push("/admin/dashboard");
            router.refresh();
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Royal Blue Kanjivaram" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price (₹)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="12999" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Silk">Silk</SelectItem>
                                        <SelectItem value="Cotton">Cotton</SelectItem>
                                        <SelectItem value="Banarasi">Banarasi</SelectItem>
                                        <SelectItem value="Georgette">Georgette</SelectItem>
                                        <SelectItem value="Chiffon">Chiffon</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="material"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Material</FormLabel>
                            <FormControl>
                                <Input placeholder="Pure Silk" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Describe the saree details, work, and occasion..."
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>Image {isEdit && "(Leave empty to keep existing)"}</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        onChange(e.target.files);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isEdit ? "Update Saree" : "Create Saree"}
                </Button>
            </form>
        </Form>
    );
}
