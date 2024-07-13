import React from "react";
import {
  ArrowLeftRight,
  BarChart,
  BookPlus,
  CreditCard,
  DollarSign,
  Home,
  LayoutDashboard,
  Settings,
  Wallet,
} from "lucide-react";
import { routes } from "@/constants";

import Link from "next/link";

type Props = {};

export const Sidebar = (props: Props) => {
  return (
    <div className="flex flex-col gap-2 border-r bg-muted/40 lg:block">
      <div className="flex h-[60px] items-center px-6">
        <Link
          href="#"
          className="flex items-center gap-2 font-semibold"
          prefetch={false}
        >
          <DollarSign className="h-6 w-6" />
          <span className="">Finance App</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-4 text-base font-medium">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:bg-muted"
            prefetch={false}
          >
            <Home className="h-4 w-4" />
            Overview
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
            prefetch={false}
          >
            <CreditCard className="h-4 w-4" />
            Transactions
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
            prefetch={false}
          >
            <BarChart className="h-4 w-4" />
            Budgets
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
            prefetch={false}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </div>
    </div>
  );
};
