import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { UserService } from "../routes/user/service";

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module "fastify" {
  export interface FastifyInstance {
    userService: UserService;
  }
}

const servicesPlugin: FastifyPluginAsync = fp(async (server, options) => {
  server.decorate("userService", new UserService(server.prisma));
});

export default servicesPlugin;
