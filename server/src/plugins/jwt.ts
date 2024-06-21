import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import jwt from "jsonwebtoken";
import env from "../env";

export const jwtPlugin: FastifyPluginAsync = fp(async function (fastify, opts) {
  fastify.decorate(
    "validateJWT",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        const token = request.headers.authorization?.split(" ")[1];
        if (!token) {
          return reply.status(404).send({ error: "Auth required" });
        }

        const { userId } = jwt.verify(token, env.JWT_KEY) as {
          userId: number;
        };

        request.userId = userId;
      } catch (err) {
        reply.send(err);
      }
    }
  );
});

export default jwtPlugin;

declare module "fastify" {
  export interface FastifyInstance {
    validateJWT: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

declare module "fastify" {
  export interface FastifyRequest {
    userId: number;
  }
}
