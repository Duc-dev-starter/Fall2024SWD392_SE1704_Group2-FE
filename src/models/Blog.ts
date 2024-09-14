export default interface Blog {
    _id: string;
    name: string;
    user_id: string;
    category_id: string;
    description: string;
    image_url: string;
    content: string;
    is_deleted: boolean;
    created_at: Date;
    updated_at: Date;
    user_name: string;
    category_name: string;
  }
  