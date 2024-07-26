import { getSkip, getTotalPages } from "../../utils/pagination";
import {
  createCategoryBodySchema,
  updateCategoryBodySchema,
  categoryParamsSchema,
  getCategoriesQueryStringSchema,
  deleteCategoriesBodySchema,
} from "./schemas";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

const categoryRouter: FastifyPluginAsyncZod = async (
  app,
  opts
): Promise<void> => {
  app.get(
    "/",
    {
      schema: {
        querystring: getCategoriesQueryStringSchema,
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

        const totalCount = await app.prisma.category.count({
          where: { name: { contains: search }, userId },
        });

        const totalPages = getTotalPages({ perPage, totalCount });

        const data = await app.categoryService.getList({
          userId,
          search,
          take: perPage,
          skip,
        });

        return { data, page, totalCount, totalPages };
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );

  app.get(
    "/:id",
    {
      schema: { params: categoryParamsSchema },
      onRequest: [app.validateJWT],
    },
    async function (request, reply) {
      try {
        const id = request.params.id;

        const category = await app.categoryService.get(+id);

        if (!category) {
          return reply.status(404).send({ message: "Not found" });
        }

        return category;
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );

  app.post(
    "/",
    {
      schema: { body: createCategoryBodySchema },
      onRequest: [app.validateJWT],
    },
    async function (request, reply) {
      try {
        const { name } = request.body;
        const userId = request.userId;

        return app.categoryService.create({ name, userId });
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );

  app.delete(
    "/",
    {
      schema: { body: deleteCategoriesBodySchema },
      onRequest: [app.validateJWT],
    },
    async function (request, reply) {
      try {
        const { ids } = request.body;

        for (const id of ids) {
          const isExists = Boolean(await app.categoryService.get(+id));

          if (!isExists) {
            return reply
              .status(404)
              .send({ message: `Category with id:${id} not found` });
          }
        }

        await app.categoryService.deleteMany(ids);

        return { message: "deleted" };
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );

  app.put(
    "/:id",
    {
      schema: {
        body: updateCategoryBodySchema,
        params: categoryParamsSchema,
      },
      onRequest: [app.validateJWT],
    },
    async function (request, reply) {
      try {
        const id = request.params.id;
        const { name } = request.body;

        const isExists = Boolean(await app.categoryService.get(+id));

        if (!isExists) {
          return reply.status(404).send({ message: "Not Found" });
        }

        const category = await app.categoryService.update({ id: +id, name });

        return category;
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );
};

export default categoryRouter;
