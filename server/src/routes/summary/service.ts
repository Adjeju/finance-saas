import { Prisma, PrismaClient } from "@prisma/client";
import { GetSummaryParams } from "./types";

export class SummaryService {
  constructor(private db: PrismaClient) {}

  async get({ userId, from, to, accountId }: GetSummaryParams) {
    const where: Prisma.TransactionWhereInput = {
      userId,
      accountId,
      date: {
        gt: from,
        lt: to,
      },
    };

    const {
      _sum: { amount: earnings },
    } = await this.db.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        ...where,
        amount: {
          gte: 0,
        },
      },
    });

    const {
      _sum: { amount: spendings },
    } = await this.db.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        ...where,
        amount: {
          lt: 0,
        },
      },
    });

    const {
      _sum: { amount: remainings },
    } = await this.db.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where,
    });

    return {
      remainings: remainings ?? 0,
      earnings: earnings ?? 0,
      spendings: spendings ?? 0,
    };
  }

  async getCategories({ userId, from, to, accountId }: GetSummaryParams) {
    const where: Prisma.TransactionWhereInput = {
      userId,
      accountId,
      date: {
        gt: from,
        lt: to,
      },
      amount: {
        gt: 0,
      },
      categoryId: {
        not: null,
      },
    };

    const result = await this.db.transaction.groupBy({
      by: ["categoryId"],
      where,
      _sum: { amount: true },
    });

    const data = [];

    for (const { categoryId, _sum } of result) {
      const category = await this.db.category.findFirst({
        where: {
          id: categoryId!,
        },
        select: {
          name: true,
          id: true,
        },
      });

      data.push({
        id: category!.id,
        name: category!.name,
        amount: _sum.amount || 0,
      });
    }

    return data;
  }

  async getTransactions({ userId, from, to, accountId }: GetSummaryParams) {
    const where: Prisma.TransactionWhereInput = {
      userId,
      accountId,
      date: {
        gt: from,
        lt: to,
      },
    };

    const earnings = await this.db.transaction.groupBy({
      by: ["date"],
      where: {
        ...where,
        amount: {
          gt: 0,
        },
      },
      _sum: { amount: true },
    });

    const spending = await this.db.transaction.groupBy({
      by: ["date"],
      where: {
        ...where,
        amount: {
          lt: 0,
        },
      },
      _sum: { amount: true },
    });

    const result = [];

    for (const transaction of earnings) {
      result.push({
        date: transaction.date,
        earnings: transaction._sum.amount || 0,
        spending: 0,
      });
    }

    for (const transaction of spending) {
      const idx: number = result.findIndex(
        ({ date }) => transaction.date.getTime() === date.getTime()
      );

      if (idx !== -1) {
        result[idx] = {
          ...result[idx],
          spending: transaction._sum.amount
            ? Math.abs(transaction._sum.amount)
            : 0,
        };
      } else {
        result.push({
          date: transaction.date,
          earnings: 0,
          spending: transaction._sum.amount
            ? Math.abs(transaction._sum.amount)
            : 0,
        });
      }
    }

    return result;
  }
}
