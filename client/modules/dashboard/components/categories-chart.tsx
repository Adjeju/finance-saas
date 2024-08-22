"use client";

import React from "react";
import { useGetSummaryCategoriesQuery, useSummaryFilter } from "../hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RadialBar, RadialBarChart } from "recharts";

function getRandomHexColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  return `#${randomColor.padStart(6, "0")}`;
}

type Props = {};

export const CategoriesChart = (props: Props) => {
  const { accountId, from, to } = useSummaryFilter();

  const { data, isLoading } = useGetSummaryCategoriesQuery({
    accountId: accountId || 0,
    from: from?.toISOString() || "",
    to: to?.toISOString() || "",
  });

  if (!accountId || !from || !to) {
    return null;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  const mappedData = data!.map((c) => ({ ...c, title: c.name }));

  const chartConfig = mappedData!.reduce(
    (prev, { title }) => ({
      ...prev,
      [title]: { label: title, color: getRandomHexColor() },
    }),
    {},
  ) satisfies ChartConfig;

  const chartData = mappedData!.map((c) => ({
    ...c,
    fill: `var(--color-${c.name})`,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="title" />}
            />
            <RadialBar dataKey="amount" background />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
    </Card>
  );
};
