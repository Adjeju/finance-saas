import { useMutation } from "@tanstack/react-query";
import { signInApi } from "../api";

export const useSignInMutation = () =>
  useMutation({
    mutationFn: signInApi,
  });
