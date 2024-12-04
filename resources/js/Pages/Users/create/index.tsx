import { Label } from "@/components/ui/label";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { Textarea } from "@/components/ui/textarea";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";

export default function index() {
    return (
        <Authenticated>
            <h3 className="text-lg font-bold">1: User Info</h3>
            <div className="grid grid-cols-3 gap-3 bg-gray-50 p-2 rounded shadow-sm border">
                <LabelInputContainer
                    type="text"
                    placeholder="eg: John"
                    label="First Name"
                    id="first_name"
                    required
                />
                <LabelInputContainer
                    type="text"
                    placeholder="eg: Doe"
                    label="Last Name"
                    id="last_name"
                    required
                />
                <LabelInputContainer
                    type="email"
                    placeholder="example@gmail.com"
                    label="Email"
                    id="email"
                />
                <LabelInputContainer
                    type="number"
                    placeholder="eg: 11122233311"
                    label="Phone"
                    id="phone"
                    required
                />
                <LabelInputContainer
                    type="number"
                    placeholder="eg: 11122233311"
                    label="Second Phone"
                    id="second_phone"
                />
                <LabelInputContainer
                    type="date"
                    label="Date of Birth"
                    id="date_of_birth"
                    required
                />
                <div className="col-span-3">
                    <Label>Address</Label>
                    <Textarea placeholder="write your address info" />
                </div>
                <hr className="col-span-3" />
                <LabelInputContainer
                    type="file"
                    label="Profile Image"
                    required
                />
                <LabelInputContainer
                    type="file"
                    label="Cnic Front Image"
                    required
                />
                <LabelInputContainer
                    type="file"
                    label="Cnic Backside Image"
                    required
                />
            </div>

            <h3 className="text-lg font-bold">2: Additional Info</h3>
            <div className="grid grid-cols-3 gap-3 bg-gray-50 p-2 rounded shadow-sm border"></div>
        </Authenticated>
    );
}
