export class Category {
  id: string;
  name: string;
  description: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;

  constructor(
    id: string = "",
    name: string = "",
    description: string = "",
    isDeleted: boolean = false,
    createdDate: string = "",
    updatedDate: string = ""
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isDeleted = isDeleted;
    this.createdAt = createdDate;
    this.updatedAt = updatedDate;
  }
}
