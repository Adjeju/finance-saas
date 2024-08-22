"use client";

import React from "react";
import { AccountField } from "./account";
import { DateField } from "./date";

type Props = {};

export const SummaryFilter = (props: Props) => {
  return (
    <div className="flex items-center gap-3">
      <AccountField />
      <DateField />
    </div>
  );
};
