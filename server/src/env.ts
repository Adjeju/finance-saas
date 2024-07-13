import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_KEY: z.string(),
  JWT_EXPIRES_IN: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
