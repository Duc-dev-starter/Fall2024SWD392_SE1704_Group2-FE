export type UserRole = "manager" | "staff" | "customer" | "referee";

export default interface User {
    _id: string;
    google_id?: string;
    name: string;
    email: string; // unique
    password?: string;
    role: UserRole;
    status: boolean;
    phone_number?: string;
    description?: string; 
    avatar: string | { file?: { originFileObj?: File } };
    video?: string; 
    dob?: Date; 
    created_at?: Date;
    updated_at?: Date;
    is_deleted?: boolean;
    is_verified?: boolean; 
    balance: number;
    balance_total: number;
  }