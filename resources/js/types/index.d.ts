export interface User {
    id: number;
    unique_id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone: string;
    skype: string;
    whats_app: string;
    age: string;
    gender: string;
    manager_id: string;
    branch_id: string;
    monthly_salary: string;
    reference_name: string;
    dob: string;
    country: string;
    province: string;
    city: string;
    details: string;
    language: string;
    time_zone: string;
    role: string;
    profile_image: string;
    email_verified_at: string;
    isVerified: string;
    status: string;
    notification: string;
    rate: string;
    domain_id: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
interface FetchedDataTypes {
    data: BrandType[];
    pagination: any;
}

interface MetaType {
    id: number;
    name: string;
    url: String;
    title: string;
    description: string;
    keywords: string;
}
interface Routes {
    name: string;
    url: string;
}
export interface ServiceType {
    id: number;
    name: string;
    url: string;
    title: string;
    description: string;
    image: string;
    created_at: any;
    updated_at: any;
}
