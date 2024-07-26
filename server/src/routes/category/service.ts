import { PrismaClient } from "@prisma/client";
import { CreateCategoryBodyValues } from "./schemas";
import { GetCategoryListData, UpdateCategoryData } from "./types";

export class CategoryService {
  constructor(private db: PrismaClient) {}

  async get(id: number) {
    return this.db.category.findFirst({ where: { id } });
  }
  async create(data: CreateCategoryBodyValues & { userId: number }) {
    return this.db.category.create({
      data,
    });
  }

  async update({ id, name }: UpdateCategoryData) {
    return this.db.category.update({
      where: { id },
      data: { name },
    });
  }

  async deleteMany(ids: number[]) {
    return this.db.category.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async getList({ userId, search, skip, take }: GetCategoryListData) {
    return this.db.category.findMany({
      where: { userId, name: { contains: search } },
      skip,
      take,
    });
  }
}
