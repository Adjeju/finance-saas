import { FastifyPluginAsync } from "fastify";
import summaryRouter from "./routes";
import { SummaryService } from "./service";

const category: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(summaryRouter);

  fastify.decorate("summaryService", new SummaryService(fastify.prisma));
};

export default category;

declare module "fastify" {
  export interface FastifyInstance {
    summaryService: SummaryService;
  }
}
