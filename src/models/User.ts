export type UserRole = "manager" | "staff" | "member" | "referee";

export class User {
  _id: string;
  google_id?: string;
  name: string;
  email: string; // unique
  password?: string; // required if google_id is null or empty
  role: UserRole;
  status: boolean; // default is true, set false if want disabled user status
  phone_number?: string;
  description?: string; // required if user role is instructor
  avatar: { file?: { originFileObj?: File } } | string;
  dob?: Date; // date of birth
  created_at?: Date;
  updated_at?: Date;
  is_deleted?: boolean; // flag remove logic when user is deleted
  balance: number;
  balance_total: number;

  constructor(
    _id: string = "",
    name: string = "",
    email: string = "",
    role: UserRole = "member",
    status: boolean = true,
    google_id?: string,
    password?: string,
    phone_number?: string,
    description?: string,
    avatar?: { file?: { originFileObj?: File } } | string,
    dob?: Date,
    created_at?: Date,
    updated_at?: Date,
    is_deleted?: boolean,
    balance: number = 0,
    balance_total : number = 0,
  ) {
    this._id = _id;
    this.google_id = google_id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.status = status;
    this.phone_number = phone_number;
    this.description = description;
    this.avatar = avatar || "";
    this.dob = dob;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.is_deleted = is_deleted;
    this.balance = balance;
    this.balance_total = balance_total;
  }
}