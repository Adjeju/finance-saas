import { Prisma, PrismaClient } from "@prisma/client";
import {
  CreateTransactionBodyValues,
  UpdateTransactionBodyValues,
} from "./schemas";

export class TransactionService {
  constructor(private db: PrismaClient) {}

  async get(id: number) {
    return this.db.transaction.findFirst({ where: { id } });
  }

  async create(data: CreateTransactionBodyValues & { userId: number }) {
    return this.db.transaction.create({
      data,
    });
  }

  async update({ id, ...data }: UpdateTransactionBodyValues & { id: number }) {
    return this.db.transaction.update({ where: { id }, data });
  }

  async deleteMany(ids: number[]) {
    return this.db.transaction.deleteMany({
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
    accountId,
    categoryId,
    from,
    to,
  }: {
    userId?: number;
    search?: string;
    take: number;
    skip: number;
    accountId?: number;
    categoryId?: number;
    from?: string;
    to?: string;
  }) {
    const where: Prisma.TransactionWhereInput = {
      userId,
      accountId,
      payee: search,
      categoryId,
    };

    if (from && to) {
      where.AND = [
        {
          date: {
            gt: from,
          },
        },
        {
          date: {
            lt: to,
          },
        },
      ];
    }

    return this.db.transaction.findMany({
      where,
      skip,
      take,
    });
  }
}
