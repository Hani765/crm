import { Label } from "@/components/ui/label";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import SearchSelect from "@/components/ui/search-select";
import { Head, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { statusOptions } from "@/lib/utils";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

export default function ComplaintForm({
    brands_data: brandData,
    data: complaintData,
}: {
    brands_data: any;
    data: any;
}) {
    const [coustmerShow, setCoustmerShow] = useState(false);
    const [productShow, setProductShow] = useState(false);
    // Update the form initialization with `File[]` type for `images`
    const { post, data, setData, errors, processing } = useForm({
        brand_id: complaintData.brand_id,
        contact_name: complaintData.contact_name,
        company_complaint_no: "",
        contact_email: complaintData.contact_email,
        phone_no: complaintData.phone_no,
        whatsapp_no: complaintData.whatsapp_no,
        sender: complaintData.sender,
        address: complaintData.address,
        city: complaintData.city,
        product: complaintData.product,
        model: complaintData.model,
        serial_number_ind: complaintData.serial_number_ind,
        serial_number_oud: complaintData.serial_number_oud,
        mq_nmb: complaintData.mq_nmb,
        p_date: complaintData.p_date,
        description: complaintData.description,
        amount: complaintData.amount,
        technician: complaintData.technician,
        status: "open",
        complaint_type: complaintData.complaint_type,
        provided_services: complaintData.provided_services,
        extra: complaintData.extra,
        images: [] as File[],
    });

    // Adjust `handleImageUpload`
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files) as File[];
            setSelectedImages(filesArray);
            setData("images", filesArray);
        }
    };

    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/complaint", {
            onSuccess: () => {
                toast.success("Complaint has been created!");
            },
            onError: () => {
                toast.error("Something went wrong while submitting complaint!");
            },
        });
    };

    return (
        <Authenticated>
            <Head title="Submit a Complaint" />
            <form onSubmit={handleSubmit} className="space-y-4 px-4 py-6">
                <h2 className="text-lg font-semibold">
                    Complaint ID-{complaintData.complain_num}
                </h2>
                <div className="flex justify-between items-center bg-gray-100 rounded px-1 shadow ">
                    <h2 className="text-lg font-semibold">
                        Coustmer Information
                    </h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCoustmerShow(!coustmerShow)}
                    >
                        {coustmerShow ? <FaAngleDown /> : <FaAngleRight />}
                    </Button>
                </div>
                <div className={`${coustmerShow ? "block" : "hidden"}`}>
                    <div className="md:grid grid-cols-3 gap-4">
                        <LabelInputContainer
                            type="text"
                            label="Company complaint no"
                            value={data.company_complaint_no}
                            onChange={(e) =>
                                setData("company_complaint_no", e.target.value)
                            }
                            errorMessage={errors.contact_name}
                            placeholder="Enter the complaint number provided by company."
                        />
                        <LabelInputContainer
                            type="text"
                            label="Contact Name"
                            required
                            value={data.contact_name}
                            onChange={(e) =>
                                setData("contact_name", e.target.value)
                            }
                            errorMessage={errors.contact_name}
                            placeholder="Enter the contact person's name"
                        />
                        <LabelInputContainer
                            type="email"
                            label="Contact Email"
                            value={data.contact_email}
                            onChange={(e) =>
                                setData("contact_email", e.target.value)
                            }
                            errorMessage={errors.contact_email}
                            placeholder="Enter a valid email address"
                        />
                        <LabelInputContainer
                            type="text"
                            label="Phone Number"
                            required
                            value={data.phone_no}
                            onChange={(e) =>
                                setData("phone_no", e.target.value)
                            }
                            errorMessage={errors.phone_no}
                            placeholder="Enter a valid phone number"
                        />
                        <LabelInputContainer
                            type="text"
                            label="Whatsapp Number"
                            value={data.whatsapp_no}
                            onChange={(e) =>
                                setData("whatsapp_no", e.target.value)
                            }
                            errorMessage={errors.whatsapp_no}
                            placeholder="Enter a valid whatsapp number"
                        />
                        <LabelInputContainer
                            type="text"
                            label="City"
                            required
                            value={data.city}
                            onChange={(e) => setData("city", e.target.value)}
                            errorMessage={errors.city}
                            placeholder="Enter the city name"
                        />
                        <SearchSelect
                            label="Select Brand"
                            items={brandData}
                            onSelect={(unique_id: string) =>
                                setData({ ...data, brand_id: unique_id })
                            }
                            selected_value={data.brand_id}
                            errorMessage={errors.brand_id}
                            required
                        />{" "}
                        <LabelInputContainer
                            type="text"
                            label="Sender"
                            required
                            value={data.sender}
                            onChange={(e) => setData("sender", e.target.value)}
                            errorMessage={errors.sender}
                            placeholder="Enter the sender's name"
                        />
                        <LabelInputContainer
                            type="text"
                            label="product"
                            required
                            value={data.product}
                            onChange={(e) => setData("product", e.target.value)}
                            errorMessage={errors.product}
                            placeholder="Enter the product name"
                        />
                        <div className="col-span-3">
                            <Label>
                                Address <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                required
                                placeholder="Enter the full address"
                            />
                            <p className="text-sm text-gray-500">
                                Provide a detailed address of the applicant.
                            </p>
                            {errors.address && (
                                <p className="text-red-600">{errors.address}</p>
                            )}
                        </div>
                    </div>
                    <hr className="my-4 border-2 border-gray-500 rounded" />
                </div>

                <div className="flex justify-between items-center bg-gray-100 rounded px-1 shadow ">
                    <h2 className="text-lg font-semibold">
                        Product Information
                    </h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setProductShow(!productShow)}
                    >
                        {productShow ? <FaAngleDown /> : <FaAngleRight />}
                    </Button>
                </div>
                <div className={`${productShow ? "block" : "hidden"}`}>
                    <div className="md:grid grid-cols-3 gap-4">
                        <div className="">
                            <Label>Complaint Type</Label>
                            <Select
                                onValueChange={(value) =>
                                    setData("complaint_type", value)
                                }
                                defaultValue={data.complaint_type}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select complaint type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="warrenty">
                                        Warrenty
                                    </SelectItem>
                                    <SelectItem value="revenew">
                                        Revenew
                                    </SelectItem>
                                    <SelectItem value="warrenty-revenew">
                                        Warenty+Revenew
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && (
                                <p className="text-red-600">
                                    {errors.complaint_type}
                                </p>
                            )}
                        </div>
                        <div className="">
                            <Label>Provided services</Label>
                            <Select
                                onValueChange={(value) =>
                                    setData("provided_services", value)
                                }
                                defaultValue={data.provided_services}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select complaint type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="warrenty">
                                        Free Installation
                                    </SelectItem>
                                    <SelectItem value="revenew">
                                        Paid Installation
                                    </SelectItem>
                                    <SelectItem value="revenew">
                                        Complaint
                                    </SelectItem>
                                    <SelectItem value="warrenty-revenew">
                                        Free + Paid Installation
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && (
                                <p className="text-red-600">
                                    {errors.complaint_type}
                                </p>
                            )}
                        </div>

                        <LabelInputContainer
                            type="text"
                            label="Model"
                            value={data.model}
                            required
                            onChange={(e) => setData("model", e.target.value)}
                            errorMessage={errors.model}
                            placeholder="Enter the model number"
                        />
                        <LabelInputContainer
                            type="text"
                            label="Serial Number (IND)"
                            value={data.serial_number_ind}
                            onChange={(e) =>
                                setData("serial_number_ind", e.target.value)
                            }
                            errorMessage={errors.serial_number_ind}
                            placeholder="Enter the indoor serial number"
                        />
                        <LabelInputContainer
                            type="text"
                            label="Serial Number (OUTD)"
                            value={data.serial_number_oud}
                            onChange={(e) =>
                                setData("serial_number_oud", e.target.value)
                            }
                            errorMessage={errors.serial_number_oud}
                            placeholder="Enter the outdoor serial number"
                        />
                        <LabelInputContainer
                            type="text"
                            label="MQ Number"
                            value={data.mq_nmb}
                            onChange={(e) => setData("mq_nmb", e.target.value)}
                            errorMessage={errors.mq_nmb}
                            placeholder="Enter the MQ number"
                        />
                        <LabelInputContainer
                            type="number"
                            label="Amount (PKR)"
                            value={data.amount}
                            onChange={(e) => setData("amount", e.target.value)}
                            errorMessage={errors.amount}
                            placeholder="Enter the amount in PKR"
                        />
                        <LabelInputContainer
                            type="date"
                            label="Purchase Date"
                            value={data.p_date}
                            onChange={(e) => setData("p_date", e.target.value)}
                            errorMessage={errors.p_date}
                            placeholder="Select the purchase date"
                        />
                    </div>
                    <div className="mt-2">
                        <Label>Complaint Remarks</Label>
                        <Textarea
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            required
                            placeholder="Enter complaint Remarks"
                        />
                        <p className="text-sm text-gray-500">
                            Provide a detailed description of the issue
                        </p>
                        {errors.description && (
                            <p className="text-red-600">{errors.description}</p>
                        )}
                    </div>
                    <hr className="my-4 border-2 border-gray-500 rounded" />
                </div>

                <LabelInputContainer
                    type="text"
                    label="Technician"
                    value={data.technician}
                    onChange={(e) => setData("technician", e.target.value)}
                    errorMessage={errors.technician}
                    placeholder="Enter the technician's name"
                />

                <div>
                    <Textarea
                        value={data.extra}
                        onChange={(e) => setData("extra", e.target.value)}
                        placeholder="Additional information (if any)"
                    />
                    <p className="text-sm text-gray-500">
                        Provide any extra information
                    </p>
                    {errors.extra && (
                        <p className="text-red-600">{errors.extra}</p>
                    )}
                </div>
                <div>
                    <Label>Attach Images (Warranty Card, Purchase Proof)</Label>
                    <Input
                        type="file"
                        multiple
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="mt-2"
                    />
                    {errors.images && (
                        <p className="text-red-600">{errors.images}</p>
                    )}
                </div>
                <div className="flex justify-end gap-2">
                    <div className="max-w-[300px]">
                        <Select
                            onValueChange={(value) => setData("status", value)}
                            defaultValue={data.status}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map((option) => (
                                    <SelectItem
                                        value={option.value}
                                        key={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.status && (
                            <p className="text-red-600">{errors.status}</p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="bg-blue-600 text-white"
                        disabled={processing}
                    >
                        {processing ? "Submitting..." : "Submit Complaint"}
                    </Button>
                </div>
            </form>
        </Authenticated>
    );
}
