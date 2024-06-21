import { FastifyPluginAsync } from "fastify";
import { userRoutes } from "./routes";
import { UserService } from "./service";

const router: FastifyPluginAsync = async (fastify, opts) => {
  fastify.register(userRoutes);

  fastify.decorate("userService", new UserService(fastify.prisma));
};

declare module "fastify" {
  export interface FastifyInstance {
    userService: UserService;
  }
}

export default router;
