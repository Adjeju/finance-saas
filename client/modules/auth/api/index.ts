import { api } from "@/lib/api";

export const signInApi = (json: any) =>
  api.post("auth/sign-in", { json }).json();
