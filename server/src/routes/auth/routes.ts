import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { signInBodySchema, signUpBodySchema } from "./schemas";
import bcrypt from "bcrypt";
import { routes } from "./constants";
import { exclude } from "../../utils";

import jwt from "jsonwebtoken";
import env from "../../env";

export const authRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    routes.signUp,
    {
      schema: {
        body: signUpBodySchema,
      },
    },
    async function (request, reply) {
      const { email, firstName, lastName, password } = request.body;

      const isExists = Boolean(await app.userService.get({ email }));

      if (isExists) {
        return reply.status(400).send({ message: "User in db" });
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const user = await app.userService.create({
        email,
        firstName,
        lastName,
        password: hashPassword,
      });

      return { message: "User has been created!" };
    }
  );

  app.post(
    routes.signIn,
    {
      schema: {
        body: signInBodySchema,
      },
    },
    async function (request, reply) {
      const { email, password } = request.body;

      const user = await app.userService.get({ email });

      if (!user) {
        return reply.status(404).send({ message: "User not in db" });
      }

      const isCorrect = await bcrypt.compare(password, user.password);

      if (!isCorrect) {
        return reply.status(409).send({ message: "Incorrect password" });
      }

      const token = jwt.sign({ userId: user.id }, env.JWT_KEY, {
        expiresIn: "1d",
      });

      return { user: exclude(user, ["password"]), token };
    }
  );
};
