import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { UserService } from "../routes/user/service";
import { CategoryService } from "../routes/category/service";
import { AccountService } from "../routes/account/service";

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module "fastify" {
  export interface FastifyInstance {
    userService: UserService;
    accountService: AccountService;
    categoryService: CategoryService;
  }
}

const servicesPlugin: FastifyPluginAsync = fp(async (app, options) => {
  app.decorate("userService", new UserService(app.prisma));
  app.decorate("accountService", new AccountService(app.prisma));
  app.decorate("categoryService", new CategoryService(app.prisma));
});

export default servicesPlugin;
