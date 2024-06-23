import React from "react";
import { Button } from "./button";
import {
  ArrowLeftRight,
  BookPlus,
  LayoutDashboard,
  User,
  Wallet,
} from "lucide-react";
import { routes } from "@/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import Link from "next/link";

type Props = {};

const links = [
  { label: "Dashboard", Icon: LayoutDashboard, href: routes.dashboard },
  { label: "Transactions", Icon: ArrowLeftRight, href: routes.transactions },
  { label: "Accounts", Icon: Wallet, href: routes.accounts },
  { label: "Categories", Icon: BookPlus, href: routes.categories },
];

export const Sidebar = (props: Props) => {
  return (
    <div className="h-screen bg-primary flex flex-col justify-between items-center py-4 px-2 gap-4 ">
      <div>Logo</div>
      <div className="flex-1 flex flex-col justify-between items-center">
        <div className="flex flex-col gap-8 justify-center flex-1">
          {links.map(({ href, Icon, label }, idx) => (
            <TooltipProvider key={idx}>
              <Tooltip>
                <TooltipTrigger>
                  <Link href={href}>
                    <Icon className="w-6 h-6 text-white" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={8}
                  className="border border-b px-2 py-1.5 rounded-md bg-white"
                >
                  <p>{label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <Link href={routes.settings} className="">
          <User className="w-6 h-6 text-white" />
        </Link>
      </div>
      <Button variant="destructive" className="w-full">
        Exit
      </Button>
    </div>
  );
};
