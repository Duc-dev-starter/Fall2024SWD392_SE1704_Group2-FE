export class Blog {
  _id: string = "";
  name: string = "";
  user_id: string = "";
  category_id: string = "";
  description: string = "";
  image_url: string = "";
  content: string = "";
  is_deleted: boolean = false;
  created_at: Date = new Date();
  updated_at: Date = new Date();
  user_name: string = "";
  category_name: string = "";
  image_user_name: string = "";
  reading_time: number = 0;
  tags: string[] = [];
  constructor(
      _id: string,
      name: string,
      user_id: string,
      category_id: string,
      description: string,
      content: string,
      image_url: string,
      is_deleted: boolean,
      created_at: Date,
      updated_at: Date,
      user_name: string,
      category_name: string,
      image_user_name: string,
      reading_time: number,
      tags: string[],
  ) {
      this._id = _id;
      this.name = name;
      this.user_id = user_id;
      this.user_name = user_name;
      this.category_id = category_id;
      this.description = description;
      this.content = content
      this.image_url = image_url;
      this.created_at = created_at;
      this.updated_at = updated_at;
      this.user_name = user_name;
      this.category_name = category_name;
      this.is_deleted = is_deleted;
      this.image_user_name = image_user_name;
      this.reading_time = reading_time;
      this.tags = tags
  }
}
