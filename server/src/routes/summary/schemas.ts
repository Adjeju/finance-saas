import z from "zod";

export const getSummaryQueryStringSchema = z.object({
  from: z.string().datetime(),
  to: z.string().datetime(),
  accountId: z.string(),
});
