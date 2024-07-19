import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import {
  createTransactionBodySchema,
  deleteTransactionBodySchema,
  getTransactionsQueryStringSchema,
  transactionParamsSchema,
  updateTransactionBodySchema,
} from "./schemas";
import { getSkip, getTotalPages } from "../../utils/pagination";
import { Prisma } from "@prisma/client";

const accountRouter: FastifyPluginAsyncZod = async (
  app,
  opts
): Promise<void> => {
  app.get(
    "/",
    {
      schema: { querystring: getTransactionsQueryStringSchema },
      onRequest: [app.validateJWT],
    },
    async function (request, reply) {
      try {
        const userId = request.userId;

        const page = +request.query.page;
        const perPage = +request.query.perPage;
        const search = request.query.search;

        const accountId = request.query.accountId
          ? +request.query.accountId
          : undefined;

        const categoryId = request.query.categoryId
          ? +request.query.categoryId
          : undefined;

        const from = request.query.from;
        const to = request.query.to;

        const skip = getSkip({ page, perPage });

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

        const totalCount = await app.prisma.transaction.count({
          where,
        });

        const totalPages = getTotalPages({ perPage, totalCount });

        const data = await app.transactionService.getList({
          userId,
          search,
          take: perPage,
          skip,
          accountId,
          categoryId,
          from,
          to,
        });

        return { data, page, totalCount, totalPages };
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );

  app.get(
    "/:id",
    {
      schema: {
        params: transactionParamsSchema,
      },
      onRequest: [app.validateJWT],
    },
    async function (request, reply) {
      try {
        const { id } = request.params;

        const transaction = await app.transactionService.get(+id);

        if (!transaction) {
          return reply.status(404).send({ message: "Not found" });
        }

        return transaction;
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );

  app.post(
    "/",
    {
      schema: { body: createTransactionBodySchema },
      onRequest: [app.validateJWT],
    },
    async function (request, reply) {
      try {
        const userId = request.userId;
        const body = request.body;

        const categoryId = body.categoryId;

        if (categoryId) {
          const category = await app.categoryService.get(+categoryId);
          if (!category) {
            return reply.status(404).send({ message: "Not found" });
          }
        }

        const accountId = body.accountId;

        if (accountId) {
          const account = await app.accountService.get(+accountId);
          if (!account) {
            return reply.status(404).send({ message: "Not found" });
          }
        }

        return await app.transactionService.create({
          ...body,
          userId,
        });
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );

  app.delete(
    "/",
    {
      schema: { body: deleteTransactionBodySchema },
      onRequest: [app.validateJWT],
    },
    async function (request, reply) {
      try {
        const { ids } = request.body;

        for (const id of ids) {
          const isExists = Boolean(await app.transactionService.get(+id));

          if (!isExists) {
            return reply
              .status(404)
              .send({ message: `Transaction with id:${id} not found` });
          }
        }

        await app.transactionService.deleteMany(ids);

        return { message: "deleted" };
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );

  app.put(
    "/:id",
    {
      schema: {
        params: transactionParamsSchema,
        body: updateTransactionBodySchema,
      },
      onRequest: [app.validateJWT],
    },
    async function (request, reply) {
      try {
        const { id } = request.params;
        const body = request.body;

        const isExist = await app.transactionService.get(+id);

        if (!isExist) {
          return reply.status(404).send({ message: "Not found" });
        }

        const transaction = await app.transactionService.update({
          id: +id,
          ...body,
        });

        return transaction;
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );
};

export default accountRouter;
