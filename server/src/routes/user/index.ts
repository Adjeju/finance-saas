import { FastifyPluginAsync } from "fastify";
import { userRoutes } from "./routes";

const router: FastifyPluginAsync = async (fastify, opts) => {
  fastify.register(userRoutes);
};

export default router;
