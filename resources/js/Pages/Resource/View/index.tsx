import { Label } from "@/components/ui/label";
import { ComplaintType } from "@/types/global";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaAngleDown, FaAngleRight, FaLock } from "react-icons/fa";
import { Head } from "@inertiajs/react";
export default function index({ data }: { data: ComplaintType }) {
    const [coustmerShow, setCoustmerShow] = useState(true);
    const [productShow, setProductShow] = useState(true);
    return (
        <div className="space-y-4 px-4 py-6">
            <Head title={data.complain_num}>
                <meta name="description" content={data.description} />
            </Head>
            <h2 className="text-lg font-semibold">
                Complaint ID-{data.complain_num}
            </h2>
            <div className="flex justify-between items-center bg-gray-300 rounded px-1 shadow ">
                <h2 className="text-lg font-semibold">Coustmer Information</h2>
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
                        draggable
                        label="Company complaint no"
                        value={data.company_complaint_no}
                        placeholder="Enter the complaint number provided by company."
                    />
                    <LabelInputContainer
                        type="text"
                        draggable
                        label="Contact Name"
                        value={data.contact_name}
                        placeholder="Enter the contact person's name"
                    />
                    <LabelInputContainer
                        type="email"
                        draggable
                        label="Contact Email"
                        value={data.contact_email}
                        placeholder="Enter a valid email address"
                    />
                    <LabelInputContainer
                        type="text"
                        draggable
                        label="Phone Number"
                        value={data.phone_no}
                        placeholder="Enter a valid phone number"
                    />
                    <LabelInputContainer
                        type="text"
                        draggable
                        label="Whatsapp Number"
                        value={data.whatsapp_no}
                        placeholder="Enter a valid whatsapp number"
                    />
                    <LabelInputContainer
                        type="text"
                        draggable
                        label="City"
                        value={data.city}
                        placeholder="Enter the city name"
                    />
                    <LabelInputContainer
                        type="text"
                        draggable
                        label="Brand"
                        value={data.brand_name}
                        placeholder="Enter the city name"
                    />
                    <LabelInputContainer
                        type="text"
                        draggable
                        label="Sender"
                        value={data.sender}
                        placeholder="Enter the sender's name"
                    />
                    <LabelInputContainer
                        type="text"
                        draggable
                        label="product"
                        value={data.product}
                        placeholder="Enter the product name"
                    />
                    <div className="col-span-3">
                        <Label className="flex gap-2">
                            <FaLock size={12} className="text-gray-400" />
                            Address
                        </Label>
                        <Textarea
                            value={data.address}
                            placeholder="Enter the full address"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center bg-gray-300 rounded px-1 shadow ">
                <h2 className="text-lg font-semibold">Product Information</h2>
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
                    <LabelInputContainer
                        type="text"
                        draggable
                        label="Complaint Type"
                        value={data.complaint_type}
                        placeholder="Enter the model number"
                    />
                    <LabelInputContainer
                        type="text"
                        draggable
                        label="Provided services"
                        value={data.provided_services}
                        placeholder="Enter the model number"
                    />
                    <LabelInputContainer
                        type="text"
                        draggable
                        label="Model"
                        value={data.model}
                        placeholder="Enter the model number"
                    />
                    <LabelInputContainer
                        type="text"
                        draggable
                        label="Serial Number (IND)"
                        value={data.serial_number_ind}
                        placeholder="Enter the indoor serial number"
                    />
                    <LabelInputContainer
                        type="text"
                        draggable
                        label="Serial Number (OUTD)"
                        value={data.serial_number_oud}
                        placeholder="Enter the outdoor serial number"
                    />
                    <LabelInputContainer
                        type="text"
                        draggable
                        label="MQ Number"
                        value={data.mq_nmb}
                        placeholder="Enter the MQ number"
                    />
                    <LabelInputContainer
                        type="number"
                        draggable
                        label="Amount (PKR)"
                        value={data.amount}
                        placeholder="Enter the amount in PKR"
                    />
                    <LabelInputContainer
                        type="date"
                        draggable
                        label="Purchase Date"
                        value={data.p_date}
                        placeholder="Select the purchase date"
                    />
                </div>
                <div className="mt-2">
                    <Label className="flex gap-2">
                        <FaLock size={12} className="text-gray-400" />
                        Complaint Remarks
                    </Label>
                    <Textarea
                        draggable
                        value={data.description}
                        placeholder="Enter complaint Remarks"
                    />
                </div>
            </div>

            <LabelInputContainer
                type="text"
                draggable
                label="Technician"
                value={data.technician}
                placeholder="Enter the technician's name"
            />

            <div>
                <Label className="flex gap-2">
                    <FaLock size={12} className="text-gray-400" />
                    Additional Information
                </Label>
                <Textarea
                    value={data.extra}
                    placeholder="Additional information (if any)"
                />
            </div>
            <div className="flex flex-wrap gap-4">
                {data.images.map((image) => (
                    <a href={image} target="_blank">
                        <img
                            src={image}
                            alt={image}
                            className="h-[200px] w-[200px]"
                        />
                    </a>
                ))}
            </div>
        </div>
    );
}
