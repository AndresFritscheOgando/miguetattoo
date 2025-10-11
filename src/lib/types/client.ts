export interface Client {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    address: string;
    image_url?: string;
    created_at: string | Date;
    updated_at?: string | Date;
}