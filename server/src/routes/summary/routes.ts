import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getSummaryQueryStringSchema } from "./schemas";

const summaryRouter: FastifyPluginAsyncZod = async (
  app,
  opts
): Promise<void> => {
  app.get(
    "/",
    {
      schema: { querystring: getSummaryQueryStringSchema },
      onRequest: [app.validateJWT],
    },
    async function (request, reply) {
      try {
        const userId = request.userId;
        const { from, to, accountId } = request.query;

        const data = await this.summaryService.get({
          userId,
          from,
          to,
          accountId: +accountId,
        });

        return data;
      } catch (error) {
        reply.status(400).send(error);
      }
    }
  );

  app.get(
    "/categories",
    {
      schema: { querystring: getSummaryQueryStringSchema },
      onRequest: [app.validateJWT],
    },
    async function (request, reply) {
      try {
        const userId = request.userId;
        const { from, to, accountId } = request.query;

        const data = await this.summaryService.getCategories({
          userId,
          from,
          to,
          accountId: +accountId,
        });

        return data;
      } catch (error) {
        reply.status(400).send(error);
      }
    }
  );

  app.get(
    "/transactions",
    {
      schema: { querystring: getSummaryQueryStringSchema },
      onRequest: [app.validateJWT],
    },
    async function (request, reply) {
      try {
        const userId = request.userId;
        const { from, to, accountId } = request.query;

        const data = await this.summaryService.getTransactions({
          userId,
          from,
          to,
          accountId: +accountId,
        });

        return data;
      } catch (error) {
        reply.status(400).send(error);
      }
    }
  );
};

export default summaryRouter;
