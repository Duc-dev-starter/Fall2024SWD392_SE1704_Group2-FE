export class Category {
    id: string;
    name: string;
    description: string;
    parentCategoryId: string | null;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  
    constructor(
      id: string = "",
      name: string = "",
      description: string = "",
      parentCategoryId: string | null = null,
      isDeleted: boolean = false,
      createdAt: string = "",
      updatedAt: string = ""
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.parentCategoryId = parentCategoryId;
      this.isDeleted = isDeleted;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  