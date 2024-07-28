import { api } from "@/lib/api";
import { SignInFormValues, SignUpFormValues } from "../validation";
import { User } from "@/types/user";
import { apiRoutes } from "@/constants";

export const signInApi = (json: SignInFormValues) =>
  api.post(apiRoutes.signIn, { json }).json<{ user: User; token: string }>();

export const signUpApi = (json: SignUpFormValues) =>
  api.post(apiRoutes.signUp, { json }).json<{ message: string }>();
