import { z } from "zod";

export const accountFormSchema = z.object({
  name: z.string(),
});

export type AccountFormValues = z.infer<typeof accountFormSchema>;
