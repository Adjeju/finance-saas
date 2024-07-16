import { FastifyPluginAsync } from "fastify";
import categoryRouter from "./routes";
import { AccountService } from "./service";

const category: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(categoryRouter);

  fastify.decorate("accountService", new AccountService(fastify.prisma));
};

export default category;

declare module "fastify" {
  export interface FastifyInstance {
    accountService: AccountService;
  }
}
