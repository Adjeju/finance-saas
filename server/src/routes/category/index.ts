import { FastifyPluginAsync } from "fastify";
import categoryRouter from "./routes";

const category: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(categoryRouter);
};

export default category;
