import { z } from "zod";

export const signUpFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
