import { Label } from "@/components/ui/label";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import SearchSelect from "@/components/ui/search-select";
import { Head, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import SubmitBtn from "@/components/ui/SubmitBtn";

export default function ComplaintForm({ branchData }: { branchData: any }) {
    // Initialize form data with one image instead of an array
    const { post, data, setData, errors, processing } = useForm({
        branch_id: "",
        name: "",
        quantity: "",
        price: "",
        image: null as File | null, // Single image
    });

    // Handle image upload for a single file
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0]; // Only pick the first image file
            setSelectedImage(file);
            setData("image", file);
        }
    };

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/resources", {
            onSuccess: () => {
                toast.success("Complaint has been created!");
            },
            onError: (error) => {
                console.log(error.message);
                toast.error(
                    "Something went wrong while submitting the complaint!"
                );
            },
        });
    };

    return (
        <Authenticated>
            <Head title="Submit a Complaint" />
            <form onSubmit={handleSubmit} className="space-y-4 px-4 py-6">
                <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    <LabelInputContainer
                        type="text"
                        label="Resource Name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        errorMessage={errors.name}
                        placeholder="Enter the name of Item"
                        required
                    />
                    <LabelInputContainer
                        type="number"
                        label="Quantity"
                        value={data.quantity}
                        onChange={(e) => setData("quantity", e.target.value)}
                        errorMessage={errors.quantity}
                        placeholder="eg: 200"
                        required
                    />
                    <LabelInputContainer
                        type="number"
                        label="Price"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        errorMessage={errors.price}
                        placeholder="Price per item"
                        required
                    />
                </div>
                <SearchSelect
                    label="Select Branch"
                    items={branchData}
                    onSelect={(unique_id: string) =>
                        setData({ ...data, branch_id: unique_id })
                    }
                    selected_value={data.branch_id}
                    errorMessage={errors.branch_id}
                />

                <div>
                    <Label>Attach Image (Purchase Proof, Item Pic)</Label>
                    <Input
                        type="file"
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="mt-2"
                    />
                    {errors.image && (
                        <p className="text-red-600">{errors.image}</p>
                    )}
                </div>
                <div className="flex justify-end items-center">
                    <SubmitBtn label="Submit" processing={processing} />
                </div>
            </form>
        </Authenticated>
    );
}
