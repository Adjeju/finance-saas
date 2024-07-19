import { FastifyPluginAsync } from "fastify";
import categoryRouter from "./routes";
import { TransactionService } from "./service";

const category: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(categoryRouter);

  fastify.decorate(
    "transactionService",
    new TransactionService(fastify.prisma)
  );
};

export default category;

declare module "fastify" {
  export interface FastifyInstance {
    transactionService: TransactionService;
  }
}
