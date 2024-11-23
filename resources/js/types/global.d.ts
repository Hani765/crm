import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { AxiosInstance } from "axios";
import { route as ziggyRoute } from "ziggy-js";
import { PageProps as AppPageProps } from "./";

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    /* eslint-disable no-var */
    var route: typeof ziggyRoute;
}

declare module "@inertiajs/core" {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}
export type BrandType = {
    id: number;
    name: string;
    unique_id: string;
    logo: string;
    status: string;
};
export type BranchType = {
    id: number;
    name: string;
    unique_id: string;
    branch_manager: string;
    branch_contact_no: string;
    branch_address: string;
    image: string;
    status: string;
};
export type ComplaintType = {
    id: number;
    complain_num: string;
    brand_id: string;
    brand_name: string;
    contact_name: string;
    company_complaint_no: any;
    contact_email: any;
    phone_no: string;
    whatsapp_no: any;
    address: string;
    city: string;
    product: string;
    model: string;
    serial_number_ind: any;
    serial_number_oud: any;
    mq_nmb: any;
    sender: string;
    p_date: any;
    complete_date: any;
    description: string;
    amount: any;
    technician: any;
    status: string;
    complaint_type: string;
    provided_services: string;
    extra: any;
    images: string[];
    created_at: string;
    updated_at: string;
};
