import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;
