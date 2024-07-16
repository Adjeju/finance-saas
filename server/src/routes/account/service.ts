import { PrismaClient } from "@prisma/client";
import { CreateAccountBodyValues } from "./schemas";

export class AccountService {
  constructor(private db: PrismaClient) {}

  async get(id: number) {
    return this.db.account.findFirst({ where: { id } });
  }

  async create(data: CreateAccountBodyValues & { userId: number }) {
    return this.db.account.create({
      data,
    });
  }

  async update({ id, name }: { name: string; id: number }) {
    return this.db.account.update({
      where: { id },
      data: {
        name,
      },
    });
  }

  async deleteMany(ids: number[]) {
    return this.db.account.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async getList({
    userId,
    search,
    skip,
    take,
  }: {
    userId?: number;
    search?: string;
    take: number;
    skip: number;
  }) {
    return this.db.account.findMany({
      skip,
      take,
      where: {
        userId,
        name: {
          contains: search,
        },
      },
    });
  }
}
