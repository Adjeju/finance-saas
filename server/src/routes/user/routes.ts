import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createUserBody } from "./schemas";

export const userRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/",
    {
      schema: {
        body: createUserBody,
      },
    },
    async function (request, reply) {
      const { email, firstName, lastName, password } = request.body;

      const isExists = Boolean(await app.userService.get({ email }));

      if (isExists) {
        return reply.status(409).send({ message: "User in db" });
      }

      const user = await app.userService.create({
        email,
        firstName,
        lastName,
        password,
      });

      return user;
    }
  );
};
