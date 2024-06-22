import { useMutation } from "@tanstack/react-query";
import { signInApi, signUpApi } from "../api";

export const useSignInMutation = () =>
  useMutation({
    mutationFn: signInApi,
  });

export const useSignUpMutation = () =>
  useMutation({
    mutationFn: signUpApi,
  });
