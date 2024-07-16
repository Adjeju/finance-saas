import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import {
  accountParamsSchema,
  createAccountBodySchema,
  deleteAccountsBodySchema,
  getAccountsQueryStringSchema,
  updateAccountBodySchema,
} from "./schemas";
import { getSkip, getTotalPages } from "../../utils/pagination";

const accountRouter: FastifyPluginAsyncZod = async (
  app,
  opts
): Promise<void> => {
  app.get(
    "/",
    {
      schema: {
        querystring: getAccountsQueryStringSchema,
      },
      onRequest: [app.validateJWT],
    },
    async function (request, reply) {
      try {
        const page = +request.query.page;
        const perPage = +request.query.perPage;
        const search = request.query.search;
        const userId = request.userId;

        const skip = getSkip({ page, perPage });

        const totalCount = await app.prisma.account.count({
          where: { name: { contains: search }, userId },
        });

        const totalPages = getTotalPages({ perPage, totalCount });

        const data = await app.accountService.getList({
          userId,
          search,
          take: perPage,
          skip,
        });

        return { data, page, totalCount, totalPages };
      } catch (error) {
        reply.status(400).send(error);
      }
    }
  );

  app.get(
    "/:id",
    {
      schema: {
        params: accountParamsSchema,
      },
      onRequest: [app.validateJWT],
    },
    async function (request, reply) {
      try {
        const { id } = request.params;

        const account = await app.accountService.get(+id);

        if (!account) {
          return reply.status(404).send({ message: "Not found" });
        }

        return account;
      } catch (error) {
        reply.status(400).send(error);
      }
    }
  );

  app.post(
    "/",
    {
      schema: {
        body: createAccountBodySchema,
      },
      onRequest: [app.validateJWT],
    },
    async function (request, reply) {
      try {
        const userId = request.userId;
        const { name } = request.body;

        return app.accountService.create({ name, userId });
      } catch (error) {
        reply.status(400).send(error);
      }
    }
  );

  app.delete(
    "/",
    {
      schema: {
        body: deleteAccountsBodySchema,
      },
      onRequest: [app.validateJWT],
    },
    async function (request, reply) {
      try {
        const { ids } = request.body;

        for (const id of ids) {
          const account = await app.accountService.get(id);
          if (!account) {
            return reply.status(404).send({ message: "Not found" });
          }
        }

        await app.accountService.deleteMany(ids);

        return { message: "Deleted" };
      } catch (error) {
        reply.status(400).send(error);
      }
    }
  );

  app.put(
    "/:id",
    {
      schema: {
        params: accountParamsSchema,
        body: updateAccountBodySchema,
      },
      onRequest: [app.validateJWT],
    },
    async function (request, reply) {
      try {
        const { id } = request.params;
        const body = request.body;

        const isExists = await app.accountService.get(+id);

        if (!isExists) {
          return reply.status(404).send({ message: "Not found" });
        }

        const account = await app.accountService.update({ id: +id, ...body });

        return account;
      } catch (error) {
        reply.status(400).send(error);
      }
    }
  );
};

export default accountRouter;
