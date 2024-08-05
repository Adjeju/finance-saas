"use client";

import React from "react";
import { DollarSign, HandCoins, Home, Layers, Wallet } from "lucide-react";
import { routes } from "@/constants";

const links = [
  { label: "Dashboard", Icon: Home, href: routes.dashboard },
  { label: "Categories", Icon: Layers, href: routes.categories },
  { label: "Accounts", Icon: Wallet, href: routes.accounts },
  { label: "Transactions", Icon: HandCoins, href: routes.transactions },
];

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {};

export const Sidebar = (props: Props) => {
  const pathname = usePathname();

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
          {links.map(({ Icon, href, label }, idx) => (
            <Link
              key={idx}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-muted-foreground hover:bg-muted",
                pathname.includes(href) && "text-primary"
              )}
              prefetch={false}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
