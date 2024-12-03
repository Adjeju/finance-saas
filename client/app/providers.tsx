"use client";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren;

const Providers = ({ children }: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
    queryCache: new QueryCache({
      onError(error: any, query) {
        if (error.response.status === 401) {
          toast({
            title: "Authentication Error",
            description: "Authentication Error",
          });
          router.push("/");
          return;
        }
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
      {children}
    </QueryClientProvider>
  );
};

export default Providers;
