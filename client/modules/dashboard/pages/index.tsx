import AccountHeader from "@/components/shared/account-header";
import React from "react";
import {
  CategoriesChart,
  Summary,
  SummaryFilter,
  TransactionsChart,
} from "../components";

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <div>
      <AccountHeader>Dashboard</AccountHeader>
      <div className="flex flex-col gap-4 p-6">
        <SummaryFilter />
        <div className="grid grid-cols-3 gap-6">
          <Summary />
          <TransactionsChart />
          <CategoriesChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
