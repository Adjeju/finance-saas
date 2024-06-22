import { api } from "@/lib/api";
import { SignInFormValues, SignUpFormValues } from "../validation";
import { User } from "@/types/user";

export const signInApi = (json: SignInFormValues) =>
  api.post("auth/sign-in", { json }).json<{ user: User; token: string }>();

export const signUpApi = (json: SignUpFormValues) =>
  api.post("auth/sign-up", { json }).json<{ message: string }>();
