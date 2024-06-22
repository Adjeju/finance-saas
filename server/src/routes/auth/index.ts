import { FastifyPluginAsync } from "fastify";
import { authRoutes } from "./routes";

const router: FastifyPluginAsync = async (fastify, opts) => {
  fastify.register(authRoutes);
};

export default router;
