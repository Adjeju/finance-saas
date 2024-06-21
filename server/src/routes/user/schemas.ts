import z from "zod";

export const signUpBodySchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password & ConfirmPassword",
      });
    }
  });

export const signInBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
