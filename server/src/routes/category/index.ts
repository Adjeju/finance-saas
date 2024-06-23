import { FastifyPluginAsync } from "fastify";
import categoryRouter from "./routes";
import { CategoryService } from "./service";

const category: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(categoryRouter);

  fastify.decorate("categoryService", new CategoryService(fastify.prisma));
};

export default category;

declare module "fastify" {
  export interface FastifyInstance {
    categoryService: CategoryService;
  }
}
