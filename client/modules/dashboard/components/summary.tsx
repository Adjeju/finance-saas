"use client";

import React from "react";
import { useGetSummaryQuery, useSummaryFilter } from "../hooks";
import { SummaryKeys } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowDownRight,
  ArrowUpRight,
  LucideIcon,
  PiggyBank,
} from "lucide-react";

const labels: Record<SummaryKeys, string> = {
  earnings: "Earnings",
  remainings: "Remainings",
  spendings: "Spendings",
};

const icons: Record<SummaryKeys, LucideIcon> = {
  earnings: ArrowUpRight,
  remainings: PiggyBank,
  spendings: ArrowDownRight,
};

type Props = {};

export const Summary = (props: Props) => {
  const { accountId, from, to } = useSummaryFilter();

  const { data, isLoading } = useGetSummaryQuery({
    accountId: accountId || 0,
    from: from?.toISOString() || "",
    to: to?.toISOString() || "",
  });

  if (!accountId) {
    return <div>Select account </div>;
  }

  if (!from && !to) {
    return <div>Select date range</div>;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      {(Object.keys(data!) as SummaryKeys[]).map((key, idx) => {
        const Icon = icons[key];

        return (
          <Card key={idx}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{labels[key]}</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </div>
              <Icon className="h-8 w-8" />
            </CardHeader>
            <CardContent>
              <p>{data![key] / 100}</p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};
