import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync, FastifyServerOptions } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { ZodError } from "zod";

export interface AppOptions
  extends FastifyServerOptions,
    Partial<AutoloadPluginOptions> {}

const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);
  fastify.withTypeProvider<ZodTypeProvider>();

  fastify.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      reply.status(400).send({
        statusCode: 400,
        error: "Bad Request",
        issues: error.issues,
      });
      return;
    }

    reply.send(error);
  });

  // Do not touch the following lines

  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });
};

export default app;
export { app, options };
