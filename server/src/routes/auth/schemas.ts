import z from "zod";
import { serverMessages } from "../../constants";

export const signUpBodySchema = z
  .object({
    firstName: z.string({ required_error: serverMessages.required }),
    lastName: z.string({ required_error: serverMessages.required }),
    email: z
      .string({ required_error: serverMessages.required })
      .email({ message: serverMessages.invalidEmail }),
    password: z.string({ required_error: serverMessages.required }),
    confirmPassword: z.string({ required_error: serverMessages.required }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: serverMessages.passwordsDontMatch,
      });
    }
  });

export const signInBodySchema = z.object({
  email: z
    .string({ required_error: serverMessages.required })
    .email({ message: serverMessages.invalidEmail }),
  password: z.string({ required_error: serverMessages.required }),
});
