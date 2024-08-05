import React from "react";
import {
  TransactionAccountFilter,
  TransactionCategoryFilter,
  TransactionFromToFilter,
} from "./fields";

type Props = {};

export const TransactionListFilter = (props: Props) => {
  return (
    <div className="flex items-center gap-3">
      <TransactionAccountFilter />
      <TransactionCategoryFilter />
      <TransactionFromToFilter />
    </div>
  );
};
